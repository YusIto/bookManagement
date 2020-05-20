function edit() {

	var jsid = $('#js-input-id').val()
	var jstitle = $('#js-input-title').val()
	var jsauthor = $('#js-input-author').val()

	// formのselectを指定、ここではgenreのところ
	var selectgenre = document.form1.genre1;
	// // 値(数値)を取得
	const num = selectgenre.selectedIndex;
	console.log(num)
	//	// 値(数値)から値(value値)を取得
	const jsgenre = selectgenre.options[num].value;
	console.log(jsgenre)


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
		url : "http://localhost:8080/bookManagement/ManagerEditServlet",
		data : requestQuery,
		datatype : 'json',
		success : function(json) {

			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 登録完了のアラート
			alert('編集が完了しました');
			// 2秒後に画面遷移
			setTimeout("location.href='.maneger/manegerSearch.html';", 2000);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗したときの処理
			alert('入力した内容が登録出来ませんでした。');
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
	editPage();
	$('#js-add-button').click(edit);
	$('#js-delete-button').click(deleteBook);
	$('#js-input-id').val('a');
	console.log("aa");
});


function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function editPage(){
	console.log("常に表示");
	var param = location.search;
	var id = getParam('id');
	var rq = {id:id};
	console.log(rq);

	$.ajax({
		type : "GET",
		url : "http://localhost:8080/bookManagement/ManagerDeleteServlet",
		data : rq,
		datatype : 'json',

		success : function(json) {


			for (var i = 0;i<json.size();i++){
				var element = json[i];
			}





			console.log('返却値', json);
			// 登録完了のアラート
			alert('蔵書削除が完了しました');
			// 2秒後に画面遷移
			setTimeout("location.href='.maneger/manegerSearch.html';", 2000);



		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗したときの処理
			alert('入力した内容が登録出来ませんでした。');
			console.log(errorThrown)
		}

	});

}






function deleteBook(){
	console.log("削除ボタンを押しました。");
	var jsid = $('#js-input-id').val()

	var rq = {id:jsid};

	console.log(rq);

	$.ajax({
		type : "GET",
		url : "http://localhost:8080/bookManagement/ManagerDeleteServlet",
		data : rq,
		datatype : 'json',
		success : function(json) {

			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 登録完了のアラート
			alert('蔵書削除が完了しました');
			// 2秒後に画面遷移
			setTimeout("location.href='.maneger/manegerSearch.html';", 2000);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗したときの処理
			alert('入力した内容が登録出来ませんでした。');
			console.log(errorThrown)
		}

	});



}
