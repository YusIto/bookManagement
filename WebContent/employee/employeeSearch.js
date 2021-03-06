//画面ロード
var loadByAjax = function(requestQuery, page) {
	// 前回の検索結果を空にする
	$('#js-search-result').empty();
	$('#js-next-button').css('visibility', 'visible');
	if (page == 1) {
		$('#js-previous-button').css('visibility', 'hidden');
		$('#js-page-number').append(page);
	} else {
		$('#js-previous-button').css('visibility', 'visible');
		$('#js-page-number').append(page);
	}
	// サーバーにデータ送信
	$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/bookManagement/EmployeeSerchServlet',
				data : requestQuery,
				success : function(json) {
					console.log('返却値', json);
					// 前回の検索結果を空にする
					$('#js-search-result').empty();

					// 1ページに表示する検索結果の数
					var start = (page - 1) * 10;
					console.log(start);
					// ログイン情報確認
					// if (json.result == "ok") {
					if (json !== "検索結果はありません") {
						var dataNumber = json.length;
						console.log(dataNumber);
						var decimalPointMaxPage = dataNumber/10;
						var maxPage = Math.ceil(decimalPointMaxPage);
						console.log(maxPage);
						if(page == maxPage){
							$('#js-next-button').css('visibility', 'hidden');
						}
						var searchResult = '<thead ><tr><th>タイトル</th><th>著者名</th><th>ジャンル</th><th>ステータス</th><th></th></tr></thead>';
						for (var i = start; i < start + 10 && i < json.length; i++) {
							if (json[i].status == "貸出可能") {
								searchResult += '<tr><td>' + json[i].title
										+ '</td>' + '<td>' + json[i].author
										+ '</td>' + '<td>' + json[i].genre
										+ '</td>' + '<td>' + json[i].status
										+ '</td>' + '<td>'
										+ '<button class="book_rental" value="'
										+ json[i].id + '">貸出</button></td>';
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
//URLになる変数宣言
var page;
var title;
var author;
var genre;
var status;
//検索結果
var searchBookInformation = function() {
	// 打ち込まれたデータの取得
	$('#js-page-number').empty(page);
	page = 1;
	title = $('#js-add-inputtitle').val();
	author = $('#js-add-inputauthor').val();
	genre = $('#genre').val();
	status = $('#book_status').val();

	var requestQuery = {
		bookTitle : title,
		bookAuthor : author,
		bookGenre : genre,
		bookStatus : status
	};
	// リクエストクエリの確認
	console.log(requestQuery);

	loadByAjax(requestQuery, 1);
}

// ログアウト
var logout = function() {
	$.ajax({
				type : 'GET',
				url : '/bookManagement/EmployeeLoginServlet',
				success : function(json) {
					// サーバーとの通信に成功した時の処理
					// 確認のために返却値を出力
					console.log('返却値', json);
					localStorage.removeItem('employeeId');
					localStorage.removeItem('employeeName');
					window.location.href = "/bookManagement/employee/employeeLogin.html";
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
	var employeeId = localStorage.getItem('employeeId');
	console.log(employeeId);
	var url = '/bookManagement/employee/employeeBook.html?employeeId='+employeeId;
	location.href = url;
}

// 貸出ボタンが押された時
var rental = function() {
	var bookId = document.activeElement.value;
	var url = '/bookManagement/employee/employeeRental.html?bookId='
			+ bookId;
	location.href = url;
}

//URLから値を取得
var loadTable = function() {
	// ?以降のURL(=リクエストパラメータ)を取得。ex)?page=1&title=java&author=未来太郎&genre=ビジネス&status=貸出可能
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
		page = arrayPage.split('=')[1];
		page = parseInt(page);
		// 配列からタイトルの値を取得
		var arrayTitle = search[1];
		title = arrayTitle.split('=')[1];
		// 配列から著者名の値を取得
		var arrayAuthor = search[2];
		author = arrayAuthor.split('=')[1];
		// 配列からジャンルの値を取得
		var arrayGenre = search[3];
		genre = arrayGenre.split('=')[1];
		// 配列からステータスの値を取得
		var arrayStatus = search[4];
		status = arrayStatus.split('=')[1];
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

//次へボタン
var moveToNextPage = function() {

	var url = '/bookManagement/employee/employeeSearch.html?page='
			+ (page + 1);
	url += '&title=' + title;
	url += '&author=' + author;
	url += '&genre=' + genre;
	url += '&status=' + status;
	location.href = url;
}

//前へボタン
var moveToPreviousPage = function() {
	var url = '/bookManagement/employee/employeeSearch.html?page='
			+ (page - 1);
	url += '&title=' + title;
	url += '&author=' + author;
	url += '&genre=' + genre;
	url += '&status=' + status;
	location.href = url;
}

$(document).ready(function() {
	'use strict';

	// 初期表示用
	loginCertification();
	loadTable();
	$('#js-button-search').click(searchBookInformation);
	$('#js-button-logout').click(logout);
	$('#js-next-button').click(moveToNextPage);
	$('#js-previous-button').click(moveToPreviousPage);
});