/**
 *
 * STEP6-5 JavaScript①
 * jsPractice03（Ajax）
 *
 **/

/* GETでHTTPリクエストを送信するファンクション */
var get = function() {
	/**
	 * 【AJAX-GET】
	 * 同プロジェクトの「GetPostSampleServlet」にアクセスするAjaxを実装せよ
	 * アクセスの仕様は以下の通り
	 * ・GETメソッド
	 * ・リクエストデータとしてidがinputの入力フォームの値をオブジェクト形式で送信（キーの名前は「q」とする）
	 * ・通信成功時の処理ではjavaScriptのalert()メソッドを使用して、レスポンスの中身をそのまま出力せよ。
	 *
	 **/
	/** Ajax-GET 実装ここから --  part1 -- **/

	// 入力されたリクエストクエリー
	var requestQuery = { q:$('#input').val() };

	// サーバーからデータを取得する
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myCart/GetPostSampleServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			alert(json);

		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
	/** Ajax-GET 実装ここまで  --  part1 -- **/
}


/* POSTでHTTPリクエストを送信するファンクション */
var post = function() {
	/**
	 * 【AJAX-POST】
	 * 同プロジェクトの「GetPostSampleServlet」にアクセスするAjaxを実装せよ
	 * アクセスの仕様は以下の通り
	 * ・POSTメソッド
	 * ・リクエストデータとしてidがinputの入力フォームの値をオブジェクト形式で送信（キーの名前は「q」とする）
	 * ・通信成功時の処理ではjavaScriptのalert()メソッドを使用して、レスポンスの中身をそのまま出力せよ。
	 *
	 **/
	/** Ajax-POST 実装ここから --  part1 -- **/

	// 入力されたリクエストクエリー
	var requestQuery = { q:$('#input').val() };


	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/myCart/GetPostSampleServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			alert(json);

		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
	/** Ajax-POST 実装ここまで --  part1 -- **/
}


/**
 * 読み込み時の動作
 */
$(document).ready(function() {
	/**
	 * 【AJAX-GET】
	 * idがgetButtonのボタン要素をクリックされた時に、getファンクションが呼び出されるように実装せよ
	 **/
	// GETでHTTPリクエストボタンを押したときのイベント
	/** Ajax-GET 実装ここから --  part2 -- **/
	/** Ajax-GET 実装ここまで --  part2 -- **/
	$('#getButton').click(get);

	/**
	 * 【AJAX-GET】
	 * idがpostButtonのボタン要素をクリックされた時に、postファンクションが呼び出されるように実装せよ
	 **/
	// POSTでHTTPリクエストボタンを押したときのイベント
	/** Ajax-POST 実装ここから --  part2 -- **/
	/** Ajax-POST 実装ここまで --  part2 -- **/
	$('#postButton').click(post);


});