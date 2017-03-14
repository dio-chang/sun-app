$(document).ready(function(){
	loading()
	$(".pageList").find("td").unbind("click")
    $(".mingxiNav").addClass("active");
	$("#select2 dd").click(function () {
		$(this).addClass("selected").siblings().removeClass("selected");
	});
	var tradetype = 1;
	var datetype = 2;
	gettrade(tradetype)    
	$("#select1 dd").click(function () {
		loading()
		$(this).addClass("selected").siblings().removeClass("selected");
		tradetype = $(".selected").attr("trade-type")
		$(".pageList").find("td").unbind("click")
		gettrade(tradetype)
	}); 
	$("#select2 dd").click(function () {
		loading()
		$(this).addClass("selected2").siblings().removeClass("selected2");
		datetype = $(".selected2").attr("data-type")
		$(".pageList").find("td").unbind("click")
		gettrade(tradetype)
	});  
	function gettrade(tradetype){
		var GetTrade = Backbone.Model.extend();
		var GetTradeCollection = Backbone.Collection.extend({
			beforeSend:function(){
                beforeSend()
            },
			url:RootUrl+"/?d=api&c=account&m=gettradelist",
			model: GetTrade,
			shownextpage: '', //是否显示下一页
        	currentpage: '', //当前页
	        parse: function (resp, xhr) {
	        	this.shownextpage = resp.data.shownextpage;
            	this.currentpage = resp.data.currentpage;
	            return resp.data.list;
	        }
		})

		var pagennum = 1 ;
	    var NewGetTradeCollection = new GetTradeCollection;
	    var GetTradeView = Backbone.View.extend({
	            el: $(".gettradelist"),
	            template: _.template($('#gettrade').html()),
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
		                    data:{'model': '{"tradetype":"' + tradetype + '","datetype":"'+datetype+'","page":"1"}'},
		                    success:function(collection,xhr){
		                    	if(xhr.status!=0){
		            				$(el).html(template({data:collection.models,currentpage: collection.currentpage}));
		            				addClass()
		            				var add = $(el).find($(".addtime"))
	                                $.each(add, function(i, val) {
	                                    var addtime = $(this).html()
	                                    var format = formatTime(addtime,2)
	                                    $(this).html(format)
	                                });
	                                if(tradetype==1){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==0){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待处理</a>")
	                                		}else if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}else if(xhr.data.list[i].status==2){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")
	                                		}else{
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
	                                		}
	                                	}
	                                }else if(tradetype==2){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>已提交</a>")
	                                		}else if(xhr.data.list[i].status==2){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待审核</a>")
	                                		}else if(xhr.data.list[i].status==3){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>转出中</a>")
	                                		}else if(xhr.data.list[i].status==4){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}else if(xhr.data.list[i].status==5){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")		
	                                		}else{
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
	                                		}
	                                	}
	                                }else if(tradetype==3){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }else if(tradetype==4){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }else{
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }
		                		}else{
		                			$(el).html("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
		                		}
		                		loaded()
		                    }
		            		
	            		})

	            	},
	            	"click .prev_page":function(event){
	            		loading()
	            		if(pagennum==1){
	            			return false
	            		}else{
	            			pagennum--
	            			var template = this.template;
			                var el = this.el;
			                NewGetTradeCollection.fetch({
			                    type: 'post',
			                    beforeSend:function(){
		                            beforeSend()
		                        },
			                    data:{'model': '{"tradetype":"' + tradetype + '","datetype":"'+datetype+'","page":"'+pagennum+'"}'},
			                    success:function(collection,xhr){
			                    	if(xhr.status!=0){
			            				$(el).html(template({data:collection.models,currentpage: collection.currentpage}));
				                    	addClass()
				                    	var add = $(el).find($(".addtime"))
		                                $.each(add, function(i, val) {
		                                    var addtime = $(this).html()
		                                    var format = formatTime(addtime,2)
		                                    $(this).html(format)
		                                });
		                                if(tradetype==1){
		                                	for(var i=0;i<xhr.data.list.length;i++){
		                                		if(xhr.data.list[i].status==0){
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待处理</a>")
		                                		}else if(xhr.data.list[i].status==1){
		                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
		                                		}else if(xhr.data.list[i].status==2){
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")
		                                		}else{
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
		                                		}
		                                	}
		                                }else if(tradetype==2){
		                                	for(var i=0;i<xhr.data.list.length;i++){
		                                		if(xhr.data.list[i].status==1){
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>已提交</a>")
		                                		}else if(xhr.data.list[i].status==2){
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待审核</a>")
		                                		}else if(xhr.data.list[i].status==3){
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>转出中</a>")
		                                		}else if(xhr.data.list[i].status==4){
		                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
		                                		}else if(xhr.data.list[i].status==5){
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")		
		                                		}else{
		                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
		                                		}
		                                	}
		                                }else if(tradetype==3){
		                                	for(var i=0;i<xhr.data.list.length;i++){
		                                		if(xhr.data.list[i].status==1){
		                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
		                                		}
		                                	}
		                                }else if(tradetype==4){
		                                	for(var i=0;i<xhr.data.list.length;i++){
		                                		if(xhr.data.list[i].status==1){
		                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
		                                		}
		                                	}
		                                }else{
		                                	for(var i=0;i<xhr.data.list.length;i++){
		                                		if(xhr.data.list[i].status==1){
		                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
		                                		}
		                                	}
		                                }
			                		}else{
			                			$(el).html("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
			                		}
			                	loaded()
			                    }
			            		
		            		})
	            		}
	            	},
	            	"click .next_page":function(event){
	            		loading()
            			pagennum++ 
            			var template = this.template;
		                var el = this.el;
		                NewGetTradeCollection.fetch({
		                    type: 'post',
		                    beforeSend:function(){
	                            beforeSend()
	                        },
		                    data:{'model': '{"tradetype":"' + tradetype + '","datetype":"'+datetype+'","page":"'+pagennum+'"}'},
		                    success:function(collection,xhr){
		                    	$(el).html(template({data:collection.models,currentpage: collection.currentpage}));
		                    	var add = $(el).find($(".addtime"))
                                $.each(add, function(i, val) {
                                    var addtime = $(this).html()
                                    var format = formatTime(addtime,2)
                                    $(this).html(format)
                                });
		                    	if(collection.shownextpage==0){
		                    		pagennum=collection.currentpage
		            				$(".next_page").hide()
		            				if(xhr.status==0){
		            					$(el).append("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
		                				$(".pageList").css("bottom","-162px")
		                			}
		                		}
		                		if(tradetype==1){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==0){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待处理</a>")
                                		}else if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}else if(xhr.data.list[i].status==2){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")
                                		}else{
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
                                		}
                                	}
                                }else if(tradetype==2){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>已提交</a>")
                                		}else if(xhr.data.list[i].status==2){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待审核</a>")
                                		}else if(xhr.data.list[i].status==3){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>转出中</a>")
                                		}else if(xhr.data.list[i].status==4){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}else if(xhr.data.list[i].status==5){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")		
                                		}else{
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
                                		}
                                	}
                                }else if(tradetype==3){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}
                                	}
                                }else if(tradetype==4){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}
                                	}
                                }else{
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}
                                	}
                                }
		                		loaded()
		                		addClass()

		                    }
		            		
	            		})
	            	},
	            	"click .last_page":function(event){
	            		loading()
	            		var obj=event.currentTarget;
	            		pagennum=$(obj).val()
	            		var template = this.template;
		                var el = this.el;
		                NewGetTradeCollection.fetch({
		                    type: 'post',
		                    beforeSend:function(){
	                            beforeSend()
	                        },
		                    data:{'model': '{"tradetype":"' + tradetype + '","datetype":"'+datetype+'","page":"-1"}'},
		                    success:function(collection,xhr){
		                    	if(xhr.status!=0){
		            				$(el).html(template({data:collection.models,currentpage: collection.currentpage}));
		            				$(".next_page").hide()
		            				var add = $(el).find($(".addtime"))
	                                $.each(add, function(i, val) {
	                                    var addtime = $(this).html()
	                                    var format = formatTime(addtime,2)
	                                    $(this).html(format)
	                                });
		            				addClass()
		            				if(tradetype==1){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==0){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待处理</a>")
	                                		}else if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}else if(xhr.data.list[i].status==2){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")
	                                		}else{
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
	                                		}
	                                	}
	                                }else if(tradetype==2){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>已提交</a>")
	                                		}else if(xhr.data.list[i].status==2){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待审核</a>")
	                                		}else if(xhr.data.list[i].status==3){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>转出中</a>")
	                                		}else if(xhr.data.list[i].status==4){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}else if(xhr.data.list[i].status==5){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")		
	                                		}else{
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
	                                		}
	                                	}
	                                }else if(tradetype==3){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }else if(tradetype==4){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }else{
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }
		                		}else{
		                			$(el).html("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
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
		                    data:{'model': '{"tradetype":"' + tradetype + '","datetype":"'+datetype+'","page":"'+pagennum+'"}'},
		                    success:function(collection,xhr){
		                    	if(xhr.status!=0){
		                    		$(el).html(template({data:collection.models,currentpage: collection.currentpage}));
		                    		if(collection.shownextpage==0){
		                    			$(".next_page").hide()
		                    		}
		            				addClass()
		            				var add = $(el).find($(".addtime"))
	                                $.each(add, function(i, val) {
	                                    var addtime = $(this).html()
	                                    var format = formatTime(addtime,2)
	                                    $(this).html(format)
	                                });
	                                if(tradetype==1){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==0){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待处理</a>")
	                                		}else if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}else if(xhr.data.list[i].status==2){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")
	                                		}else{
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
	                                		}
	                                	}
	                                }else if(tradetype==2){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>已提交</a>")
	                                		}else if(xhr.data.list[i].status==2){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待审核</a>")
	                                		}else if(xhr.data.list[i].status==3){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>转出中</a>")
	                                		}else if(xhr.data.list[i].status==4){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}else if(xhr.data.list[i].status==5){
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")		
	                                		}else{
	                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
	                                		}
	                                	}
	                                }else if(tradetype==3){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }else if(tradetype==4){
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }else{
	                                	for(var i=0;i<xhr.data.list.length;i++){
	                                		if(xhr.data.list[i].status==1){
	                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
	                                		}
	                                	}
	                                }
		                		
		                		}else{
		                			$(el).html("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
		                		}

		                		loaded()
		                    }
		            		
	            		})
	            	},
	            	"click .xiangqin":function(event){
	            		var obj=event.currentTarget;
	            		var Getdetail = Backbone.Model.extend()
	            		var NewGetdetail = new Getdetail({
	            			tradetype:tradetype,
	            			id:$(obj).attr("data-id")
	            		})
	            		NewGetdetail.save(null,{
	            			type:"POST",
	            			beforeSend:function(){
	                            beforeSend()
	                        },
	            			url:RootUrl+"/?d=api&c=account&m=gettradedetail",
	            			error:function(model,xhr){
	            				console.log("获取交易详情失败")
	            			},
	            			success:function(model,xhr){
	            				$(".mask").show();
	            				$(".detailPob").show();
	            				$("#name").html(xhr.data.info.truename)
	            				$(".orderno").html(xhr.data.info.orderno)
	            				$(".completetime").html(formatTime(xhr.data.info.addtime,2))
								$(".tradetype").html($(obj).attr("data-tradetype"))
								$("#accountNumber").html(xhr.data.info.username)
								$(".tradestatus").html($(".statusType").find("a").html())
								$("#amount").html(xhr.data.info.amount)
								if(xhr.data.info.type==1){
									$(".fangxiang").html("转入")
								}else{
									$(".fangxiang").html("转出")
								}
								if($("#name").html()==""){
									$("#name").siblings(".copy").hide()
								}
							
								if($("#amount").html()==""){
									$("#amount").siblings(".copy").hide()
								}
								if($("#fuyan").html()==""){
									$("#fuyan").siblings(".copy").hide()
								}
								var clipboard = new Clipboard('.copy');
							    clipboard.on('success', function(e) {
							        $(".fuzhitips").show().html("内容已复制到剪切板")
							        setTimeout(function(){
							        	$(".fuzhitips").hide()
							        },2000)
							    });
							    clipboard.on('error', function(e) {
							        console.log(e)
							    });
		            			
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
	                	data:{'model': '{"tradetype":"' + tradetype + '","datetype":"'+datetype+'","page":"'+pagennum+'"}'},
	                	
	                	error:function(collection,xhr){
	                		console.log("获取交易记录失败")
	                	},
	                	success:function(collection,xhr){	
	                		if(xhr.status!=0){
		                		$(el).html(template({data:collection.models,currentpage: collection.currentpage}));
		                		addClass()
		                		var add = $(el).find($(".addtime"))
                                $.each(add, function(i, val) {
                                    var addtime = $(this).html()
                                    var format = formatTime(addtime,2)
                                    $(this).html(format)
                                });
                                if(tradetype==1){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==0){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待处理</a>")
                                		}else if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}else if(xhr.data.list[i].status==2){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")
                                		}else{
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
                                		}
                                	}
                                }else if(tradetype==2){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>已提交</a>")
                                		}else if(xhr.data.list[i].status==2){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>待审核</a>")
                                		}else if(xhr.data.list[i].status==3){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>转出中</a>")
                                		}else if(xhr.data.list[i].status==4){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}else if(xhr.data.list[i].status==5){
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>掉单</a>")		
                                		}else{
                                			$(el).find(".statusType").eq(i).html("<a class='wait'>失败</a>")
                                		}
                                	}
                                }else if(tradetype==3){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}
                                	}
                                }else if(tradetype==4){
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}
                                	}
                                }else{
                                	for(var i=0;i<xhr.data.list.length;i++){
                                		if(xhr.data.list[i].status==1){
                                			$(el).find(".statusType").eq(i).html("<a class='chegong'>成功</a>")
                                		}
                                	}
                                }
		                		if(collection.shownextpage==0){
		                			$(".pageList").hide()
		                		}
	                		}else{
	                			$(el).html("<tr class='nodata'><td>"+xhr.data.msg+"</td></tr>")
	                		}
	                		$(".pageList").find("td").unbind("click")
	                		loaded()
	                	}
	                })
	            }

	    })
	    var NewGetTradeView =new GetTradeView;
	    NewGetTradeView.remove;
	    function addClass(){
			$(".list").find("tr:even").addClass("even")
			$(".list").find("tr:odd").addClass("odd")
	    }
	}
	var timeout = null;
	var timer = null;
	var i =0
	auto()
	clearInterval(timer)
	timer = setInterval(function(){
		auto()
	},8000)
	function auto(){
		$(".tutorial").animate({
			left:-332,
		},1000,function(){
			i=2
			$("ol li").eq(1).addClass("activeli").siblings().removeClass("activeli")
		})
		clearTimeout(timeout)
		timeout = setTimeout(function(){
			$(".tutorial").animate({
				left:0
			},1000,function(){
				i=1
				$("ol li").eq(0).addClass("activeli").siblings().removeClass("activeli")
			})
		},4000)
	}
	$(".twoBtn").on("mouseover",function(){
		clearInterval(timer)
		clearTimeout(timeout)
	})
	$(".twoBtn").on("mouseout",function(){
		clearTimeout(timeout)
		auto()
	})
	$(".oneBtn").on("mouseover",function(){
		clearInterval(timer)
		clearTimeout(timeout)
	})
	$(".oneBtn").on("mouseout",function(){
		clearInterval(timer)
		auto()
	})
	$(".twoBtn").on("click",function(){
		$(".tutorial").animate({
			left:-332
		},1000)
		$(this).addClass("activeli").siblings().removeClass("activeli")
	})
	$(".oneBtn").on("click",function(){
		$(".tutorial").animate({
			left:0
		},1000)
		$(this).addClass("activeli").siblings().removeClass("activeli")
	})
	$(".close").on("click",function(){
		$(".mask").hide();
		$(".pob").hide();
	})	
	$(".tutorial").on("mouseover",function(){
		clearInterval(timer)
		clearTimeout(timeout)
	})
	$(".tutorial").on("mouseout",function(){
		clearInterval(timer)
		auto()
	})
});

