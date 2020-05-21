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
			console.log(json);
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



$(document).ready(function() {
	editPage();
	$('#js-add-button').click(edit);
	$('#js-delete-button').click(deleteBook);
	$('#js-input-id').val();

});


function editPage(){
	console.log("常に表示");

	var id = location.search.substring(1, location.search.length);
	id = decodeURIComponent(id);
	id = id.split('=')[1];

	console.log(id);
	//var id = 10001;
	var rq = {id:id};
	console.log(rq);

	$.ajax({
		type : "GET",
		url : "http://localhost:8080/bookManagement/ManagerEditServlet",
		data : rq,

		dataType : 'json',
		success : function(json) {
			console.log('返却値', json);

			var element  = json;

			console.log("elementは"+element);

			console.log(element.id);
			console.log(element.title);
			console.log(element.author);
			console.log(element.genre);
			console.log(element.buyer);
			console.log(element.purchasedDate);
			console.log(element.status);


			var  purchasedDate = element.purchasedDate;

			var purchasedDate3=purchasedDate.substring(0,11)
			var purchasedDate2 = purchasedDate3.replace('-','/');
			var purchasedDate = purchasedDate2.replace('-','/');

			console.log("日付"+ purchasedDate);


			$('#js-input-id').val(element.id);
			$('#js-input-title').val(element.title);
			$('#js-input-author').val(element.author);
			$('#genre').val(element.genre);
			$('#js-input-buyer').val(element.buyer);
			$('#js-input-purchasedate').val(purchasedDate);
			$('#status').val(element.status);

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
	var jsId = $('#js-input-id').val()

	var rq = {id:jsId};

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
