if(getCookie("ci_session")){
	$("._vr_unLogin").hide();
	$("._vr_loginSuccess").show();
	$("._vr_nickname").html(getCookie("username"))
}else{
	$("._vr_unLogin").show();
	$("._vr_loginSuccess").hide();
	clearCookie("username");
	goHome()
}
$(".username").html(getCookie("username"))

$(".bangdinBtn").on("click",function(){
	alert("敬请期待")
})