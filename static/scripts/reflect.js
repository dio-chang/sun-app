$(function(){ 
	$(".tikuanNav").addClass("active") 
	$(".shuaxin").find("img").click(function(){
		$(this).addClass("zhuan")
		setTimeout(function(){
			$(".shuaxin").find("img").removeClass('zhuan')
		},3000)
	})
	var cardid ;
	
	var miao = 59
	var time = 2
    
	var timer = setInterval(function(){
		miao--
		if(miao<10){
			miao="0"+miao
		}
		if(miao=="00"){	
			if(time==0){
				clearInterval(timer)
				$(".auditbox").hide()
				$(".successbox").show()
			}else{
				miao=59
				time--
			}
		}
		$(".shi").html(time)
		$(".fen").html(miao)
	},1000)
 	$.initProv = function(prov, city, defaultProv, defaultCity) {
        var provEl = $(prov);
        var cityEl = $(city);  
        var hasDefaultProv = (typeof(defaultCity) != 'undefined');
         
        var provHtml = '';
         
        provHtml += '<option value="-1">请选择</option>';
        for(var i = 0; i < province.length; i++) {
            provHtml += '<option data-provinceID="'+province[i].id+'" value="' + province[i].id + '"' + ((hasDefaultProv && province[i].name == defaultProv) ? ' selected="selected"' : '') + '>' + province[i].name + '</option>';
        }
        provEl.html(provHtml);
        $.initCities(provEl, cityEl, defaultCity);
        provEl.change(function() {
            $.initCities(provEl, cityEl);
        });
    };

    $.initCities = function(provEl, cityEl, defaultCity) {
        var hasDefaultCity = (typeof(defaultCity) != 'undefined');
        if(provEl.val() != '' && parseInt(provEl.val()) >= 0) {
            var cities = city[parseInt(provEl.val())];
            var cityHtml = '';
            cityHtml += '<option value="-1">请选择</option>';
            for(var i = 0; i < cities.length; i++) {
                cityHtml += '<option data-cityID="'+cities[i].id+'"  value="' + i + '"' + ((hasDefaultCity && cities[i].name == defaultCity) ? ' selected="selected"' : '') + '>' + cities[i].name + '</option>';
            }
            cityEl.html(cityHtml);
        } else {
            cityEl.html('<option value="-1">请先选择</option>');
        }
    };
    loading()
	var GetBankList = Backbone.Model.extend();
    var GetBankListCollection = Backbone.Collection.extend({
        model:GetBankList,
        parse: function (resp, xhr) {
            return resp.data.list;
        }
    });
    var NewGetBankListCollection = new GetBankListCollection;
    var GetBankListView = Backbone.View.extend({
        el: $("#cardList"),
        template: _.template($('#cardListtpl').html()),
        events: {
            'click .card':function(event){
            	var obj=event.currentTarget;
                $(obj).addClass("activeCard").siblings().removeClass("activeCard")
            }
        },
        initialize: function () {
            var template = this.template;
            var el = this.el;
            var render = this.render();
            NewGetBankListCollection.fetch({
            	beforeSend:function(){
            		beforeSend()
            	},
                url:RootUrl+"/?d=api&c=bank&m=getcardlist",
                error:function(collection,xhr){
                    console.log("获取银行卡失败")
                },
                success:function(collection,xhr){  
                	if(xhr.status==1){
                    	$(el).html(template({data:collection.models}));
                    }else{
                    	$(el).html(xhr.data.msg)
                    	$(el).css({"height":"46px","line-height":"46px","color":"#f00"})
                    }
                }
            })
        }    
    })
    var NewGetBankView = new GetBankListView;
    NewGetBankView.remove;

    var GetBankList = Backbone.Model.extend();
    var GetBankListCollection = Backbone.Collection.extend({
        model:GetBankList,
        parse: function (resp, xhr) {
            return resp.data.data;
        }
    });
    var NewGetBankListCollection = new GetBankListCollection;
    var GetBankListView = Backbone.View.extend({
        el: $("#bank_name"),
        template: _.template($('#banklist').html()),
        events: {
            
        },
        initialize: function () {
            var template = this.template;
            var el = this.el;
            var render = this.render();
            NewGetBankListCollection.fetch({
            	beforeSend:function(){
            		beforeSend()
            	},
                url:RootUrl+"?d=api&c=bank&m=getbanklist",
                error:function(collection,xhr){
                    console.log("获取银行卡失败")
                },
                success:function(collection,xhr){  
                    $(el).html(template({data:collection.models}));
                    loaded()
                }
            })
        }    
    })
    var NewGetBankView = new GetBankListView;
    NewGetBankView.remove;
    var reflect = false
    $(".submitbooking").click(function(){
    	var checkPassword = Backbone.Model.extend()
    	var NewcheckPassword = new checkPassword;
    	NewcheckPassword.fetch({
    		url:RootUrl+"/?d=api&c=user&m=checksecuritycode",
    		error:function(){
    			console.log("验证是否设置资金密码失败")
    		},
    		success:function(model,xhr){	
    			if(xhr.status==1){
    				var blance = parseFloat($(".blance").html())
			    	$(".error").html("")
			    	$(".carderror").html("")
		    		if($("#amount").val()==""){
		    			$(".amount").find(".error").html("请输入提现金额")
		    		}else if(!$(".card").hasClass("activeCard")){
		    			$(".carderror").html("请选择要提现的银行卡")
		    		}else if($("#fundspwd").val()==""){
		    			$(".fundsPassword").find(".error").html("请输入资金密码")
		    		}else{
		    			$(".submitbooking").removeClass("submitbooking").addClass("wait").val("正在提款")
		    			if(blance>100||blance==100){
		    				if(reflect==false){
		    					doRelect()
		    					reflect=false
		    				}else{
		    					return false;
		    				}
		    				function doRelect(){
		    					var tixinaModel = Backbone.Model.extend();
								var NewtixianModel = new tixinaModel({
									amount:$("#amount").val(),
									cardid:$(".activeCard").attr("data-id"),
									scode:$("#fundspwd").val()
								});
								NewtixianModel.save(null,{
									beforeSend:function(){
					            		beforeSend()
					            	},
									url:RootUrl+"/?d=api&c=withdraw&m=doapply",
									error:function(){
										console.log("提现申请失败，请重试")
									},
									success:function(model,xhr){
										reflect=true;
										$(".wait").removeClass("wait").addClass("submitbooking")
										$(".mask").show()
										$(".success").show()
										$(".success").find("dd").html(xhr.data.msg)
										$(".success").find("a").addClass("tixianbtn")
										if(xhr.status!=1){
											$(".success").find("dt").addClass("failed")
										}else{
											$(".success").find("dt").removeClass("failed")
										}
										$(".progressBar").addClass("oneStep")
										clearVal()
										$(".submitbooking").val("确定")

									}
								})
		    				}
			    			
						}else{
							$(".bankBox").hide()
							$(".failure").show()
						}
		    		}
    			}else{
    				$(".fundsPassword").html(xhr.data.msg)
    			}
    		}
    	})
    	
    })
    $(".tixianbtn").on("click",function(){
    	reload()
    })
    $(".close").on("click",function(){
		reload()
    })
	$(".transferpob").find(".close").on("click",function(){
		$(".transferpob").hide();
		$(".mask").hide();
	})
	$(".addCard").on("click",function(){
		if($("#cardList").find(".card").length>5||$("#cardList").find(".card").length==5){
			$(".carderror").show().html("每人最多只能绑定5张银行卡")
		}else{
			$(".mask").show()
			$(".addCardPob").show()
		}
		$.initProv("#bankpro", "#bankcity", "北京市", "市辖区");
	    $("#cardNum").keydown(function(){
	        formatAcc(this) 
	    })
	    $("#cardNum").keyup(function(){
	        $(this).attr("data-num",Trim($("#cardNum").val(),"g"))
	    })
	    $(".goadd").unbind("click")
	    $(".goadd").on("click",function(){
	        var bankid = $("#bank_name").find("option:selected").attr("data-bankid");
	        var bankproid = $("#bankpro").find("option:selected").attr("data-provinceID");
	        var bankcityid = $("#bankcity").find("option:selected").attr("data-cityID");
	        var bankaddr = $("#bankaddr").val();
	        var cardnum = $("#cardNum").attr("data-num"); 
	        function isChineseChar(str){     
	           var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;  
	           return reg.test(str);  
	        } 
	        if($("#bankNickname").val()==""){
	            $(".nicknameerr").html("请输入银行卡昵称")
	        }else if($("#payeeName").val()==""){
	            $(".name_err").html("请输入持卡人姓名")
	        }else if(cardnum==""){
	            $(".cardnum_err").html("请输入银行卡号")
	        }else if(bankproid==undefined){
	            $(".proCityerr").html("请选择省份")
	            return false;
	        }else if(bankcityid==undefined){
	            $(".proCityerr").html("请选择城市")
	            return false; 
	        }else if(bankaddr==""){
	            $(".Bankserr").html("请填写开户行")
	        }else if(!isChineseChar($("#payeeName").val())){
	            $(".name_err").html("请输入汉字")
	        }else{
	            var goAdd = Backbone.Model.extend();
	            var NewGoadd = new goAdd({
	                nickname:$("#bankNickname").val(),
	                bankid:bankid,
	                truename:$("#payeeName").val(),
	                cardnum:cardnum,
	                provinceid:bankproid,
	                cityid:bankcityid,
	                branch:bankaddr
	            });
	            NewGoadd.save(null,{ 
	                type:"POST",
	                beforeSend:function(){
	            		beforeSend()
	            	},
	                url:RootUrl+"?d=api&c=bank&m=bind",
	                error:function(model,xhr){
	                    console.log("绑定银行卡失败")
	                },
	                success:function(model,xhr){
	                	if(xhr.status!=1){
	                		$(".addrpob").find("dt").addClass("failed")
	                	}else{
	                		reload()
	                	}
	                    $(".mask").show();
	                    $(".addCardPob").hide();
	                    $(".addrpob").show();
	                    $(".addrpob").find("dd").html(xhr.data.msg)
	                    $(".err").html("")
	                    $(".addCardPob").find("input").val("");
	                    $("#bankaddr").val("")
	                    clearVal()
	                }
	            })
	        }   

	    })
	    $(".addCardPob").find(".close").on("click",function(){
	        $(".addCardPob").hide();
	        $(".mask").hide();
	    })
	    $(".addrpob").find(".close").on("click",function(){
	    	$(".addrpob").hide();
	    	$(".mask").hide();
	    })
	    $(".sure").on("click",function(){
	    	$(".addrpob").hide();
	    	$(".mask").hide();
	    	$(".addCardPob").find("input").val("")
        	$(".bankaddr").val("")
        	$(".error").html("")
	    })
	})
	$(".depositbtn").on("click",function(){
		window.location.href=views+"recharge.html"
	})
	
})