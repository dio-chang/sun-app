$(function(){
	$(".main_l5").addClass("active")
	// var hr=$(".main_r").css("height");
	// var hl=$(".main_l").css("height");
	// console.log(hr+"--------"+hl)
	// if(hr>hl){
	// 	$(".main_l").css("height",hr)
	// }else{
	// 	$(".main_r").css("height",hl)
	// }
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
        
    //获取平台ID
    var pid = 0;
    var getplatformlistModel = Backbone.Model.extend();
    var getplatformlistCollection = Backbone.Collection.extend({
        model: getplatformlistModel,
        parse: function (resp, xhr) {
            return resp.data.list;
        }
    })
    
    var NewGetplatCollection = new getplatformlistCollection;
    var getplatView = Backbone.View.extend({
        el: $("#select2"),
        template: _.template($('#getplat').html()),
        events: {
        },
        initialize: function () {
            var template = this.template; 
            var el = this.el;
            var render = this.render();
            NewGetplatCollection.fetch({
                beforeSend:function(){
                    beforeSend()
                },
                url:RootUrl+"/?d=api&c=platform&m=getplatformlist",
                error:function(collection,xhr){
                    console.log("获取平台数据失败")
                },
                success:function(collection,xhr){   
                    $(el).html(template({data:collection.models}));
                    pid = $("#select2").find("option:selected").attr("data-pid")
                    $("#pid").val(pid)
                    gettrade()
                }
            })
        }    
    });
    var NewgetplatView = new getplatView;
    $("#select2").change(function(){
         pid = $("#select2").find("option:selected").attr("data-pid")
         $("#pid").val(pid)
    })

    var date = new Date();
    var year = Number(date.getFullYear());  // 获取完整的年份(4位,1970)
    var month = Number(date.getMonth()+1);  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    var day = Number(date.getDate());  // 获取日(1-31)
    var hours = Number(date.getHours());  // 获取小时数(0-23)
    var minutes = Number(date.getMinutes());  // 获取分钟数(0-59)
    $("#datetimepicker3").val(year+"-"+month+"-"+day)
    $("#datetimepicker1").val("0:00")
    $("#datetimepicker4").val(year+"-"+month+"-"+day)
    $("#datetimepicker2").val(hours+":"+minutes)
    var starttime = $("#datetimepicker1").val()
    var endtime = $("#datetimepicker2").val()
    var startdate =$("#datetimepicker3").val()
    var enddate = $("#datetimepicker4").val()
    $("#datetimepicker1").on("click",function(e){
        console.log($("#datetimepicker1").val())
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-hour',
            selectback:function(){
                starttime = $("#datetimepicker1").val()
            }
        });
    });
    $("#datetimepicker2").on("click",function(e){
        console.log($("#datetimepicker2").val())
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-hour',
            selectback:function(){
                endtime = $("#datetimepicker2").val()
            }
        });
    });
    $("#datetimepicker3").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){
                startdate =$("#datetimepicker3").val()
            }

        });
    });
    $("#datetimepicker4").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){
                enddate = $("#datetimepicker4").val()
            }

        });
    });
    $(".pageList").find("button").unbind("click")
    $(".pageList").find("span").unbind("click")
    function gettrade(){
        pid = $("#pid").val()
        var GetTrade = Backbone.Model.extend();
        var GetTradeCollection = Backbone.Collection.extend({
            url:RootUrl+"/?d=api&c=platform&m=getbetlist",
            model: GetTrade,
            shownextpage: '', //是否显示下一页
            currentpage: '', //当前页
            parse: function (resp, xhr) {
                this.shownextpage = resp.data.shownextpage;
                this.currentpage = resp.data.currentpage;
                return resp.data.data;
            }
        })
        var pagennum = 1 ;
        var NewGetTradeCollection = new GetTradeCollection;
        var GetTradeView = Backbone.View.extend({
                el: $(".list"),
                template: _.template($('#betting').html()),
                events: {
                    "click .first_page":function(event){
                        loading()
                        var template = this.template;
                        var el = this.el;
                        NewGetTradeCollection.fetch({
                            type: 'post',
                            beforeSend:function(){
                                beforeSend()
                            },
                            data:{'model': '{"pid":"'+pid+'","endtime":"'+endtime+'","starttime":"'+starttime+'","p":"' + 1 + '","startdate":"'+startdate+'","enddate":"'+enddate+'"}'},
                            success:function(collection,xhr){
                                if(xhr.status!=0){
                                    $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                    addClass()
                                    // var add = $(el).find($(".bettime"))
                                    // $.each(add, function(i, val) {
                                    //     var addtime = $(this).html()
                                    //     var format = formatTime(addtime,2)
                                    //     $(this).html(format)
                                    // });
                                }else{
                                    $(el).html("<li class='nodata'>"+xhr.data.msg+"</li>")
                                }
                                loaded()
                            }
                            
                        })
                    },
                    "click .prev_page":function(event){
                        if(pagennum==1){
                            return false
                        }else{
                            loading()
                            pagennum--
                            var template = this.template;
                            var el = this.el;
                            NewGetTradeCollection.fetch({
                                type: 'post',
                                beforeSend:function(){
                                    beforeSend()
                                },
                                data:{'model': '{"pid":"'+pid+'","endtime":"'+endtime+'","starttime":"'+starttime+'","p":"' + pagennum + '","startdate":"'+startdate+'","enddate":"'+enddate+'"}'},
                                success:function(collection,xhr){
                                    if(xhr.status!=0){
                                        $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                        addClass()
                                    }else{
                                        $(el).html("<li class='nodata'>"+xhr.data.msg+"</li>")
                                    }
                                    loaded()
                                }
                                
                            })
                        }
                    },
                    "click .next_page":function(event){
                        loading()
                        pagennum++ ;
                        var obj=event.currentTarget;
                        var template = this.template;
                        var el = this.el;
                        NewGetTradeCollection.fetch({
                            type: 'post',
                            beforeSend:function(){
                                beforeSend()
                            },
                            data:{'model': '{"pid":"'+pid+'","endtime":"'+endtime+'","starttime":"'+starttime+'","p":"' + pagennum + '","startdate":"'+startdate+'","enddate":"'+enddate+'"}'},
                            success:function(collection,xhr){
                                if(collection.shownextpage==0){
                                    $(obj).attr("disabled","disabled")
                                    $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                    addClass()
                                    return false;
                                }else{
                                    $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                    addClass()
                                    if(xhr.status==0){
                                        $(el).append("<li class='nodata'>"+xhr.data.msg+"</li>")
                                        $(".pageList").css("bottom","-162px")
                                    }
                                }
                                loaded()
                            }
                            
                        })
                        
                        
                    },
                    "click .last_page":function(event){
                        loading()
                        var obj=event.currentTarget;
                        var template = this.template;
                        var el = this.el;
                        NewGetTradeCollection.fetch({
                            type: 'post',
                            beforeSend:function(){
                                beforeSend()
                            },
                            data:{'model': '{"pid":"'+pid+'","endtime":"'+endtime+'","starttime":"'+starttime+'","p":"-' + 1 + '","startdate":"'+startdate+'","enddate":"'+enddate+'"}'},
                            success:function(collection,xhr){
                                if(xhr.status!=0){
                                    $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                    addClass()
                                    pagennum=collection.currentpage
                                }else{
                                    $(el).html("<li class='nodata'>"+xhr.data.msg+"</li>")
                                }
                                loaded()
                            }
                            
                        })
                    },
                    "click .goto":function(event){
                        loading()
                        var obj=event.currentTarget;
                        pagennum=$(".pageinput").val()
                        var template = this.template;
                        var el = this.el;
                        NewGetTradeCollection.fetch({
                            type: 'post',
                            beforeSend:function(){
                                beforeSend()
                            },
                            data:{'model': '{"pid":"'+pid+'","endtime":"'+endtime+'","starttime":"'+starttime+'","p":"' + pagennum + '","startdate":"'+startdate+'","enddate":"'+enddate+'"}'},
                            success:function(collection,xhr){
                                if(xhr.status!=0){
                                    $(el).html(template({data:collection.models,currentpage: collection.currentpage,shownextpage:collection.shownextpage}));
                                    addClass()
                                }else{
                                    $(el).html("<li class='nodata'>"+xhr.data.msg+"</li>")
                                }
                                loaded()
                            }
                            
                        })
                    }
        
                },
                initialize: function () {
                    var template = this.template;
                    var el = this.el;
                    var render = this.render();
                    NewGetTradeCollection.fetch({
                        type:"POST",
                        beforeSend:function(){
                            beforeSend()
                        },
                        data:{'model': '{"pid":"'+pid+'","endtime":"'+endtime+'","starttime":"'+starttime+'","p":"' + 1 + '","startdate":"'+startdate+'","enddate":"'+enddate+'"}'},
                        error:function(collection,xhr){
                            console.log("获取投注记录失败")
                        },
                        success:function(collection,xhr){   
                            if(xhr.status!=0){
                                $(el).html(template({data:collection.models,currentpage: collection.currentpage}));
                                addClass()
                    
                            }else{
                                $(el).html("<li class='nodata'>"+xhr.data.msg+"</li>")
                            }
                            if(!xhr.data.shownextpage){
                                $(".pageList").hide()
                            }
                            loaded()    
                        }
                    })
                }

        })
        var NewGetTradeView =new GetTradeView;
        NewGetTradeView.remove;
        $(".saveSearch").unbind("click").on("click",function(){
            loading()
            starttime = $("#datetimepicker1").val()
            endtime = $("#datetimepicker2").val()
            gettrade()
        })
        function addClass(){
            $(".list").find("tr:even").addClass("even")
            $(".list").find("tr:odd").addClass("odd")
        }
    }
})    