$(".navbar-nav").find("li").eq(3).addClass("activenav").siblings().removeClass("activenav")
var timer = null
function toScroll(){ 
	var scrollTo=3987654321;
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
// for(var i=0;i<$(".num").length;i++){
	// ($('.num').eq(9).html())
	$('.num').eq(8).before("<b class='dou'>.</b>");
	$('.num').eq(8).css("margin-left","9px")
	$('.num').eq(5).before("<b class='dou1'>,</b>");
	$('.num').eq(5).css("margin-left","9px")
	$('.num').eq(2).before("<b class='dou2'>,</b>");
	$('.num').eq(2).css("margin-left","9px")
// }
function toScroll2(startNum,id,toNum,digit,newr,timer){
	var scrollTo=startNum;
	var newr=new DigitRoll({
		container:id,
		digit:digit,
		isPicture: true
	});
	newr.roll(scrollTo);
	clearInterval(timer)
	timer = setInterval(function () {
		if (scrollTo < toNum) {
		    scrollTo+=123;
		    if(scrollTo>toNum){
		    	scrollTo=startNum
		    }
		}
		newr.roll(scrollTo);
	},100)
}
// toScroll2(3312345,"#num-roll1",3370716,7,"r2","timer1")
// toScroll2(3312345,"#num-roll2",3370716,7,"r3","timer2")
// toScroll2(3312345,"#num-roll3",3370716,7,"r4","timer3")
// toScroll2(3312345,"#num-roll4",3370716,7,"r5","timer4")
// toScroll2(3312345,"#num-roll5",3370716,7,"r6","timer5")
// toScroll2(3312345,"#num-roll10",3370716,7,"r11","timer6")



$(".close").on("click",function(){
	$(this).parents(".box").remove()
})
var aLi = $(".sub_nav").find("li")
var content = $(".contentList")
aLi.each(function(i){
	$(this).on("click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		content.eq(i).show().siblings(content).hide();
	})
})
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

var type = getQueryString("type")
if(type=="pt"){
	$(".pt").addClass("cur").siblings().removeClass("cur")
	showGame(".ptlist","#ptGame","9")
	$(".contentList").hide()
	$(".ptlist").show()
}
if(type=="mg"){
	$(".mg").addClass("cur").siblings().removeClass("cur")
	showGame(".mglist","#mgGame","22")
	$(".contentList").hide()
	$(".mglist").show()
}

