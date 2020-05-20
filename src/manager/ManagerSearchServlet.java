package manager;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import employee.Book;

/**
 * Servlet implementation class ManagerSearchServlet
 */
@WebServlet("/ManagerSearchServlet")
public class ManagerSearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ManagerSearchServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// 文字化け処理
		response.setContentType("text/html; charset=UTF-8");

		// JSから取得したデータをString型の変数として定義
		String bookTitle = request.getParameter("bookTitle");
		String bookAuthor = request.getParameter("bookAuthor");
		String bookGenre = request.getParameter("bookGenre");
		String bookStatus = request.getParameter("bookStatus");

		System.out.println(bookTitle);
		System.out.println(bookStatus);
		System.out.println(bookAuthor);
		System.out.println(bookStatus);

		// JDBCドライバの準備
		try {
			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになる
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}
		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "bmdb";
		String pass = "bmdb";
		// 実行するSQL文
		String sql = "select ID, TITLE, AUTHOR, GENRE, STATUS from BOOKS where 1=1 \n";
		if (bookTitle != "") {
			sql += "and TITLE like '%" + bookTitle + "%' \n";
		}
		if (bookAuthor != "") {
			sql += "and AUTHOR like '%" + bookAuthor + "%' \n";
		}
		if (bookGenre != "") {
			sql += "and GENRE  = '" + bookGenre + "' \n";
		}
		if (bookStatus != "") {
			sql += "and STATUS = '" + bookStatus + "' \n";
		}

		System.out.println(sql);

		// データを格納するリスト
		List<Book> list = new ArrayList<>();

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();

		try (
				// データベースへ接続
				Connection con = DriverManager.getConnection(url, user, pass);
				// SQLの命令文を実行するための準備
				Statement stmt = con.createStatement();
				// SQLの命令文を実行し、その結果をResultSet型のrsに代入
				ResultSet rs1 = stmt.executeQuery(sql);) {

			// SQL実行後の処理内容

			// ログイン確認
			HttpSession session = request.getSession();
			// セッションからユーザーコードを取得
			String status = (String) session.getAttribute("login");

			// //ログイン機能実装時追加
			// if (status == null) { // ログインしていない場合䛾処理
			// // 処理終了
			// return;
			// } else {

			// 次のカラムが存在する場合、bookインスタンスにデータを格納
			while (rs1.next()) {
				Book book = new Book();
				book.setId(rs1.getString("ID"));
				book.setTitle(rs1.getString("TITLE"));
				book.setAuthor(rs1.getString("AUTHOR"));
				book.setGenre(rs1.getString("GENRE"));
				book.setStatus(rs1.getString("STATUS"));
				// リストに追加
				list.add(book);
			}
			if (list.isEmpty()) {
				// JSONで出力する
				pw.append(new ObjectMapper().writeValueAsString("検索結果はありません"));
			} else {
				// JSONで出力する
				pw.append(new ObjectMapper().writeValueAsString(list));
			}
//		}
	}catch(

	Exception e)
	{
		throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細:[%s]", e.getMessage()), e);
	}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
