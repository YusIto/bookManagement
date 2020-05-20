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
			url : 'bookManagement/EmployeeBookServlet',
			dataType : 'json',
			//data : requestQuery,
			success : function(json) {

				var syainName = json[0].syainName;
				document.getElementById("title_name").innerHTML = syainName + "さんの趣味一覧です！";

				for (var i = 0; i < json.length; i++) {

					var element = json[i];

					var record = '<tr>'
						+ '<td>' + element.no + '</td>'
						+ '<td>' + element.hobbyCategory + '</td>'
						+ '<td>' + element.hobby + '</td>'
						+ '</tr>';

					$('#table_data').append(record)
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


var retrunButton = function(){
	console.log("戻るを押しました。");
}