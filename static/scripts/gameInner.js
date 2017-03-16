$(function(){
	function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
	var pid = getQueryString("pid")
	var gametype =  getQueryString("gametype")
	var gameTitle = getQueryString("gameTitle")
	var trygame =  getQueryString("m")
	var type = getQueryString("type")
	var game = getQueryString("game")
	loading()
	setTimeout(function(){
		loaded()
	},2000)
	if(type=="ag"){
		$("#gameFrame").attr("src",RootUrl+"?d=api&c=game&m=entergame&pid=24&gametype=6")
		$(".navbar-nav").find("li").eq(3).addClass("activenav").siblings().removeClass("activenav")
	}else if(gametype==0||gametype==1||gametype=="bal"){
		$("#gameFrame").attr("src",RootUrl+"?d=api&c=game&m=entergame&pid="+pid+"&gametype="+gametype)
		$(".navbar-nav").find("li").eq(2).addClass("activenav").siblings().removeClass("activenav")
		$('title').html("游戏--"+gameTitle)
	}else if(gametype=="goTrygame"){
		$("#gameFrame").attr("src","http://cache.download.banner.powerplay88.com/flash/72/launchcasino.html?game="+game+"&language=Zh-cn&mode=offline#"+game)
		$('title').html("游戏--"+gameTitle)
	}else if(gametype=="goTrygameMg"){
		$("#gameFrame").attr("src","http://redirector3.valueactive.eu/Casino/Default.aspx?applicationid=1023&serverid=2712&csid=2712&theme=quickfire&variant=TNG-Demo&usertype=0&sext1=demo&sext2=demo&gameid="+game+"&ul=EN")
		$('title').html("游戏--"+gameTitle)
	}else{
		$("#gameFrame").attr("src",RootUrl+"?d=api&c=game&m=entergame&pid="+pid+"&gametype="+gametype)
		$(".navbar-nav").find("li").eq(2).addClass("activenav").siblings().removeClass("activenav")
		$('title').html("游戏--"+gameTitle)
	}
		
	
})
