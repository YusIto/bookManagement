var loginCertification =function(){

	$.ajax({
		type : 'GET',
		url : 'http://localhost:8080/bookManagement/LoginCertificationServlet',
		dataType : 'json',

		success : function(json) {
			//確認
			console.log(json);

			var request =json;

			if(request.login =="no"){

				location.href ='http://localhost:8080/bookManagement/employee/employeeLogin.html'
			} else{
				console.log("ログイン認証OK");
			}
		}
	});
	}