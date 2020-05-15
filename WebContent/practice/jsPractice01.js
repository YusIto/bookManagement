/**
 *
 * STEP6-5 JavaScript①
 * jsPractice01（変数、関数、オブジェクト）
 *
 **/

/**
 * 実行結果を確認するためには、下記の関数を利用してください。
 * 開発者ツールのコンソールタブに引数に与えた情報を出力します。
 * console.log();
 *
 * 下記が例示です。
 * var message = 'hello world.';
 * console.log(message);
 */
var learnVariable = function () {
	'use strict';
	console.log('----- learnVariable -----');
	/** learnVariable 実装ここから **/
	// ■1. 文字列(Hello world!)を格納する変数（str）を宣言し、開発者ツールのコンソールに出力してみよう。
	var str = 'Hello world.';
	console.log(str);

	// ■2. 数値（9999）を格納する変数（num）を宣言し、開発者ツールのコンソールに出力してみよう。
	var num = 9999;
	console.log(num);

	// ■3. 真偽値(true)を格納する変数（bool）を宣言し、開発者ツールのコンソールに出力してみよう。
	var bool = true;
	console.log(bool);

	// ■4. 1.で宣言した変数に数値(2017)を再代入し、開発者ツールのコンソールに出力してみよう。
	str = 2017;
	console.log(str);
	/** learnVariable 実装ここまで **/
}

var learnFunction = function () {
	'use strict';
	console.log('----- learnFunction -----');
	/**
	 * 関数の定義方法は下記の2つがあります。
	 *	function hoge () {
	 * 		return;
	 *	}
	 *	var fnc = function () {
	 * 		return;
	 *	}
	 *
	 */
	/** learnFunction 実装ここから **/
	// ■'hello'という文字列を返却する関数(getHello)を定義し、実行した結果を開発者ツールのコンソールに出力してみよう。
	var getHello = function  () {
		return 'hello';
	}
	console.log(getHello());

	// ■2つの引数を合計して返却する関数（add）を定義し、関数に10と5を渡した結果を開発者ツールのコンソールに出力してみよう。
	var add = function (num1, num2) {
		return num1 + num2;
	}
	console.log(add(10, 5));

	/** learnFunction 実装ここまで **/

}
var learnObject = function () {
	'use strict';
	/** learnObject 実装ここから **/
	console.log('----- learnObject -----');
	// ■1. Objectの変数（obj）を宣言し、開発者ツールのコンソールに出力してみよう。中身はキーが'key'、値が'value'
	var obj = {key : 'value'};
	console.log(obj);

	// ■2. 作成したObjectのkeyにアクセスし、その内容を開発者ツールのコンソールに出力してみよう。
	console.log(obj.key);
	// console.log(obj['key']);

	// ■3. 作成したObjectにキー（some）とその値（something）を追加し、Objectを開発者ツールのコンソールに出力してみよう。
	obj.some = 'something.';
	console.log(obj);

	/** learnObject 実装ここまで **/
}

$(document).ready(function() {
	// 関数呼び出し
	learnVariable();
	learnFunction();
	learnObject();
});
