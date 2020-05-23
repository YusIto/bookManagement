package employee;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class EmployeeBookReturnServlet
 */
@WebServlet("/EmployeeBookReturnServlet")
public class EmployeeBookReturnServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeBookReturnServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());


		//文字化け
		response.setContentType("text/html;charset=UTF-8");

		String BookID = request.getParameter("BookID");
    	System.out.println("リクエストパラメータ::"+BookID);


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

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();


		String sqlUpdate = "update BOOKS \n" +
				    "set BOOKS.STATUS = '貸出可能' \n" +
				   "where 1 = 1 \n" +
				  "and BOOKS.ID = '"+BookID+"' \n";

		System.out.println(sqlUpdate);

		String sqlDelete = "delete from RENTAL \n" +
				"where EMPLOYEE_ID = '0000001'\n" +
				"and BOOK_ID = '1' \n" ;

		System.out.println(sqlDelete);

		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

				// SQLの命令文を実行するための準備をおこないます
				 Statement stmt = con.createStatement();
//				PreparedStatement stmt = createPreparedStatement(con, userId, password);

				) {
				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				//int rs1 = stmt.executeUpdate(sql);
				int resultCountUpdate = stmt.executeUpdate(sqlUpdate);
				int resultCountDelete = stmt.executeUpdate(sqlDelete);


			//System.out.println(BookList);
			pw.append(new ObjectMapper().writeValueAsString("ステータスを貸出可能に変更"));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
