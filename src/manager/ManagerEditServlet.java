package manager;

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




@WebServlet("/ManagerEditServlet")
public class ManagerEditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public ManagerEditServlet() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// アクセス元のHTMLでitemCdに設定された値を取得して、String型の変数itemCdに代入
		String id = request.getParameter("id");
		System.out.println("本のID="+id);

		// JDBCドライバの準備
		try {

		    // JDBCドライバのロード
		    Class.forName("oracle.jdbc.driver.OracleDriver");

		} catch (ClassNotFoundException e) {
		    // ドライバが設定されていない場合はエラーになります
		    throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "bmdb";
		String pass = "bmdb";

		// 実行するSQL文
		String sql ="select ID, TITLE, AUTHOR, GENRE, BUYER, PURCHASED_DATE from BOOKS  \n" +
				"where ID='"+ id +"' \n";
		;

		Book book = new Book();

		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery(sql);) {
			// SQL実行後の処理内容

			// SQL実行結果を保持している変数rsから商品情報を取得
			// rs.nextは取得した商品情報表に次の行があるとき、trueになります
			// 次の行がないときはfalseになります
			if (rs1.next()) {

				book.setId(rs1.getString("ID"));
				book.setTitle(rs1.getString("TITLE"));
				book.setAuthor(rs1.getString("AUTHOR"));
				book.setGenre(rs1.getString("GENRE"));
				book.setBuyer(rs1.getString("BUYER"));
				book.setPurchasedDate(rs1.getString("PURCHASED_DATE"));
				book.setStatus(rs1.getString("STATUS"));

			//book確認
				System.out.println("bookの中身は"+ book);
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(book));
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

		String title = request.getParameter("title");

		String author = request.getParameter("author");

		String genre = request.getParameter("genre");

		String buyer = request.getParameter("buyer");

		String purchaseDate = request.getParameter("purchaseDate");

		String status = request.getParameter("status");

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定します
		// ※SQLのログを出力するため変数urlの値は基本的な形式から少し変更を加えています。
		// そのためシステム構築2で使い回すときは注意下さい！
		String url = "jdbc:log4jdbc:oracle:thin:@localhost:1521:XE";
		String user = "bmdb";
		String pass = "bmdb";

		//実行するSQL文 --String sql

		String sql ="update BOOKS set \n" +
				" ID ='"+ id +"', PURCHASED_DATE ='"+ purchaseDate +"', BUYER='"+ buyer +"', TITLE='"+ title +"', AUTHOR='"+ author +"', GENRE='"+ genre +"', STATUS='"+ status +"' \n" +
				" where ID ='"+ id +"' \n" ;
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
			pw.append(new ObjectMapper().writeValueAsString("Edited"));


		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}
	}

}
