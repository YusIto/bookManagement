//パラメーターから該当の蔵書のID取得
var parameter = location.search.substring(1, location.search.length);
parameter = decodeURIComponent(parameter);
parameter = parameter.split('=')[1];
console.log(parameter);
$(document).ready(
		function() {

			'use strict';
			// ログイン認証
			loginCertification();


			// ボタンクリック時、関数利用
			$("#js-return").click(returnSearch);
			$("#js-confirmation").click(confirmation);

			// 該当図書のIDをリクエストクエリに代入
			var requestQuery = {
				bookId : parameter
			};

			// 初期表示
			$.ajax({
				Type : 'GET',
				url : '/bookManagement/EmployeeRentalServlet',
				dataType : 'json',
				data : requestQuery,
				success : function(pw) {
					console.log(pw);
					console.log(pw.title);
					console.log(pw.author);
					console.log(pw.genre);
					$('#rentalTable').append(
							'<tr>' + '<td id = "js-title" >' + pw.title + '</td>' + '<td id = "js-author">'
									+ pw.author + '</td><td id = "js-genre">' + pw.genre
									+ '</td><td><input disabled id="js-today"></input></td>'
									+'<td><input disabled id="js-return-date"></input></tr>');
					displayDate();

				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});

		});


// 日付表示
var displayDate= function() {
	var today = new Date();
	today.setDate(today.getDate());
	var yyyy = today.getFullYear();
	var mm = ("0" + (today.getMonth() + 1)).slice(-2);
	var dd = ("0" + today.getDate()).slice(-2);
	document.getElementById("js-today").value = yyyy + '/' + mm + '/' + dd;
	console.log();

// 2週間後の日付を返却日に初期設定
	var twoWeeks= today.setDate(today.getDate()+14); // 14日後の日付を取得
	    var yyyy = today.getFullYear();
	    var mm = ("0"+(today.getMonth()+1)).slice(-2);
	    var dd = ("0"+today.getDate()).slice(-2);
	    document.getElementById("js-return-date").value=yyyy+'/'+mm+'/'+dd;
}

// 確定ボタン
var confirmation = function() {
	console.log("確定を押しました。");

	var titleVal = $('#js-title').text();
	console.log(titleVal);
	var authorVal = $('#js-author').text();
	console.log(authorVal);
	var genreVal = $('#js-genre').text();
	console.log(genreVal);

	var todayVal = $('#js-today').val();
	console.log(todayVal);
	var returnDateVal = $('#js-return-date').val();
	var returnDate1 = returnDateVal.replace('-', '/')
	var returnDate = returnDate1.replace('-', '/');
	console.log(returnDate);
	// ローカルストレージから社員IDを取得
	var employeeId = localStorage.getItem('employeeId');



	var requestQuery = {
		employeeId : employeeId,
		bookId : parameter,
		title : titleVal,
		author : authorVal,
		genre : genreVal,
		today : todayVal,
		returnDate : returnDateVal
	}
	if (returnDate != "") {
		// 確定ボタン後にデータ送信
		$
				.ajax({
					Type : 'GET',
					url : '/bookManagement/EmployeeRentalConfirmServlet',
					dataType : 'json',
					data : requestQuery,

					success : function(pw) {

						console.log("通信成功");
						alert('貸出完了');
						setTimeout(
								"location.href = '/bookManagement/employee/employeeSearch.html';",
								500);

					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						// サーバーとの通信に失敗した時の処理
						alert('データの通信に失敗しました');
						console.log(errorThrown)
					}
				});
	}else{
		alert("返却日を入力してください");
	}


}

// 戻るボタン
var returnSearch = function() {
	console.log("戻るを押しました。");
	var url = '/bookManagement/employee/employeeSearch.html';
	location.href = url;
}