if(type=="xin"){
	$(".xin").addClass("cur").siblings().removeClass("cur")
	showGame(".xinlist","#xinGame","19")
	$(".contentList").hide()
	$(".xinlist").show()
}
function select(id){
	$("#"+id+" dd").click(function () {
		$(this).addClass("selected").siblings().removeClass("selected");
	})
}
select("select1")
select("select2")
select("select3")
select("select4")
HotGameList()
function HotGameList(){
	var HotGameModel = Backbone.Model.extend();
	var HotGameCollection = Backbone.Collection.extend({
	        model: HotGameModel,
	        parse: function (resp, xhr) {
	            return resp.data.list;
	        }
	    });
	var NewHotGameCollection = new HotGameCollection;
	var HotgameView = Backbone.View.extend({
	        el: $(".hotlist"),
	        template: _.template($('#hotGame').html()),
	        events: {
	        	"click .hotgame":function(event){
	        		var thistype = event.currentTarget;
	        		var gameTitle = $(thistype).find(".gameTitle").html()
	        		var pid = $(thistype).attr("data-pid")
	        		var value = $(thistype).attr("data-value")
	        		location.href = indexUrl+views+"game.html?d=api&c=game&m=entergame&pid="+pid+"&gametype="+value+"&gameTitle="+gameTitle
	        	}
	        },
	        initialize: function () {
	            var template = this.template;
	            var el = this.el;
	            var render = this.render();
	            NewHotGameCollection.fetch({
	                url: RootUrl+"/?d=api&c=game&m=gethotgamelist",
	                error:function(collection,xhr){
	                    console.log("请求热门游戏失败")
	                },
	                success: function (collection, xhr) {
	                  	$(el).html(template({data: collection.models}));
	                  	console.log(xhr.data.msg)
	                },
	                silent: true,
	            });
	        } 
	    })
	var NewhotView = new HotgameView;	
}
$(".hot").on("click",function(){
	HotGameList()
})
$(".pt").on("click",function(){
	window.location.href=indexUrl+views+"slotMachine.html?type=pt"
	showGame(".ptlist","#ptGame","9")
})
$(".mg").on("click",function(){
	window.location.href=indexUrl+views+"slotMachine.html?type=mg"
	showGame(".mglist","#mgGame","22")
})
$(".xin").on("click",function(){
	window.location.href=indexUrl+views+"slotMachine.html?type=xin"
	showGame(".xinlist","#xinGame","19")
})
function showGame(list,tem,pid){
	var PtGame = Backbone.Model.extend(); 
	var PtGameCollection = Backbone.Collection.extend({
		model: PtGame,
        parse: function (resp, xhr) {
            return resp.data.list;
        }
	})    
	var NewPtCollection = new PtGameCollection;
	var ptView = Backbone.View.extend({
		 el: $(list),
        template: _.template($(tem).html()),
        events: {
        	"click .xinpic":function(event){
        		var thistype = event.currentTarget;
        		var gameTitle=$(thistype).find(".gameTitle").html()
        		var value = $(thistype).attr("data-value")
        		location.href=indexUrl+views+"game.html?d=api&c=game&m=entergame&pid="+pid+"&gametype="+value+"&gameTitle="+gameTitle
        	},
        	"mouseover .smallpic":'handleHover',
        	"mouseout .smallpic":'handleOut',
        	"click .goGame":function(event){
        		var thistype = event.currentTarget;
        		var gameTitle=$(thistype).attr("data-tit")
        		var value = $(thistype).attr("data-value")
        		location.href=indexUrl+views+"game.html?d=api&c=game&m=entergame&pid="+pid+"&gametype="+value+"&gameTitle="+gameTitle
        	},
			"click .goTrygame":function(event){
				var thistype = event.currentTarget;
        		var gameTitle=$(thistype).attr("data-tit")
        		var value = $(thistype).attr("data-value")
        		location.href="game.html?game="+value+"&gameType=goTrygame&gameTitle="+gameTitle
			},
			"click .goGameMg":function(event){
				var thistype = event.currentTarget;
        		var gameTitle=$(thistype).attr("data-tit")
        		var value = $(thistype).attr("data-value")
        		location.href=indexUrl+views+"game.html?d=api&c=game&m=entergame&pid="+pid+"&gametype="+value+"&gameTitle="+gameTitle
			},
			"click .goTrygameMg":function(event){
				var thistype = event.currentTarget;
        		var gameTitle=$(thistype).attr("data-tit")
        		var value = $(thistype).attr("data-value")

        		location.href="game.html?game="+value+"&gameType=goTrygameMg&gameTitle="+gameTitle
			}
        },
        initialize: function () {
            var template = this.template;
            var el = this.el;
            var render = this.render();
            NewPtCollection.fetch({
            	data:{'model': '{"pid":"' + pid + '"}'},
            	type:"POST",
                url: RootUrl+"/?d=api&c=game&m=getgamelist",
                error:function(collection,xhr){
                    console.log("请求热门游戏失败")
                },
                success: function (collection, xhr) {
                	console.log(typeof(xhr.data.list))
                  	$(el).html(template({data: collection.models}));
                  	console.log(xhr.data.msg)
                },
                silent: true,
            });
        } ,
        handleHover:function(event){
        	var obj = event.currentTarget
        	$(obj).find(".cover").stop().animate({
        		"height":"100%"
        	},500)
        	$(obj).find(".covertit").show()
        	$(obj).find(".gameTab").show()
        },
        handleOut:function(event){
        	var obj = event.currentTarget
        	$(obj).find(".cover").stop().animate({
        		"height":0
        	},500,function(){
        		$(obj).find(".covertit").hide()
        	})
        	$(obj).find(".gameTab").hide()
        }
	})
	var NewPtView = new ptView;
}

var getTopgameHistory = Backbone.Model.extend()
var getTopgameHistoryCollection = Backbone.Collection.extend({
    url:RootUrl+"?d=api&c=game&m=gettopgamehistory",
    model: getTopgameHistory,
    parse: function (resp, xhr) {
        return resp.data.data;
    }
});
var NewHistoryCollection = new getTopgameHistoryCollection;
var HistoryView = Backbone.View.extend({
        el: $("#news"),
        template: _.template($('#getTopgameHistory').html()),
        events: {
        },
        initialize: function () {
            var template = this.template;
            var el = this.el;
            var render = this.render();
            NewHistoryCollection.fetch({
                error:function(collection,xhr){
                    console.log("获胜消息失败")
                },
                type:"POST",
                success: function (collection, xhr) {
                	if(xhr.status==1){
                		$(el).html(template({data:collection.models}));
                		$(".news_inner").kxbdMarquee({direction:"up",isEqual:false});
                	}else{
                		$(".news_inner").kxbdMarquee({direction:"up",isEqual:false});
                		return false
                	}
            		
                },
                silent: true,
            });
        }
    })
var NewHistoryView = new HistoryView;

$(document).scroll(function() {
	var scrolltop;
	var timer;
	scrolltop=$(document).scrollTop()
	console.log(scrolltop)
	if(scrolltop>400){
		$(".youhui").css({"position":"fixed","top":"40%","left":"50%","margin-left":"-730px"})
	}else{
		$(".youhui").css({"position":"absolute","top":"40%","left":"-150px"})
	}
})
