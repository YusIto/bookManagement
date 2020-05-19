/**
 *
 */

$(document).ready(function () {
	//編集ボタンクリック時、edit_button関数利用
	$("#js-return").click(returnSearch);
});


window.onload = function(){
var dateObj = new Date();
var y = dateObj.getFullYear();
var m = dateObj.getMonth() + 1;
var d = dateObj.getDate();
var yb = "日月火水木金土".charAt(dateObj.getDay());
document.getElementById("view_time").innerHTML = y+"/"+m+"/"+d;


}

var returnSearch = function (){
	console.log("戻るを押しました。");
}



