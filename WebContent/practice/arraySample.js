/**
 *
 * STEP6-6 JavaScript②
 * 配列
 *
 **/

var array1 = function (){
	/** 実装part1 ここから **/
	// 宣言
	var array1 = [];
	var array2 = ['Java', 'SQL', 'HTML'];

	// 取得
	console.log('----- 取得 -----');
	console.log(array2[2]);

	// 追加
	array2.push('JavaScript');

	// 変更
	array2[2] = 'CSS';

	// 全参照
	console.log('----- 全参照 -----');
	for (var i=0; i<array2.length; i++){
		console.log(array2[i]);
	}
	/** 実装part1 ここまで **/

}


$(document).ready(function() {
	// 関数呼び出し
	array1();
});
