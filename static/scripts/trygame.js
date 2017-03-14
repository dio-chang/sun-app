$(function(){
	function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }  
	var pid = getQueryString("pid")
	loading()
	setTimeout(function(){
		loaded()
	},2000)
	$("#gameFrame").attr("src",RootUrl+"/?d=api&c=game&m=trygame&pid="+pid)
	$(".navbar-nav").find("li").eq(8).addClass("activenav").siblings().removeClass("activenav")
	
	$(".close").on("click",function(){
		$(this).parents(".box").remove()
	})
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
})
