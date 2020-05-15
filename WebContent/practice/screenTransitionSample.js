/**
 *
 * STEP6-6 JavaScript②
 * 画面遷移
 *
 **/

/*****************
 *  グローバル変数
 *****************/
// URLパラメータ
var arg = new Object;

/*****************
 *  URLパラメータを取得するファンクション
 *****************/
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
/*****************
 *  URLパラメータを設定して画面遷移する関数（自分に遷移）
 *****************/
var urlParam = function (){
	/** 実装part1 ここから **/
	// 入力フォームの値を取得
	var rawInputVal = $('#q').val();
	// 特殊文字をエンコード
	var encodeVal = encodeURIComponent(rawInputVal);
	// 遷移先のURL
	var url = './screenTransitionSample.html?q='+encodeVal;
	// 画面遷移
	location.href=url;
	/** 実装part1 ここまで **/

}

/*****************
 *  ローカルストレージにパラメータを設定して画面遷移する関数（自分に遷移）
 *****************/
var sessionParam = function(){
	/** 実装part2 ここから **/
	// 入力フォームの値を取得
	var inputVal = $('#q').val();
	// ローカルストレージに「q」というキーで値を保存
	localStorage.setItem('q',inputVal);
	// 画面遷移
	location.href='./screenTransitionSample.html';
	/** 実装part2 ここまで **/
}

/*****************
 *  ローカルストレージからパラメータを取得する関数
 *****************/
var getSessionParam = function(){
	/** 実装part3 ここから **/
	//ローカルストレージからキーが「q」の値を取得
	var q = localStorage.getItem('q');
	console.log(q);

	// ローカルストレージからキーが「q」の値を削除（取得した後に消すかどうかはどう機能させたいか次第）
	//localStorage.removeItem('q');

	/** 実装part3 ここまで **/
}


$(document).ready(function() {
	// 関数呼び出し
	getUrlParameter();
	getSessionParam();

	// ボタンのイベントを設定
	$('#urlButton').click(urlParam);
	$('#storageButton').click(sessionParam);
});
