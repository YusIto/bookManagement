/**
 *
 * STEP6-6 JavaScript②
 * if文
 *
 **/

var if1 = function (){
	/** 実装part1 ここから **/
	var message = 'ok';
	if (message === 'ok'){
		console.log('messageはokと一緒');
	}else{
		console.log('messageはokと一緒ではない');
	}
	/** 実装part1 ここまで **/

}

var if2 = function(){
	/** 実装part2 ここから **/
	var strNum = '1';
	var num = 1;
	if(strNum == num){
		console.log('strNumとnumは一致（厳密でなない）');
	}else{
		console.log('strNumとnumは一致しない（厳密でなない）');
	}
	if(strNum === num){
		console.log('strNumとnumは厳密に一致');
	}else{
		console.log('strNumとnumは厳密に一致しない');
	}
	/** 実装part2 ここまで **/
}
$(document).ready(function() {
	// 関数呼び出し
	if1();
	if2();
});
