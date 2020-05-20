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
 * Servlet implementation class EmployeeRentalConfirmServlet
 */
@WebServlet("/EmployeeRentalConfirmServlet")
public class EmployeeRentalConfirmServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeRentalConfirmServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//文字化け
		response.setContentType("text/html;charset=UTF-8");

		String title = request.getParameter("title");
		String author = request.getParameter("author");
		String genre = request.getParameter("genre");
		String today = request.getParameter("today");
		String retrunDate = request.getParameter("retrunDate");

		System.out.println(title);
		System.out.println(author);
		System.out.println(today);
		System.out.println(retrunDate);


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


		String sqlInsert ="insert into RENTAL \n" +
						"(EMPLOYEE_ID,BOOK_ID,RENTAL_DATE,RETURN_DATE) \n" +
				"values('a','b','"+today+"','"+retrunDate+"')";

		System.out.println(sqlInsert);

		String sqlUpdate = "update BOOKS \n" +
							"set BOOKS.STATUS = '貸出中' \n" +
							"where 1 = 1 \n" +
							"and BOOKS.ID = '30005' \n";

		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

				// SQLの命令文を実行するための準備をおこないます
				 Statement stmt = con.createStatement();
				) {
				// SQLの命令文を実行し、その結果をResultSet型のrs1に代入します
				int rs1 = stmt.executeUpdate(sqlInsert);
				int rs2 = stmt.executeUpdate(sqlUpdate);

				// アクセスした人に応答するためのJSONを用意する
				PrintWriter pw = response.getWriter();

			pw.append(new ObjectMapper().writeValueAsString("貸出履歴に登録とステータスを変更しました。"));

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
