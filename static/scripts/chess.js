$(function(){
$(".navbar-nav").find("li").eq(6).addClass("activenav").siblings().removeClass("activenav")
var timer;
var timeOut;
var timer2;
var timer3;
var timer4;
var timer5;
var timer6;
var timer7;
//波浪	
	move()
	move3()
	function atuoMove(className,leftVal,defaltVal,time,time1){
		$("."+className).animate({
			left:leftVal
		},time,function(){
			$('.'+className).animate({
				left:defaltVal
			},time1)})
	}
	function move(){
		atuoMove("lang2","-7000px","-10px",120000,120000)

	}
	function move3(){
		atuoMove("lang3","-7000px","-100px",160000,160000)

	}

	bigfish()

	function bigfish(){
		$(".bigfish").animate({
			top:"196px",
			left:"258px"
		},3000,function(){
			$(".tips").show()
		})
		
		
	}
	
	setTimeout(function(){
		$(".lang").hide()
		$(".lang1").show()
	},800)
	
	clearInterval(timer)
	timer=setInterval(function(){
		move()
	},240000)

	clearInterval(timer3)
	timer3=setInterval(function(){
		move3()
	},320000) 


//大鱼	

	bobofn()
	clearInterval(bobo)
	var bobo = setInterval(function(){
		bobofn()
	},16000)
	function bobofn(){
		$(".bobo").animate({
			marginLeft:"-800px"
		},8000,function(){
			$(".bobo").animate({
				marginLeft:"-1067px"
			},8000)
		})
	}
	setTimeout(function(){
		$(".diandian").show("slow")
	},2000)

})