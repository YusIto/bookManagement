/**
 *
 * STEP6-7 JavaScript②
 * jsPractice04（if文/for文/配列）
 *
 **/

var if01 = function() {
	console.log('----- if01 -----')
	/**
	 * 【if01】
	 *  ・strとnumが文字列として一致している場合、「strとnumは一致」、一致していない場合「strとnumは不一致」と出力せよ
	 *  ・出力想定：「strとnumは不一致」
	 *
	 **/
	var str = '01';
	var num = 1;
	/** if01 実装ここから **/
	if(str === num){
		console.log('strとnumは一致');
	}else{
		console.log('strとnumは不一致');
	}

	/** if01 実装ここまで **/
}


var if02 = function() {
	console.log('----- if02 -----')
	/**
	 * 【if02】
	 * ・「jsPractice01,html」の好きな言語のラジオボタンの値によって以下の出力を行う
	 *   - Javaが選らばれた場合「Javaが選ばれました」と出力
	 *   - JavaScriptが選らばれた場合「Javaが選ばれまJavaScriptが選ばれました」と出力
	 *   - SQLが選らばれた場合「SQLが選ばれました」と出力
	 *   - それ以外は「未選択です」と出力
	 *  ・ラジオボタンのチェックしている値は以下を利用する
	 *    $('input[name="lang"]:checked').val();→チェックされているラジオボタンのvalueの値が取得できる。
	 **/

	/** if02 実装ここから **/
	var checkedVal = $('input[name="lang"]:checked').val();
	if(checkedVal === 'Java'){
		console.log('Javaが選ばれました');
	}else if(checkedVal === 'JavaScript'){
		console.log('JavaScriptが選ばれました');
	}else if(checkedVal === 'SQL'){
		console.log('SQLが選ばれました');
	}else{
		console.log('未選択です');
	}

	/** if02 実装ここまで **/
}

var for01 = function() {
	console.log('----- for01 -----')
	/**
	 * 【for01】
	 *  ・for文を利用して1から10までの合計値を求めて、コンソール出力せよ。
	 *  ・出力想定：「55」
	 **/
	/** for01 実装ここから **/
	var sum = 0;
	for(var i=1; i<=10; i++){
		sum=sum+i;
	}
	console.log(sum);

	/** for01 実装ここまで **/
}

var for02 = function() {
	console.log('----- for02 -----')
	/**
	 * 【for02】
	 *  ・idが「like-num」の要素内に以下のHTMLを追加せよ。(ul/liはリスト表示をおこなうためのタグ)
	 *
	 *  	<li>1<li>
	 *  	<li>2<li>
	 *  	<li>3<li>
	 *  	<li>4<li>
	 *  	<li>5<li>
	 *
	 *  ・ただしfor文を利用する事
	 **/
	/** for02 実装ここから **/
	for(var i=1; i<=5; i++){
		var numHtml = '<li>'+i+'</li>';
		$('#like-num').append(numHtml);
	}

	/** for02 実装ここまで **/
}

var array01 = function() {
	console.log('----- array01 -----')
	/**
	 * 【array01】
	 *  ・for文を利用して配列langArrayの値が「java」のインデックス番号をコンソール出力せよ。
	 **/
	var langArray = ['JavaScript', 'SQL','Java','HTML','CSS'];
	/** array01 実装ここから **/
	for(var i=0; i<langArray.length; i++){
		var lang=langArray[i];
		if(lang === 'Java'){
			console.log('javaのインデックス：'+i);
		}
	}

	/** array01 実装ここまで **/
}

var array02 = function() {
	console.log('----- array02 -----')
	/**
	 * 【array01】
	 *  ・for文を利用して配列brotherArrayから以下のHTMLを作成し、idが「brother-name」の要素内に追加せよ。
	 *    <li>過去一郎</li>
	 *    <li>現在次郎</li>
	 *    <li>未来太郎</li>
	 *   ・ヒント：配列の要素一つ一つにはオブジェクトが入っています。array=[obj1,obj2,・・・]
	 *     オブジェクトの一つを取り出すには「array[i]」、取り出したオブジェクトの中の特定のキーの値を取得するには「obj.key」でしたね。
	 **/
	var brotherArray = [
	                 {'id':'0001','name':'過去一郎'}
	                 ,{'id':'0002','name':'現在太郎'}
	                 ,{'id':'0003','name':'未来太郎'}
	                 ];
	/** array02 実装ここから **/
	for(var i=0; i<brotherArray.length; i++){
		var person =brotherArray[i];
		var brotherHtml =  '<li>'+person.name+'</li>';
		$('#brother-name').append(brotherHtml)

	}

	/** array02 実装ここまで **/
}

/**
 * 読み込み時の動作
 */
$(document).ready(function() {
	// 初回実行
	if01();
	for01();
	for02();
	array01();
	array02();

	// ボタンを押した時のイベント
	$('#button').click(if02);

});