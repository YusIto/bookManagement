var loadByAjax = function(requestQuery, page) {
	// 前回の検索結果を空にする
	$('#js-search-result').empty();

	// サーバーにデータ送信
	$
			.ajax({
				type : 'GET',
				dataType : 'json',
				url : 'http://localhost:8080/bookManagement/EmployeeSerchServlet',
				data : requestQuery,
				success : function(json) {
					console.log('返却値', json);
					// 前回の検索結果を空にする
					$('#js-search-result').empty();

					// 1ページに表示する検索結果の数
					var start = (page - 1) * 10;
					// ログイン情報確認
					// if (json.result == "ok") {
					if (json !== "検索結果はありません") {
						var searchResult = '<thead ><tr><th>タイトル</th><th>著者名</th><th>ジャンル</th><th>ステータス</th></tr></thead>';
						for (var i = start; i < start + 10 && i < json.length; i++) {
							if (json[i].status == "貸出可能") {
								searchResult += '<tr><td>' + json[i].title
										+ '</td>' + '<td>' + json[i].author
										+ '</td>' + '<td>' + json[i].genre
										+ '</td>' + '<td>' + json[i].status
										+ '</td>' + '<td>'
										+ '<button class="book_rental" value="'
										+ json[i].bookId + '">貸出</button></td>';
							} else {
								searchResult += '<tr><td>' + json[i].title
										+ '</td>' + '<td>' + json[i].author
										+ '</td>' + '<td>' + json[i].genre
										+ '</td>' + '<td>' + json[i].status
										+ '</td>' + '<td>' + '</td>';
							}
						}
						// 上記処理をHTMLに挿入
						$('#js-search-result').append(searchResult);
						// 貸出ボタンが押された時
						$('.book_rental').click(rental);
					} else {
						$('#js-search-result').append(json);

					}

					// } else {
					// var url = '';
					// location.href = url;
					// }

				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			})
}
var searchBookInformation = function() {
	// 打ち込まれたデータの取得
	var bookTitle = $('#js-add-inputtitle').val();
	var bookAuthor = $('#js-add-inputauthor').val();
	var bookGenre = $('#genre').val();
	var bookStatus = $('#book_status').val();

	var requestQuery = {
		bookTitle : bookTitle,
		bookAuthor : bookAuthor,
		bookGenre : bookGenre,
		bookStatus : bookStatus
	};
	// リクエストクエリの確認
	console.log(requestQuery);

	loadByAjax(requestQuery, 1)
}

// ログアウト
var logout = function() {
	$
			.ajax({
				type : 'GET',
				url : 'http://localhost:8080/bookManagement/EmployeeLogoutServlet',
				success : function(json) {
					// サーバーとの通信に成功した時の処理
					// 確認のために返却値を出力
					console.log('返却値', json);
					window.location.href = "http://localhost:8080/bookManagement/employee/employeeLogin.html";
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});

}

// 借りている本一覧ページへの遷移
var book = function() {
	var url = '';
	location.href = url;
}

// 貸出ボタンが押された時
var rental = function() {
	var bookId = document.activeElement.value;
	var url = 'http://localhost:8080/bookManagement/employee/employeeRental.html?bookId='
			+ bookId;
	location.href = url;
}

var loadTable = function() {
	// ?以降のURL(=リクエストパラメータ)を取得。ex)
	// ?page=1&title=java&author=未来太郎&genre=ビジネス&status=貸出可能
	var url = location.search;
	console.log(url);
	if (url.length >= 1) {
		// ?を取り除く
		var remove = url.substring(1);
		console.log(remove);
		// エンコードされたURLをデコードする
		var encode = encodeURI(remove);
		var decode = decodeURI(remove);
		console.log(decode);
		// &で区切り、配列に検索要素を格納する
		var search = decode.split('&');
		console.log(search);
		// 配列からページの値を取得
		var arrayPage = search[0];
		var page = arrayPage.split('=')[1];
		// 配列からタイトルの値を取得
		var arrayTitle = search[1];
		var title = arrayTitle.slice(6);
		// 配列から著者名の値を取得
		var arrayAuthor = search[2];
		var author = arrayAuthor.slice(7);
		// 配列からジャンルの値を取得
		var arrayGenre = search[3];
		var genre = arrayGenre.slice(6);
		// 配列からステータスの値を取得
		var arrayStatus = search[4];
		var status = arrayStatus.slice(7);
		// 配列から取り出した値の確認
		var requestQuery = {
			bookTitle : title,
			bookAuthor : author,
			bookGenre : genre,
			bookStatus : status
		};
		loadByAjax(requestQuery, page);
	}
}

var pageMove = function() {
	var url = 'http://localhost:8080/bookManagement/employee/employeeSearch.html?page=2&title=&author=&genre=%E6%8A%80%E8%A1%93&status=%E8%B2%B8%E5%87%BA%E5%8F%AF%E8%83%BD'
	location.href = url;
}
$(document).ready(function() {
	'use strict';

	// 初期表示用

	loadTable();
	$('#js-button-search').click(searchBookInformation);
	$('#js-button-logout').click(logout);
	$('#js-button-book').click(book);
	$('#js-next-button').click(pageMove);
});