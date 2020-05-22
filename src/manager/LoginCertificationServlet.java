package manager;

import java.io.IOException;
import java.io.PrintWriter;
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
 * Servlet implementation class LoginCertificationServlet
 */
@WebServlet("/LoginCertificationServlet")
public class LoginCertificationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;


    public LoginCertificationServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		//文字化け
		response.setContentType("text/html;charset=UTF-8");

		// セッションを使います
		HttpSession session = request.getSession(true);

		// レスポンスの準備
		PrintWriter pw = response.getWriter();

		// セッションでログインチェック

		String status = (String) session.getAttribute("id");

		// うえのstatusの確認
		System.out.println(status);

		// 返却データを作成、Mapに格納するため用意
		Map<String, Object> responseData = new HashMap<>();

		responseData.put("id", status);

		if (status == null) {
			responseData.put("login", "no");
		//レスポンスデータの中身の確認
			System.out.println(responseData);
			pw.append(new ObjectMapper().writeValueAsString(responseData));

		} else {
			responseData.put("login", "yes");
		//レスポンスデータの中身の確認
			System.out.println(responseData);
			pw.append(new ObjectMapper().writeValueAsString(responseData));
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
