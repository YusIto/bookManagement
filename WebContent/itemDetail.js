/* グローバル変数 */
// URLパラメータ
var arg = new Object;
var item =new Object;

/*  URLパラメータを取得するファンクション */
var getUrlParameter = function () {
	var keyValPair = location.search.substring(1);
	var decodeKeyValPair = decodeURIComponent(keyValPair);
	var pair=decodeKeyValPair.split('&');
	for(var i=0;pair[i];i++) {
	    var kv = pair[i].split('=');
	    arg[kv[0]]=kv[1];
	}
	console.log('URLパラメータ',arg);
}

/*  画像を拡大するファンクション */
var scalUpImage = function () {
	$('#js-item-image').addClass("expand");
}
/* 画像を縮小するファンクション */
var scaldownImage = function () {
	$('#js-item-image').removeClass("expand");
}

/* 商品情報を取得するファンクション */
var getItem  = function () {
	var requestQuery = {
		itemCd : arg.itemCd
	};
	// サーバーからデータを取得する
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myCart/ItemDetailServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 取得したデータを画面に表示する
			$('#js-item-image').attr('src', json.url);
			$('#js-item-cd').html(json.itemCd);
			$('#js-item-name').html(json.itemName);
			$('#js-item-kana').html(json.itemNameKana);
			$('#js-item-price').html(json.salesPrice);
			$('#js-item-stock').html(json.stock + '個');
			$('#js-item-description').html(json.description);
			// 購入処理に利用するためにオブジェクトに保存
			item = json;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
	/** jQueryを使用しないでHTTPリクエストを送る処理**/
//	// XMLHttpRequestオブジェクトを生成する
//	var req = new XMLHttpRequest();
//	// サーバ応答時の処理を定義する
//	req.onreadystatechange = function() {
//		  if (req.readyState == 4) { // 通信の完了時
//		    if (req.status == 200) { // 通信の成功時
//		    	var json = JSON.parse(req.responseText);
//				// 確認のために返却値を出力
//				console.log('返却値', json);
//				// 取得したデータを画面に表示する
//				$('#js-item-image').attr('src', json.url);
//				$('#js-item-cd').html(json.itemCd);
//				$('#js-item-name').html(json.itemName);
//				$('#js-item-kana').html(json.itemNameKana);
//				$('#js-item-price').html(json.salesPrice);
//				$('#js-item-stock').html(json.stock + '個');
//				$('#js-item-description').html(json.description);
//		    }
//		  }else{
//		    // 通信中の処理
//		  }
//		}
//	// リクエストを送信
//	var url = '/myCart/ItemDetailServlet?itemCd='+arg.itemCd;
//	req.open('GET', url, true);
//	req.send(null);
}

/* 商品をカートに入れるファンクション */
var addToCart  = function () {
	// ローカルストレージからカートの商品一覧を取得
	// JSON.parse()で文字列からJavaScriptオブジェクトに変換（ローカルストレージは文字列しか保存できない）
	var cartItems = JSON.parse(localStorage.getItem('cartItems'));
	// カートがまだできてない時は新しく作成
	if(cartItems === null){
		cartItems = [];
	}
	// カート内の個数
	var cartNum = 0;
	// 該当の商品が含まれている配列の番号
	var cartIndex=-1;
	for(var i=0; i<cartItems.length ; i++){
		var cartItem = cartItems[i];
		// カート内の商品が購入対象の商品であるかをチェック
		if(cartItem.itemCd === item.itemCd){
			cartIndex = i;
			cartNum = cartItem.purchaseNum;
		}
	}
	// 今回に購入数（文字になっているので数値に変換）
	var addNum = parseInt($('#js-purchase-num').val());
	// カート＋今回の購入数
	var totalNum = cartNum + addNum;
	// カート内の購入数が在庫数以上の時はアラートを表示
	if(totalNum >= item.stock){
		alert('商品が不足しており購入ができません。');
		// メソッド終了
		return;
	}
	// カートにいれる最終的な商品情報
	var itemInfo = {
		'itemCd':item.itemCd,
		'itemName':item.itemName,
		'purchaseNum':totalNum,
		'url':item.url
	};
	// カートにもともと商品が存在していたら更新、存在していなかったら追加
	if(cartIndex === -1){ // カートに存在していない
		cartItems.push(itemInfo);
	}else{	// カートに存在している（個数を追加）
		cartItems[cartIndex] = itemInfo;
	}
	// ローカルストレージに保存
	// JSON.stringify()でJavaScriptオブジェクトから文字列に変換（ローカルストレージは文字列しか保存できない）
	localStorage.setItem('cartItems',JSON.stringify(cartItems));
	// カートページに遷移
	location.href='./cart.html';

}

/**
 * 読み込み時の動作
 */
$(document).ready(function() {
	// 初回実行
	getUrlParameter();
	getItem();

	// 画像にマウスオーバーイベント設定
	$('#js-item-image').mouseover(scalUpImage);
	$('#js-item-image').mouseout(scaldownImage);

	// 購入ボタンを押した時のイベント
	$('#js-add-cart-button').click(addToCart);
});