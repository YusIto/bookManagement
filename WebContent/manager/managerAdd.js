function add() {

	var jsid = $('#js-input-id').val()
	var jstitle = $('#js-input-title').val()
	var jsauthor = $('#js-input-author').val()
	var jsgenre = $('genre').val()
	var jsbuyer = $('#js-input-buyer').val()

//現在の時刻から入力するファンクションを利用したいが現在実装できないので手入力

	var jspurchaseDate = $('#js-input-purchasedate').val()


	var requestQuery = {
		id : jsid,
		purchaseDate : jspurchaseDate,
		title : jstitle,
		author : jsauthor,
		genre : jsgenre,
		buyer : jsbuyer
	}
	// コンソールでrequestQueryを確認
	console.log(requestQuery)
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/bookManagement/ManagerAddServlet",
		data : requestQuery,
		datatype : 'json',
		success : function(json) {

			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 登録完了のアラート
			alert('登録が完了しました');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗したときの処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}

	});

}

//function getTodaysDate() {
//
//	var today = new Date();
//
//	var todaydate;
//
//	var Year = today.getFullYear();
//	var Month = today.getMonth() + 1;
//	var Date = today.getDate();
//
//	todaydate = Year + "-" + Month + "-" + Date;
//
//	console.log(purcgaseDate);
//
//	return todaydate;
//}
//日付表示


$(document).ready(function() {
	$('#js-add-button').click(add)
});
