package employee;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

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



		String sql ="Select BOOKS.TITLE, BOOKS.AUTHOR, BOOKS.GENRE, RENTAL.RETURN_DATE from BOOKS, RENTAL, EMPLOYEES \n" +
				"where 1=1 \n" +
				" and BOOKS.ID =RENTAL.BOOK_ID \n" +
				" and EMPLOYEES.ID = RENTAL.EMPLOYEE_ID \n" +
				" and BOOKS.ID ='10001' \n" +
				" and EMPLOYEES.ID = '0000001' \n" +
				" and BOOKS.STATUS ='貸出可能' \n";

		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "wt2", "wt2");

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs = stmt.executeQuery(sql);

		) {
			List<Book> list = new ArrayList<>();

			while (rs.next()) {
				Book book = new Book();

				book.setTitle(rs.getString("TI"));
				hobby.setHobbyCategory(rs.getString("CATEGORY_NAME"));
				hobby.setHobby(rs.getString("HOBBY_NAME"));
				hobby.setSyainName(rs.getString("SYAINNAME"));

				list.add(hobby);
			}

			PrintWriter w = response.getWriter();
			w.write(new ObjectMapper().writeValueAsString(list));

		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		// -- ここまで --
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
