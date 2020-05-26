var loginCertification =function(){

	$.ajax({
		type : 'GET',
		url : '/bookManagement/ManagerLoginCertificationServlet',
		dataType : 'json',

		success : function(json) {
			//確認
			console.log(json);

			var request =json;

			if(request.login =="no"){

				location.href ='/bookManagement/manager/managerLogin.html'
			} else{
				console.log("ログイン認証OK");
			}
		}
	});
	}