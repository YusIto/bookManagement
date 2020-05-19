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

	// サーバーにデータ送信
	$
			.ajax({
				type : 'GET',
				dataType : 'json',
				url : 'http://localhost:8080/bookManagement/EmployeeSerchServlet',
				data : requestQuery,
				success : function(json) {
					console.log('返却値', json);
					$('#js-search-result').remove();

					// ログイン情報確認
					// if (json.result == "ok") {
					if (json !== "検索結果はありません") {
						var searchResult = '<thead ><tr><th>タイトル</th><th>著者名</th><th>ジャンル</th><th>ステータス</th></tr></thead>';
						for (var i = 0; i < json.length; i++) {
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
										+ '<td>' + '<td>' + json[i].genre
										+ '</td>' + '<td>' + json[i].status
										+ '</td>' + '<td>' + '</td>';
							}
						}
						// 上記処理をHTMLに挿入
						$('#js-search-resultx').append(searchResult);
						// 貸出ボタンが押された時
						$('.book_rental').click(rental);
					} else {
						$('#js-search-resultx').append(json);
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

$(document).ready(function() {
	'use strict';

	// 初期表示用

	$('#js-button-search').click(searchBookInformation);
	$('#js-button-logout').click(logout);
	$('#js-button-book').click(book);

});