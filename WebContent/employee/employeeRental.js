//パラメーターから該当の蔵書のID取得
var parameter = location.search.substring(1, location.search.length);
parameter = decodeURIComponent(parameter);
parameter = parameter.split('=')[1];
console.log(parameter);
$(document).ready(
		function() {
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
									+ '</td><td><input id="js-today"></input></td>'
									+'<td><input id="js-retrun-date" type="date"></input></tr>');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});

		});

// 日付表示
window.onload = function() {
	var today = new Date();
	today.setDate(today.getDate());
	var yyyy = today.getFullYear();
	var mm = ("0" + (today.getMonth() + 1)).slice(-2);
	var dd = ("0" + today.getDate()).slice(-2);
	document.getElementById("js-today").value = yyyy + '/' + mm + '/' + dd;
}
// カレンダー返却日
var retrunDateVal = $('#js-retrun-date').val();
var retrunDate1 = retrunDateVal.replace('-', '/')
var retrunDate = retrunDate1.replace('-', '/');

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

	console.log(retrunDate);
	// ローカルストレージから社員IDを取得
	var employeeId = localStorage.getItem('id');

	var requestQuery = {
		employeeId : employeeId,
		bookId : parameter,
		title : titleVal,
		author : authorVal,
		genre : genreVal,
		today : todayVal,
		retrunDate : retrunDateVal
	}

	// 確定ボタン後にデータ送信
	$
			.ajax({
				Type : 'GET',
				url : '/bookManagement/EmployeeRentalConfirmServlet',
				dataType : 'json',
				data : requestQuery,

				success : function(pw) {

					console.log("通信成功");
					setTimeout(
							"location.href = 'http://localhost:8080/bookManagement/employee/employeeSearch.html';",
							2000);

				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});

}

// 戻るボタン
var returnSearch = function() {
	console.log("戻るを押しました。");
	var url = 'http://localhost:8080/bookManagement/employee/employeeSearch.html';
	location.href = url;
}
