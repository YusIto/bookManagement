// AjaxでJSONを取得する
function executeAjax () {
	'use strict';

	// ?以降のパラメータを取得
	// 今回で言うとhttp://localhost:8080/wt1/hobby.html?q=0001でいう0001が取得される
//	var parameter  = location.search.substring( 1, location.search.length );
//	parameter = decodeURIComponent( parameter );
//	parameter = parameter.split('=')[1];




		$.ajax({
			type : 'GET',
			url : 'http://localhost:8080/bookManagement/EmployeeBookServlet',
			dataType : 'json',

			success : function(json) {
				console.log(json);

				for (var i = 0; i < json.length; i++) {

					var element = json[i];
					console.log(element.title);
					console.log(element.author);
					console.log(element.genre);
					console.log(element.returnDate);
					console.log(element.id);

					var record = '<tr>'
						+ '<td>' + element.title + '</td>'
						+ '<td>' + element.author + '</td>'
						+ '<td>' + element.genre + '</td>'
						+ '<td>' + element.returnDate + '</td>'
						+ '<td><button value='+element.id+' onclick = "returnBook(this)">返却</button></td>'
						+ '</tr>';

					$('#table_data').append(record);


					}
			}
		});


}

$(document).ready(function () {
	'use strict';

	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
	$('#js-return').click(retrunButton);

});

var returnBook = function(i){
	console.log("返却ボタンを押しました。");
	var returnBookValue =$(i).val();
	console.log("deleteEmpのなか"+i);
	console.log("deleteEmpのなかf"+ returnBookValue);


//	$.ajax({
//		type : 'GET',
//		url : 'http://localhost:8080/bookManagement/EmployeeBookServlet',
//		dataType : 'json',
//
//		success : function(json) {
//			console.log(json);
//
//
//
//
//			for (var i = 0; i < json.length; i++) {
//
//				var element = json[i];
//				console.log(element.title);
//				console.log(element.author);
//				console.log(element.genre);
//				console.log(element.returnDate);
//				console.log(element.id);
//
//				var record = '<tr>'
//					+ '<td>' + element.title + '</td>'
//					+ '<td>' + element.author + '</td>'
//					+ '<td>' + element.genre + '</td>'
//					+ '<td>' + element.returnDate + '</td>'
//					+ '<td><button value='+element.id+' onclick = returnBook(this)>返却</button></td>'
//					+ '</tr>';
//
//				$('#table_data').append(record);
//
//
//				}
//		}
//	});



}




var retrunButton = function(){
	console.log("戻るを押しました。");

}