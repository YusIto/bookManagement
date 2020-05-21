package employee;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class EmployeeRentalServlet
 */
@WebServlet("/EmployeeRentalServlet")
public class EmployeeRentalServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeRentalServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				//文字化け防止
				response.setContentType("text/html;charset=UTF-8");
				String bookId = request.getParameter("bookId");

				employeeRental er1 = new employeeRental();
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


				// 実行するSQL文
				String sql ="select \n" +
							"bs.TITLE bt, \n" +
							"bs.AUTHOR ba, \n" +
							"bs.GENRE bg \n" +
							"from \n" +
							"BOOKS bs \n" +
							"where 1 = 1 \n" +
							"and bs.ID = '"+bookId+"' \n";


				System.out.println(sql);
				try (
						// データベースへ接続します
						Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

						// SQLの命令文を実行するための準備をおこないます
						 Statement stmt = con.createStatement();

						// SQLの命令文を実行し、その結果をResultSet型のrs1に代入します
						ResultSet rs1 = stmt.executeQuery(sql);

				) {

					// 返却データを作成
				if (rs1.next()) {
						er1.setTitle(rs1.getString("bt"));
						er1.setAuthor(rs1.getString("ba"));
						er1.setGenre(rs1.getString("bg"));

						System.out.println(er1.getTitle());

					}

					pw.append(new ObjectMapper().writeValueAsString(er1));

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
