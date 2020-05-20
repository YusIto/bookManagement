package manager;

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

@WebServlet("/ManagerEditServlet")
public class ManagerEditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ManagerEditServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("呼ばれました");
		// JDBCドライバの準備
		try {
		// JDBCドライバのロード
		Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
		// ドライバが設定されていない場合はエラーになります
		throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]",
		e.getMessage()), e);
		}

		// アクセス元のHTMLでrequestQueryに設定された値を取得して、String型の変数に代入
		String id = request.getParameter("id");

		String purchaseDate = request.getParameter("purchaseDate");

		String title = request.getParameter("title");

		String author = request.getParameter("author");

		String genre = request.getParameter("genre");

		String buyer = request.getParameter("buyer");


		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定します
		// ※SQLのログを出力するため変数urlの値は基本的な形式から少し変更を加えています。
		// そのためシステム構築2で使い回すときは注意下さい！
		String url = "jdbc:log4jdbc:oracle:thin:@localhost:1521:XE";
		String user = "bmdb";
		String pass = "bmdb";

		//実行するSQL文 --String sql

		String sql = "insert into BOOKS \n"
					+" (ID, PURCHASED_DATE, TITLE, AUTHOR, GENRE, BUYER, STATUS) \n"
					+" values ('"+ id +"', '"+ purchaseDate +"', '"+ title +"', '"+ author +"', '"+ genre +"', '"+ buyer +"', '貸出可能') \n";
		//確認
		System.out.println(sql);

		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();) {
			// SQLの命令文を実行
				stmt.executeQuery(sql);

			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();

			// JSONで出力する
			pw.append(new ObjectMapper().writeValueAsString("Added"));


		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}
	}

}

