function initCommonEvent() {
    $('.notice-list>ul>li').css({'display':'inline-block','min-width':'200px'});
    $('.notice-list').Marquee({
        isMarquee: true,
        isEqual: false,
        scrollDelay: 20,
        direction: 'left'
    });
}
$(function(){
	$(".nav_button").on("click",function(){
		if($(".panelLeft").hasClass("panelClose")){
			$(".panelLeft").addClass("panelOpen").removeClass("panelClose")
			$(".mask").show();
		}else{
			$(".panelLeft").addClass("panelClose").removeClass("panelOpen")
			$(".mask").hide()
		}
		
	})

	$(".personal_button").on("click",function(){
		if($(".panelRight").hasClass("panelClose")){
			$(".panelRight").addClass("panelOpen").removeClass("panelClose")
			$(".mask").show();
		}else{
			$(".panelRight").addClass("panelClose").removeClass("panelOpen")
			$(".mask").hide()
		}
		
	})


	$(".mask").on("click",function(){
		$(".panel").addClass("panelClose").removeClass("panelOpen");
		$(this).hide()
	})	
	initCommonEvent();
    

	var timer = null
	function toScroll(){ 
		var scrollTo=3966711627;
		var r1=new DigitRoll({
			container:'#num-roll',
			digit:10,
			isPicture: true
		});
		r1.roll(scrollTo);
		clearInterval(timer)
		timer = setInterval(function () {
			if (scrollTo < 7966711627) {
			    scrollTo+=123;
			    if(scrollTo>7966711627){
			    	scrollTo=390000000 
			    }
			}
			r1.roll(scrollTo);
		},100)
	}	
	toScroll()
})	
	