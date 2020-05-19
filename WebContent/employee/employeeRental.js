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

//			var edit ='<td><input type="button"value="'+pwDepartment.departmentId+'" class = "js-edit-button" onclick = "editDepartment(this)" >編集</input></td>'
//			var del= ' <td><input type="button" value="'+pwDepartment.departmentId+'" class = "js-delete-button" onclick = "deleteDepartment(this)"  >削除</input></td>'
//			$('#DepartmentTable').append('<tr>'+'<td>'+pwDepartment.departmentId+'</td>'+'<td>'+pwDepartment.departname+'</td>'+edit +del+'</tr>');
//


			// $('#hobbyTable').append('<tr>'+'<td>'+pwhobby.hobbyCategory+'</td>'+'</tr>');
		 	// $('#hobbyTable').append('<td>'+pwhobby.hobby+'</td>'+'</tr>');
				//$('#hobbyTable').append('<td>'+i+1+'</td>');
				$('#rentalTable').append('<tr>'+'<td id = "js-title" >'+pw.title+'</td>'+'<td id = "js-author">'+pw.author+'</td>'+ '<td id = "js-genre">'+pw.genre+'</td>'+ '</tr>');
				//$('#rentalTable').append('<tr>'+'<td ><input id = "js-title" value = "'+pw.title+'">'+pw.title+'</td>'+'<td><input id = "js-author" value = "'+pw.author+'">'+pw.author+'</td>'+ '<td><input id = "js-genre" value = "'+pw.genre+'">'+pw.genre+'</td>'+ '</tr>');

				//$('#hobbyTable').append('<tr>'+'</tr>');






		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});




});


//window.onload = function(){
//var dateObj = new Date();
//var y = dateObj.getFullYear();
//var m = dateObj.getMonth() + 1;
//var d = dateObj.getDate();
//var yb = "日月火水木金土".charAt(dateObj.getDay());
//document.getElementById("view_time").innerHTML = y+"/"+m+"/"+d;
//
//}


window.onload = function () {
    var today = new Date();
    today.setDate(today.getDate());
    var yyyy = today.getFullYear();
    var mm = ("0"+(today.getMonth()+1)).slice(-2);
    var dd = ("0"+today.getDate()).slice(-2);
    document.getElementById("js-today").value=yyyy+'/'+mm+'/'+dd;
}

var confirmation = function (){
	console.log("確定を押しました。");

 var titleVal  =  $('#js-title').text();
 console.log(titleVal);
 var authorVal  =  $('#js-author').text();
 console.log(authorVal);
 var genreVal  =  $('#js-genre').text();
 console.log(genreVal);

 var todayVal = $('#js-today').val();
console.log(todayVal);

 var retrunDateVal = $('#js-retrun-date').val();
 var retrunDate1 = retrunDateVal.replace('-','/')
 var retrunDate = retrunDate1.replace('-','/');
 console.log(retrunDate);


var requestQuery = {
		title:titleVal,
		author:authorVal,
		genre:genreVal,
		today:todayVal,
		retrunDate:retrunDateVal
}




 $.ajax({
		Type : 'GET',
		url : '/bookManagement/EmployeeRentalConfirmServlet',//サーブレットを確認
		dataType : 'json',
		data : requestQuery,



		success : function(pw) {
			console.log(pw);
			console.log(pw.title);
			console.log(pw.author);
			console.log(pw.genre);




		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});






}



var returnSearch = function (){
	console.log("戻るを押しました。");
}






