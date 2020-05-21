$(document).ready(function() {
	editPage();//初期表示
	$('#js-add-button').click(edit);//編集ボタン
	$('#js-delete-button').click(deleteBook);//削除ボタン
});



function edit() {//edit関数

	var jsId = $('#js-input-id').val()
	var jsTitle = $('#js-input-title').val()
	var jsAuthor = $('#js-input-author').val()

	// formのselectを指定、ここではgenreのところ
	var selectgenre = document.form1.genre1;
	// // 値(数値)を取得
	const num = selectgenre.selectedIndex;
	console.log(num)
	//	// 値(数値)から値(value値)を取得
	const jsGenre = selectgenre.options[num].value;
	console.log(jsGenre)

	var jsBuyer = $('#js-input-buyer').val()

//現在の時刻から入力するファンクションを利用したいが現在実装できないので手入力

	var jsPurchaseDate = $('#js-input-purchasedate').val()

	var jsStatus = $('#status').val();

	var requestQuery = {
		id : jsId,
		purchaseDate : jsPurchaseDate,
		title : jsTitle,
		author : jsAuthor,
		genre : jsGenre,
		buyer : jsBuyer,
		status:jsStatus
	}

	// コンソールでrequestQueryを確認
	console.log(requestQuery)
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/bookManagement/ManagerEditServlet",
		data : requestQuery,
		dataType : 'json',
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

}//edit関数の最後



function editPage(){//editPage関数
	console.log("常に表示");

	var id = location.search.substring(1, location.search.length);
	id = decodeURIComponent(id);
	id = id.split('=')[1];

	console.log(id);
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


//			var  purchasedDate = element.purchasedDate;
//
//			var purchasedDate3=purchasedDate.substring(0,11)
//			var purchasedDate2 = purchasedDate3.replace('-','/');
//			var purchasedDate = purchasedDate2.replace('-','/');

			//console.log("日付"+ purchasedDate);


			$('#js-input-id').val(element.id);
			$('#js-input-title').val(element.title);
			$('#js-input-author').val(element.author);
			$('#genre').val(element.genre);
			$('#js-input-buyer').val(element.buyer);
			$('#js-input-purchasedate').val(element.purchasedDate);
			$('#status').val(element.status);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗したときの処理
			alert('入力した内容が登録出来ませんでした。');
			console.log(errorThrown)
		}

	});
}//editPage関数


function deleteBook(){//deleteBook関数
	console.log("削除ボタンを押しました。");
	var id = $('#js-input-id').val()

	var rq = {id:id};

	console.log(rq);

	$.ajax({
		type : "POST",
		url : "http://localhost:8080/bookManagement/ManagerDeleteServlet",
		data : rq,

		dataType : 'json',
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
}//deleteBook関数の最後
