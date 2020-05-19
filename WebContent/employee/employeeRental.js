/**
 *
 */

$(document).ready(function () {
	//編集ボタンクリック時、edit_button関数利用
	$("#js-return").click(returnSearch);
	$("#js-confirmation").click(confirmation);


	$.ajax({
		Type : 'GET',
		url : '/bookManagement/EmployeeRentalServlet',//サーブレットを確認
		dataType : 'json',
		//data : requestQuery,
		success : function(pw) {
			console.log(pw);
			console.log(pw.title);
			console.log(pw.author);
			console.log(pw.genre);




			// $('#hobbyTable').append('<tr>'+'<td>'+pwhobby.hobbyCategory+'</td>'+'</tr>');
		 	// $('#hobbyTable').append('<td>'+pwhobby.hobby+'</td>'+'</tr>');
				//$('#hobbyTable').append('<td>'+i+1+'</td>');
				$('#rentalTable').append('<tr>'+'<td>'+pw.title+'</td>'+'<td>'+pw.author+'</td>'+ '<td>'+pw.genre+'</td>'+ '</tr>');

				//$('#hobbyTable').append('<tr>'+'</tr>');






		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});




});


window.onload = function(){
var dateObj = new Date();
var y = dateObj.getFullYear();
var m = dateObj.getMonth() + 1;
var d = dateObj.getDate();
var yb = "日月火水木金土".charAt(dateObj.getDay());
document.getElementById("view_time").innerHTML = y+"/"+m+"/"+d;


}

var confirmation = function (){
	console.log("確定を押しました。");

}



var returnSearch = function (){
	console.log("戻るを押しました。");
}






