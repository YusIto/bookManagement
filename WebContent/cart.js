/* ローカルストレージからカート情報を取得するファンクション */
var getCartItems = function() {
	// ローカルストレージからカートの商品一覧を取得
	// JSON.parse()で文字列からJavaScriptオブジェクトに変換（ローカルストレージは文字列しか保存できない）
	var cartItems = JSON.parse(localStorage.getItem('cartItems'));
	// 元の表示がある場合は削除
	$('#js-cart-list').html('');
	// カートが無い場合は終了
	if(cartItems == null){
		// メッセージを表示
		$('#js-message').html('カートの中身は空です。');
		// ボタンを削除
		$("#js-purchase-button").remove();
		return;
	}
	// 取得したデータを画面に表示する
	// HTMLの内容を文字列結合で生成する。
	var element = '<div class="item-wrap item-wrap-first">';
	element += '<div class="image-headder">商品画像</div>';
	element += '<div class="itemName">商品名</div>';
	element += '<div class="itemNum">購入数</div>';
	element += '</div>';

	for (var i = 0; i < cartItems.length; i++) {
		var item = cartItems[i];
		if (i != cartItems.length - 1) { // 最後以外
			element += '<div class="item-wrap">';
		} else { // 最後の一つは下線をいれるためにitem-wrap-lastクラスを追加
			element += '<div class="item-wrap item-wrap-last">';
		}
		element += '<div class="image" style="background-image:url(' + item.url
				+ ')"></div>';
		element += '<div class="itemName"><a href=./itemDetail.html?itemCd='
				+ item.itemCd + '>' + item.itemName + '</a></div>';
		element += '<div class="itemNum">' + item.purchaseNum + '個</div>';
		element += '</div>';
	}
	// HTMLに挿入]
	console.log(element)
	$('#js-cart-list').html(element);

}
/* ユーザー名を表示するファンクション */
var setUserName = function() {
	var userName = localStorage.getItem('userName');
	$('#js-user-name').html(userName + 'さん');

}
/* 購入登録を行うファンクション */
var registPurchase = function(){
	// ローカルストレージからカートの商品一覧を取得
	// JSON.parse()で文字列からJavaScriptオブジェクトに変換（ローカルストレージは文字列しか保存できない）
	var cartItems = JSON.parse(localStorage.getItem('cartItems'));
	// ローカルストレージからユーザーコードを取得
	var userCd = localStorage.getItem('userCd');
	// 購入対象の商品がない場合はアラートを表示して登録処理は行わない。
	if(cartItems == null){
		alert('購入する商品がありません。');
		return;
	}
	// 商品購入の確認
	if(window.confirm('カートの商品を購入します。よろしいですか？')){
		// 「OK」時の処理終了
		var requestQuery = {
				'cartItems':JSON.stringify(cartItems),
				'userCd':userCd};
		// カートに入れた情報をサーバーに送信する
		$.ajax({
			type : 'POST',
			url : '/myCart/PurchaseServlet',
			dataType : 'json',
			data : requestQuery,
			success : function(data) {
				if(data.result === "ok"){
					// 登録成功時の処理
					alert('購入が完了しました。');
					// ローカルストレージのカートの内容を削除。
					localStorage.removeItem('cartItems');
					// 画面を更新
					getCartItems();
				}else{
					console.log('errorCd',data.errorCd)
					switch (data.errorCd){
					  case '1001':
						  alert('ログインしなおしてください。');
						  location.href="index.html";
					    break;
					  case '1002':
						  alert('ログインしなおしてください。');
						  location.href="index.html";
					    break;
					  case '2001':
						  alert('購入処理が正常終了しませんでした。時間をおいて再度実行してください');
					    break;
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				// サーバーとの通信に失敗した時の処理
				alert('データの通信に失敗しました');
			}
		});

	}else{
		// 「キャンセル」時の処理開始
		window.alert('キャンセルされました'); // 警告ダイアログを表示

	}


}
/**
 * 読み込み時の動作
 */
$(document).ready(function() {
	// ユーザー名を表示
	setUserName();
	// カート情報を表示
	getCartItems();

	// 購入ボタンを押した時のイベント
	$('#js-purchase-button').click(registPurchase);

});