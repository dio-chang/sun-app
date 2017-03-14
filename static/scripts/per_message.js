$(function (){
    loading()
	$(".main_l1").addClass("active")
	$(".safeNav").find("li").click(function(){
		if($(this).hasClass("active")){
			return false
		}else{
			$(this).addClass("active").siblings().removeClass("active")
		}
		if($(".safeNav2").hasClass("active")){
		$(".showbox2").addClass("show").siblings().removeClass("show")
		}
		if($(".safeNav1").hasClass("active")){
			$(".showbox1").addClass("show").siblings().removeClass("show")
		}
		if($(".safeNav3").hasClass("active")){
			$(".showbox3").addClass("show").siblings().removeClass("show")
		}
	})
    $("#datetimepicker1").on("click",function(e){
        e.stopPropagation();    
        $(this).lqdatetimepicker({
            css : 'datetime-hour'
        });
    });
    $("#datetimepicker2").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-hour'
        });
    });
    $("#datetimepicker3").on("click",function(e){

        e.stopPropagation();

        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){
            }

        });
    });
    $("#datetimepicker4").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){
            }

        });
    });
    var pageNum = 1
    var MessageModel = Backbone.Model.extend()
    var MessageCollection = Backbone.Collection.extend({
        url: RootUrl+"/?d=api&c=webmail&m=webmaillist",
        model: MessageModel,
        parse: function (resp, xhr) {
            this.shownextpage = resp.data.shownextpage;
            this.currentpage = resp.data.currentpage;
            return resp.data.webmaillist;
        }
    });
    $(".next_page").unbind("click")
    var NewmessageCollection = new MessageCollection;
    var MessageView = Backbone.View.extend({
            el: $("#list"),
            template: _.template($('#tpl').html()),
            events: {
                "click .messageTit ":function(event){
                    GetCountmail()
                    loading()
                    var obj=event.currentTarget;
                    var MessContentModel = Backbone.Model.extend();
                    var NewContentModel = new MessContentModel({
                        id:Number($(obj).attr("data-id"))
                    });
                    NewContentModel.save(null,{
                        type:"POST",
                        beforeSend:function(){
                            beforeSend()
                        },
                        url: RootUrl+"/?d=api&c=webmail&m=getcontent",
                        error:function(model,xhr){
                            console.log("请求站内信详情失败")
                        },
                        success:function(model,xhr){
                            loaded()
                            BootstrapDialog.alert({
                                type: BootstrapDialog.TYPE_INFO,
                                message: xhr.data.webmail.content,
                                title: xhr.data.webmail.title
                            });
                            setTimeout(function(){
                                $(".bootstrap-dialog-message").css("text-align","left")
                            },200)
                        }
                    })
                },
                'click .del':function(event){
                    loading()
                    var obj=event.currentTarget;
                    var DelModel = Backbone.Model.extend();
                    var NewDelModel = new DelModel({
                        mailid:$(obj).attr("data-id")
                    })
                    NewDelModel.save(null,{
                        beforeSend:function(){
                            beforeSend()
                        },
                        type:"POST",
                        url:RootUrl+"/?d=api&c=webmail&m=delwebmail",
                        error:function(){
                            console.log("请求删除站内信失败")
                        },
                        success:function(){
                            $(obj).parent("li").remove();
                            var num = $(".xiaoxi").html()
                            num=num-1
                            $(".xiaoxi").html(num)
                            $("._vr_notice").html(num)
                            loaded()
                            alert("删除成功")

                        }
                    })
                },
                "click .first_page":function(event){
                    var template = this.template;
                    var el = this.el;
                    NewmessageCollection.fetch({
                        type:"POST",
                        beforeSend:function(){
                            beforeSend()
                        },
                        data:{'model': '{"p":"1"}'},
                        success:function(collection,xhr){
                            if(xhr.status!=0){
                                $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                var add = $(el).find($(".two"))
                                $.each(add, function(i, val) {
                                    var addtime = $(this).html()
                                    var format = formatTime(addtime,2)
                                    $(this).html(format)
                                });
                                $(".list li:even").addClass("even");
                                $(".list li:odd").addClass("odd");
                                $(".pageinput").val("1")
                            }else{
                                $(el).html("<li class='nodata'>"+xhr.data.msg+"</li>")
                            }
                        },
                        silent: true,
                        
                    })
                },
                'click .prev_page': function (events)   //上页
                {
                    loading()
                    console.log(pageNum)
                    if(pageNum==1){
                        loaded()
                        return false;
                    }else{
                        pageNum--;
                        var template = this.template;
                        var el = this.el;
                        NewmessageCollection.fetch({
                            beforeSend:function(){
                                beforeSend()
                            },
                            type:"POST",
                            data:{'model': '{"p":"'+pageNum+'"}'},
                            url: RootUrl+"/?d=api&c=webmail&m=webmaillist",
                            success: function (collection, xhr) {
                                loaded()
                                if (xhr.status == 0)
                                {
                                    console.log("status=0")
                                } else {
                                    $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                    var add = $(el).find($(".two"))
                                    $.each(add, function(i, val) {
                                        var addtime = $(this).html()
                                        var format = formatTime(addtime,2)
                                        $(this).html(format)
                                    });
                                    $(".list li:even").addClass("even");
                                    $(".list li:odd").addClass("odd");    
                                    $(".currentpage").html(pageNum)
                                }
                                
                            },
                            silent: true,
                        });
                    }
                },
                'click .next_page': function (events){
                    loading()
                    pageNum = pageNum+1;
                    var template = this.template;
                    var el = this.el; 
                    NewmessageCollection.fetch({ 
                        beforeSend:function(){
                            beforeSend()
                        },
                        type:"POST",
                        data:{'model': '{"p":"'+pageNum+'"}'},
                        url: RootUrl+"/?d=api&c=webmail&m=webmaillist",
                        error:function(){
                            console.log("获取下一页失败")
                        },
                        success: function (collection, xhr) {
                            console.log(xhr.data)
                            if (xhr.status == 0){
                                
                            } else {
                                $(el).html(template({data: collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                var add = $(el).find($(".two"))
                                $.each(add, function(i, val) {
                                    var addtime = $(this).html()
                                    var format = formatTime(addtime,2)
                                    $(this).html(format)
                                });
                                $(".list li:even").addClass("even");
                                $(".list li:odd").addClass("odd");
                                $(".pageinput").val(pageNum)
                            }
                            if(collection.shownextpage==0){
                                pageNum=collection.currentpage
                                $(".next_page").hide()
                                if(xhr.status==0){
                                    $(el).append("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
                                    $(".pageList").css("bottom","-162px")
                                }
                            }
                            loaded()
                        },
                        silent: true,
                    });
                },
                "click .last_page":function(event){
                    loading()
                    var obj=event.currentTarget;
                    pagennum=$(obj).val()
                    var template = this.template;
                    var el = this.el;
                    NewmessageCollection.fetch({
                        type:"POST",
                        beforeSend:function(){
                            beforeSend()
                        },
                        data:{'model': '{"p":"-1"}'},
                        error:function(){

                        },
                        success:function(collection,xhr){
                            if(xhr.status!=0){
                                $(el).html(template({data:collection.models,currentpage: collection.currentpage}));
                                $(".next_page").hide()
                                var add = $(el).find($(".two"))
                                $.each(add, function(i, val) {
                                    var addtime = $(this).html()
                                    var format = formatTime(addtime,2)
                                    $(this).html(format)
                                });
                                $(".list li:even").addClass("even");
                                $(".list li:odd").addClass("odd");
                                $(".pageinput").val(collection.currentpage)
                            }else{
                                $(el).html("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
                            }
                            loaded()
                        }
                        
                    })
                },
            },
            initialize: function () {
                var template = this.template;
                var el = this.el;
                var render = this.render();

                NewmessageCollection.fetch({
                    beforeSend:function(){
                        beforeSend()
                    },
                    error:function(collection,xhr){
                        console.log("请求站内信失败")
                    },
                    type:"POST",
                    success: function (collection, xhr) {
                        if (xhr.status != 1){    
                            $(el).html("<p>暂无站内信</p>")
                        }else{
                            $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                            var add = $(el).find($(".two"))
                            $.each(add, function(i, val) {
                                var addtime = $(this).html()
                                var format = formatTime(addtime,2)
                                $(this).html(format)
                            });
                     
                            $(".list li:even").addClass("even");
                            $(".list li:odd").addClass("odd");
                        }
                        loaded()
                    },
                    silent: true,
                });
            }
    })
    var NewMessageView = new MessageView;
    NewMessageView.remove
    // initCommonEvent();
})