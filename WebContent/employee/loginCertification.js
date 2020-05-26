var loginCertification =function(){

	$.ajax({
		type : 'GET',
		url : '/bookManagement/LoginCertificationServlet',
		dataType : 'json',

		success : function(json) {
			//確認
			console.log(json);

			var request =json;

			if(request.login =="no"){

				location.href ='/bookManagement/employee/employeeLogin.html'
			} else{
				console.log("ログイン認証OK");
			}
		}
	});
	}