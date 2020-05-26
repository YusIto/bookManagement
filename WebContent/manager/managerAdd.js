function add() {



	var jsId = $('#js-input-id').val()
	jsId = jsId.replace(/\s+/g, "");

	var jsTitle = $('#js-input-title').val()
	var jsAuthor = $('#js-input-author').val()

	// formのselectを指定、ここではgenreのところ
	var selectGenre = document.form1.genre1;
	// // 値(数値)を取得
	const num = selectGenre.selectedIndex;
	console.log(num)
	//	// 値(数値)から値(value値)を取得
	const jsGenre = selectGenre.options[num].value;
	console.log(jsGenre)


	var jsBuyer = $('#js-input-buyer').val()

	var jsPurchaseDate = $('#js-input-purchasedate').val()





	if(jsId == ""){
		alert("IDを入力してください");
		console.log("IDを入力してください");
	}else if(jsTitle == ""){
		alert("タイトルを入力してください");
		console.log("タイトルを入力してください");
	}else if(jsAuthor==""){
		alert("著者を入力してください");
		console.log("著者を入力してください");
	}else if(jsBuyer == ""){
		alert("購入者を入力してください");
		console.log("購入者を入力してください");
	}else if(jsPurchaseDate == ""){
		alert("購入日を入力してください");
		console.log("購入日を入力してください");
	}else{


	var requestQuery = {
		id : jsId,
		purchaseDate : jsPurchaseDate,
		title : jsTitle,
		author : jsAuthor,
		genre : jsGenre,
		buyer : jsBuyer
	}

	// コンソールでrequestQueryを確認
	console.log(requestQuery)
	$.ajax({
		type : "POST",
		url : "/bookManagement/ManagerAddServlet",
		data : requestQuery,
		datatype : 'json',
		success : function(json) {

			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 登録完了のアラート
			alert('登録が完了しました');
			// 2秒後に画面遷移
			location.reload();
			//setTimeout("location.href='managerSearch.html';", 2000);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗したときの処理
			alert('入力した内容が登録出来ませんでした。');
			console.log(errorThrown)
		}

	});

	}

}


$(document).ready(function() {
	loginCertification();
	$('#js-add-button').click(add)
});
