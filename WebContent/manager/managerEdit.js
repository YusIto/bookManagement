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
	$('#js-input-id').val();
	console.log();

});


function GetQueryString() {
    if (1 < document.location.search.length) {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        console.log(document.location.search);
    	var query = document.location.search.substring(1);
        console.log(query);
        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split('&');
        console.log(parameters);
        var result = new Object();
        //for (var i = 0; i < parameters.length; i++) {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[0].split('=');
            console.log('elementは'+element);
            var paramName = decodeURIComponent(element[0]);
            console.log('element[0]は'+paramName);
            var paramValue = decodeURIComponent(element[1]);
            console.log('element[1]は'+paramValue);
            // パラメータ名をキーとして連想配列に追加する
            result[paramName] = paramValue;
        //}
        //result = {id: "EMP0001", name: "tanaka",age:"10"}
        return result;
    }
    return null;
}

function editPage(){
	console.log("常に表示");

	var urlId = GetQueryString() ;
	console.log(id);
	//var id = 10001;
	var rq = {id:urlId};
	console.log(rq);

	$.ajax({
		type : "GET",
		url : "http://localhost:8080/bookManagement/ManagerEditServlet",
		data : rq,
		datatype : 'json',

		success : function(json) {

			console.log(json);

			console.log("aa");

			for (var i = 0;i<json.length;i++){
				var element = json[0];
				//$('#js-input-id').val(element.id);
				console.log(element);
			}

			console.log('返却値', json);
			// 登録完了のアラート
			alert('蔵書登録が完了しました');
			// 2秒後に画面遷移
			//setTimeout("location.href='.maneger/manegerSearch.html';", 2000);



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
