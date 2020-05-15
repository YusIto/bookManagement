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
	// ■IDがselection-areaのDOMを取得してみよう。
	var dom = document.getElementById('selection-area');
	console.log(dom);
	// ■selection-areaの子要素を取得してみよう。
	console.log(dom.children);
}

var add = function  () {
	'use strict';
	console.log('----- add -----');

	// ■IDがaddition-areaのDOMの中に文字列を追加してみよう。
	var additionArea = document.getElementById('addition-area');
	additionArea.innerText = '恥の多い人生でした。';
	// ■IDがaddition-areaのDOMの中にred-blockというクラスを持つdivタグを追加してみよう。
	// <div class="rainbow-block"></div>
	var div = document.createElement('div');
	div.classList.add('rainbow-block');
	additionArea.appendChild(div);
}

var change = function  () {
	'use strict';
	console.log('----- change -----');

	// ■IDがchange-0のDOMの中の文字列を好きな文字と置き換えてみましょう。
	var change0 = document.getElementById('change-0');
	change0.innerText = '吾輩は仔猫である';
	// ■IDがchange-1のDOMの中の文字列を別のDOMに置き換えてみましょう。
	var change1 = document.getElementById('change-1');
	var span = document.createElement('span');
	span.innerText = '夢の印税生活';
	change1.innerHTML = null;
	change1.appendChild(span);
}

var remove = function  () {
	'use strict';
	console.log('----- remove -----');

	// ■IDがdeletion-0のDOMを削除してみよう。
	var dom0 = document.getElementById('deletion-0');
	dom0.remove();
	// ■IDがdeletion-1のDOMを削除してみよう。
	var dom1 = document.getElementById('deletion-1');
	dom1.remove();
}

var addList = function  () {
	'use strict';
	console.log('----- addList -----');

	// テーブルに動的に表示データを追加するサンプル。
	// タグの追加先のtbodyを取得。
	var bodySample = document.getElementById('table-body');
	// 追加するタグのDOMを生成。
	var trSample = document.createElement('tr');
	var idTagSample = document.createElement('th');
	var nameTagSample = document.createElement('th');
	var descTagSample = document.createElement('th');
	// tableタグは列をnameで制御しているため、name属性を各列のDOM追加。
	idTagSample.name = 'id';
	nameTagSample.name = 'name';
	descTagSample.name = 'description';
	// 実際に表示したいコンテンツを設定する。
	// innerTextには文字列しか入らないため、注意すること。
	// また、tag.innerHTMLも利用可能だが、セキュリティに問題があるため利用しないでください。
	idTagSample.innerText = 'ID SAMPLE0000';
	nameTagSample.innerText = 'SAMPLE NAME';
	descTagSample.innerText = 'SAMPLE DESCRIPTION';
	// trタグにthタグを追加する。
	// 追加する順番には気をつけてください。
	trSample.appendChild(idTagSample);
	trSample.appendChild(nameTagSample);
	trSample.appendChild(descTagSample);
	// tbodyタグにtrタグを追加する。
	bodySample.appendChild(trSample);

	// テーブルに表示するデータ。
	var array = [
		{id: '0001', name: 'Microsoft', description: 'Windows大国'},
		{id: '0002', name: 'Apple', description: 'こんなことだって出来る。そう、あいぽんなら。'},
		{id: '0002', name: 'Google', description: 'Androidを知らない？ggrks！'}
	];

	// ■繰り返し処理を使ってでtableに変数arrayの情報を追加してみましょう。
	// hint: Web2の講義で勉強したObjectへのアクセス、for文、この関数の上部のサンプルを
	// 参考にすれば作成可能な処理です。
	var body = document.getElementById('table-body');
	for (var i = 0; i < array.length; i++) {
		var tr = document.createElement('tr');
		var idTag = document.createElement('th');
		var nameTag = document.createElement('th');
		var descTag = document.createElement('th');

		idTag.name = 'id';
		nameTag.name = 'name';
		descTagSample.name = 'description';
		idTag.innerText = array[i].id;
		nameTag.innerText = array[i].name;
		descTag.innerText = array[i].description;

		tr.appendChild(idTag);
		tr.appendChild(nameTag);
		tr.appendChild(descTag);

		body.appendChild(tr);
	}
}

// 関数呼び出し
window.onload = function () {
	select();
	add();
	change();
	remove();
	addList();
};