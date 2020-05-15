/**
 *
 * STEP6-5 JavaScript①
 * jsPractice02（DOMの取得、追加、変更、削除）
 *
 **/
/*
 * 実行結果を確認するためには、下記の関数を利用してください。
 * console.log();
 *
 * 下記が例示です。
 * var message = 'hello world.';
 * console.log(message);
 */

var select = function  () {
	'use strict';
	console.log('----- select -----');
	/** select 実装ここから **/
	// ■IDがselection-areaのDOMを取得してみよう。
	var selectionArea = $('#selection-area');
	console.log(selectionArea);
	// ■selection-areaの子要素を取得してみよう。（jQueryのchildrenメソッドを利用。）
	console.log(selectionArea.children());
	/** select 実装ここまで **/
}

var add = function  () {
	'use strict';
	console.log('----- add -----');
	/** add 実装ここから **/

	// ■IDがaddition-areaのDOMの中に文字列（これからのエンジニア生活にわくわく！）を追加してみよう。
	var additionArea = $('#addition-area');
	additionArea.html('これからのエンジニア生活にわくわく！');
	// ■IDがaddition-areaのDOMの中にred-blockというクラスを持つdivタグを追加してみよう。
	// 前の「これからのエンジニア生活にわくわく！」が消えないように注意。
	var rainbowBlockHtml = '<div class="rainbow-block"></div>';
	additionArea.append(rainbowBlockHtml);

	/** add 実装ここまで **/
}

var change = function  () {
	'use strict';
	console.log('----- change -----');
	/** change 実装ここから **/

	// ■IDがchange-0のDOMの中の文字列（吾輩は仔猫である）を好きな文字と置き換えてみましょう。
	var change0 = $('#change-0');
	change0.html('吾輩は仔猫である');
	// ■IDがchange-1のDOMの中の文字列を別のDOM（<span>夢の印税生活</span>）に置き換えてみましょう。
	var change1 = $('#change-1');
	var change1Html = '<span>夢の印税生活</span>'
	change1.html(change1Html);
	/** change 実装ここまで **/
}

var remove = function  () {
	'use strict';
	console.log('----- remove -----');
	/** remove 実装ここから **/

	// ■IDがdeletion-0のDOMを削除してみよう。(ｊQueryのremoveメソッドを利用)
	var deletion0 = $('#deletion-0');
	deletion0.remove();
	// ■IDがdeletion-1のDOMを削除してみよう。(ｊQueryのremoveメソッドを利用)
	var deletion1 = $('#deletion-1');
	deletion1.remove();

	/** remove 実装ここまで **/
}


$(document).ready(function() {
	// 関数呼び出し
	select();
	add();
	change();
	remove();
});

