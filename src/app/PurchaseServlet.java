package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ItemRegistServlet
 */
@WebServlet("/PurchaseServlet")
public class PurchaseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// カートに入っていた商品情報の一覧
		String parameter = request.getParameter("cartItems");
		List<Order> orderList = new ObjectMapper().readValue(parameter, new TypeReference<List<Order>>() {
		});
		System.out.println(orderList.toString());

		// 購入者のユーザーコード
		String userCd = request.getParameter("userCd");

		// レスポンスの準備
		PrintWriter pw = response.getWriter();
		ResponseBase responseBase = new ResponseBase();

		// セッションにユーザー情報が保存されているかの確認
		HttpSession session = request.getSession();
		String sessionUserCd = (String) session.getAttribute("userCd");
		// セッションにユーザーが保存されてない（ログインしてない）、もしくは画面から送られてくるユーザーコードと違う場合はエラー
		if (sessionUserCd == null) {
			responseBase.setResult("ng");
			responseBase.setErrorCd(ErrorConst.ERR_SESSION);
			responseBase.setErrorMessage("ユーザーがログインしていません");
			// レスポンスデータを書き込む
			pw.append(new ObjectMapper().writeValueAsString(responseBase));
			// 処理終了
			return;

		} else if (!sessionUserCd.equals(userCd)) {
			responseBase.setResult("ng");
			responseBase.setErrorCd(ErrorConst.ERR_WRONG_USER);
			responseBase.setErrorMessage("ユーザーが不正です。");
			// レスポンスデータを書き込む
			pw.append(new ObjectMapper().writeValueAsString(responseBase));
			// 処理終了
			return;
		}

		// JDBCドライバの準備
		try {
			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになります
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}
		Connection con = null;
		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try {
			// DBと接続（オートコミットオフ）
			con = getConnection();

			// 新しい受注コードを取得
			int orderCd = selectOrderCd(con);

			// 受注トランの登録
			insertTrOrders(con, orderCd, userCd);

			// 受注明細トランの登録
			insertTrOrderDetail(con, orderCd, orderList);

			// 商品マスタの在庫数を変更
			updateMsItem(con, orderList);

			// コミット
			con.commit();

			// 画面に「ok」を返却
			responseBase.setResult("ok");

		} catch (Exception e) {
			responseBase.setResult("ng");
			responseBase.setErrorCd(ErrorConst.ERR_DB_CONNECTION);
			responseBase.setErrorMessage("データの登録処理に失敗しました");
			throw new RuntimeException(String.format("SQLの実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		} finally {
			try {
				con.close();
			} catch (Exception e) {
			}
		}
		// レスポンスデータを書き込む
		pw.append(new ObjectMapper().writeValueAsString(responseBase));

	}

	/**
	 * コネクションを生成（オートコミットをOFF）
	 **/
	private static Connection getConnection() throws SQLException {
		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";

		// データベースへ接続します
		Connection con = DriverManager.getConnection(url, user, pass);
		con.setAutoCommit(false);
		return con;

	}

	/**
	 * 受注コードをシーケンスから取得 シーケンスから取得した受注コードを返却
	 **/
	private static int selectOrderCd(Connection con) throws SQLException {
		// 受注コードをシーケンスから発行するSQL
		final String SELECT_ORDER_CD = "SELECT SQ_ORDER_CD.NEXTVAL ORDER_CD FROM DUAL";
		// 返却する受注コード
		int returnOrderCd = -1;
		// シーケンスから受注コードを取得
		Statement stmtSelectOrderCd = con.createStatement();
		try (ResultSet rs = stmtSelectOrderCd.executeQuery(SELECT_ORDER_CD);) {
			if (rs.next()) {
				returnOrderCd = rs.getInt("ORDER_CD");
			}
		} catch (Exception e) {

		}
		return returnOrderCd;
	}

	/**
	 * 受注トランにレコードを登録
	 **/
	private static void insertTrOrders(Connection con, int oderCd, String userCd) throws Exception {

		// 受注トランを登録するSQL
		final String INSERT_TR_ORDERS = "insert into TR_ORDERS \n" + "(ORDER_CD, ORDER_DATE, PURCHASE_USER_CD) \n"
				+ "values(?, SYSDATE, ?)";
		// SQLにパラメータをセット
		PreparedStatement pstmt = null;

		pstmt = con.prepareStatement(INSERT_TR_ORDERS);
		pstmt.setInt(1, oderCd);
		pstmt.setString(2, userCd);
		// SQLを実行
		pstmt.executeUpdate();
		pstmt.close();
	}

	/**
	 * 受注明細トランにレコードを登録
	 **/
	private static void insertTrOrderDetail(Connection con, int oderCd, List<Order> orders) throws Exception {

		// 受注明細トランを登録するSQL
		final String INSERT_TR_ORDER_DETAILS = "insert into TR_ORDER_DETAIL \n" + "( \n" + "	ORDER_DETAIL_CD \n"
				+ ", 	ORDER_CD \n" + ",	ITEM_CD \n" + ",	SALES_PRICE \n" + ",	QUANTITY \n" + ") \n"
				+ "select  \n" + "	SQ_ORDER_DETAIL_CD.NEXTVAL \n" + ",	? \n" + ",	MI.ITEM_CD \n"
				+ ",	MI.SALES_PRICE \n" + ",	? \n" + "from \n" + "	MS_ITEM MI \n" + "where \n"
				+ "	MI.ITEM_CD = ? ";

		// SQLにパラメータをセット
		PreparedStatement pstmt = con.prepareStatement(INSERT_TR_ORDER_DETAILS);

		// 受注明細の数（購入した商品ごと）だけ、受注明細トランに登録
		for (int i = 0; i < orders.size(); i++) {
			// 受注明細一つ分
			Order order = orders.get(i);
			pstmt.setInt(1, oderCd);
			pstmt.setInt(2, order.getPurchaseNum());
			pstmt.setString(3, order.getItemCd());
			pstmt.addBatch();
		}

		// SQLを実行
		pstmt.executeBatch();
		pstmt.close();
	}

	/**
	 * 商品マスタの在庫数を更新
	 **/
	private static void updateMsItem(Connection con, List<Order> orders) throws Exception {

		// 商品マスタの在庫数を変更するSQL
		final String UPDATE_MS_ITEM = "update MS_ITEM \n" + "set STOCK = STOCK - ? \n" + "where ITEM_CD = ?";

		// SQLにパラメータをセット
		PreparedStatement pstmt = con.prepareStatement(UPDATE_MS_ITEM);

		// 受注明細の数（購入した商品ごと）だけ、商品マスタの在庫数を変更
		for (int i = 0; i < orders.size(); i++) {
			// 受注明細一つ分
			Order order = orders.get(i);
			pstmt.setInt(1, order.getPurchaseNum());
			pstmt.setString(2, order.getItemCd());
			pstmt.addBatch();
		}
		// SQLを実行
		pstmt.executeBatch();
		pstmt.close();
	}
}
