$(function(){
	$(".navbar-nav").find("li").eq(5).addClass("activenav").siblings().removeClass("activenav")
	jQuery(".focus-slide .slide-inner li").first().before(jQuery(".focus-slide .slide-inner li").last());
	jQuery(".focus-slide").hover(function() {
		jQuery(this).find(".arrow").stop(true, true).fadeIn(300)
	}, function() {
		jQuery(this).find(".arrow").fadeOut(300)
	});
	jQuery(".focus-slide").slide({
		titCell: ".slide-indicators ul",
		mainCell: ".slide-inner ul",
		effect: "leftLoop",
		autoPlay: false,
		vis: 3,
		autoPage: true,
		trigger: "click"
	});

var miao = 2
var time = 12

var timer = setInterval(function(){
	miao--
	if(miao<10){
		miao="0"+miao
	}
	if(miao==00){
		miao=59
		time--
		if(time<10){
			time="0"+time
		}
		if(time==00){
			time=12
		}
	}
	$(".shi").html(time)
	$(".fen").html(miao)
},1000)
});