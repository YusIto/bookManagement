// AjaxでJSONを取得する
function executeAjax () {
	'use strict';




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

					var returnDate1 = element.returnDate;

					console.log(returnDate1.substring(0,11));

					var returnDate3=returnDate1.substring(0,11)
					var returnDate2 = returnDate3.replace('-','/');
					var returnDate = returnDate2.replace('-','/');
					console.log(returnDate);



					var record = '<tr>'
						+ '<td>' + element.title + '</td>'
						+ '<td>' + element.author + '</td>'
						+ '<td>' + element.genre + '</td>'
						+ '<td>' + returnDate + '</td>'
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

	var rq = {BookID:returnBookValue};

 $.ajax({
		type : 'GET',
		url : 'http://localhost:8080/bookManagement/EmployeeBookReturnServlet',
		dataType : 'json',
		data:rq,

		success : function(json) {
			console.log('返却完了');


		}
	});



}




var retrunButton = function(){
	console.log("戻るを押しました。");
	var url = 'http://localhost:8080/bookManagement/employee/employeeSearch.html';
	location.href = url;

}