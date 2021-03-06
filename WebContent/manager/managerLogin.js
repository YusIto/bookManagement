
/* ログインファンクション */
function login() {
	// 入力されたユーザーIDとパスワード
	var requestQuery = {
		 id : $('#js-login-id').val()
		,password : $('#js-login-pass').val()
	};
	console.log(requestQuery)
	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/bookManagement/ManegerLoginServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			/**
			 * 【localStorage01】
			 *  ・LoginServletは入力されたユーザーが存在する場合は「返却値のjson.result」に「ok」、しない場合は「ng」を返却してきます。
			 *  ・okの場合
			 *  	①「userName」「userCd」というキーでローカルストレージにユーザー名を保存しましょう。
			 *      （返却値のjson.userNameでユーザー名、json.userCdでユーザーコードが帰ってきます）
			 *  	②「itemList.html」に画面遷移しましょう。
			 *  ・ngの場合
			 *  	③「ユーザーIDかパスワードが間違っています」とアラートを出しましょう。
			 *  	  （JavaScriptのalertを使用）
			 **/
			/** localStorage01 実装ここから part1 **/

			console.log(json)

			if(json.result === "ok"){
				// ユーザー名をローカルストレージに保存
				localStorage.setItem('id',json.id);

				console.log(localStorage)
				// 画面遷移
				location.href='/bookManagement/manager/managerSearch.html';
			}else{
				alert('ログインに失敗しました');
			}
			/** localStorage01 実装ここまで part1 **/
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}

/**
 * 読み込み時の動作
 */
$(document).ready(function() {

	// ログインボタンを押したときのイベント
	$('#js-login-button').click(login);

});