package employee;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class EmployeeBookServlet
 */
@WebServlet("/EmployeeBookServlet")
public class EmployeeBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public EmployeeBookServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
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

				// アクセスした人に応答するためのJSONを用意する
				PrintWriter pw = response.getWriter();


				String sql ="select \n" +
						"BOOKS.TITLE, \n" +
						"BOOKS.AUTHOR, \n" +
						"BOOKS.GENRE, \n" +
						"RENTAL.RETURN_DATE \n" +
						"from  \n" +
						"EMPLOYEES, \n" +
						"BOOKS, \n" +
						"RENTAL \n" +
						"where 1=1 \n" +
						"and EMPLOYEES.ID = '0000001' \n" +
						"and BOOKS.STATUS = '貸出中' \n" +
						"and EMPLOYEES.ID = RENTAL.EMPLOYEE_ID \n" +
						"and BOOKS.ID = RENTAL.BOOK_ID \n";


				// DBへ接続してSQLを実行
				try (
						// データベースへ接続します
						Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

						// SQLの命令文を実行するための準備をおこないます
						 Statement stmt = con.createStatement();
//						PreparedStatement stmt = createPreparedStatement(con, userId, password);

						// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
						ResultSet rs1 = stmt.executeQuery(sql);

				) {

					// 返却データを作成
					List<Book>BookList = new ArrayList<>();

					Map<String, String> responseData = new HashMap<>();
					while (rs1.next()) {
						Book b1 = new Book();
						b1.setTitle(rs1.getString("TITLE"));
						b1.setAuthor(rs1.getString("AUTHOR"));
						b1.setGenre(rs1.getString("GENRE"));
						b1.setReturnDate(rs1.getString("RETURN_DATE"));

						BookList.add(b1);


					}

					System.out.println(BookList);
					pw.append(new ObjectMapper().writeValueAsString(BookList));

				} catch (Exception e) {
					throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
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
