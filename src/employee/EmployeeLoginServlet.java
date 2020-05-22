package employee;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class employeeLoginServlet
 */
@WebServlet("/EmployeeLoginServlet")
public class EmployeeLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		//文字化け
		response.setContentType("text/html;charset=UTF-8");

		//セッションを使います
		HttpSession session = request.getSession(true);

		session.removeAttribute("employeeId");
		session.invalidate();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		//文字化け
		response.setContentType("text/html;charset=UTF-8");

		// JDBCドライバの準備
		try {

			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");

		} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになります
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String dbUrl = "jdbc:log4jdbc:oracle:thin:@localhost:1521:XE";
		String dbUser = "bmdb";
		String dbPass = "bmdb";

		// 入力されたempIDとパスワードを取得
		String Id = request.getParameter("id");
		String password = request.getParameter("password");

		System.out.println("idのリクエスト.ゲットパラメータは" + Id);
		System.out.println("passwordのリクエスト.ゲットパラメータは" + password);


		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();


		// 実行するSQL文
		String sql ="Select ID, PASSWORD, NAME from EMPLOYEES \n" +
				"where 1=1 \n" +
				" and ID = "+ Id +" \n" +
				" and PASSWORD ="+ password +" \n";

		// DBへ接続してSQLを実行
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

				// SQLの命令文を実行するための準備をおこないます
				 Statement stmt = con.createStatement();
//				PreparedStatement stmt = createPreparedStatement(con, userId, password);

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery(sql);

		) {
			// SQLの取得結果がある時（ユーザIDとパスワードが一致しているユーザーがいる）は「ok」という文字列を画面に返却
			// そうでないときは「ng」を返却

			// 返却データを作成
			Map<String, String> responseData = new HashMap<>();
			if (rs1.next()) {
				System.out.println("IDとパスワードの検索結果あり");
				// ログインの結果
				responseData.put("result", "ok");
				// ユーザーコードとユーザー名（画面でユーザー名を表示したいため）
				responseData.put("id", rs1.getString("ID"));
				responseData.put("password", rs1.getString("PASSWORD"));
				responseData.put("name", rs1.getString("NAME"));

				// ユーザー情報をセッションに保存
				HttpSession session = request.getSession();
				session.setAttribute("employeeId", rs1.getString("ID"));
				session.setAttribute("employeeName", rs1.getString("NAME"));

			} else {
				responseData.put("result", "ng");

			}
			//responseDataに何が入ったか確認
			System.out.println(responseData);
			pw.append(new ObjectMapper().writeValueAsString(responseData));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

	}


}