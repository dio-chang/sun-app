$(function(){

	$(".rechargeNav").addClass("active")
    loading()
	var BankModel = Backbone.Model.extend()
    var BankCollection = Backbone.Collection.extend({
        model: BankModel,
        parse: function (resp, xhr) {
            return resp.data.defaultbanks;
        }
    });
    var NewBankCollection = new BankCollection;
    var BankView = Backbone.View.extend({
            el: $("#bank_list"),
            template: _.template($('#bank').html()),
            events: {
                "click .bankCard":function(event){
                	var obj = event.currentTarget;
                	$(obj).addClass("activeCard").siblings().removeClass("activeCard")
                    if($("#amount").val()!=0||$.trim($("#amount").val())!=""){
                        $(".progressBar").addClass("twoStep") 
                    }else{
                        $(".progressBar").removeClass("twoStep") 
                    }
                    
                }
            },
            initialize: function () {
                var template = this.template;
                var el = this.el;
                var render = this.render();
                NewBankCollection.fetch({
                    beforeSend:function(){
                        beforeSend()
                    },
                    url: RootUrl+"/?d=api&c=channel&m=getenablechannel",
                    error:function(collection,xhr){
                        console.log("请求充值渠道失败")
                    },
                    success: function (collection, xhr) {
                       console.log(xhr.data.msg)

                       $(el).html(template({data:collection.models}));
                       loaded()
                    },
                    silent: true,
                });
            } 
    })
    var dataName ;
    var NewBankView = new BankView;

    var QudaoModel = Backbone.Model.extend()
    var QudaoCollection = Backbone.Collection.extend({
        model: QudaoModel,
        parse: function (resp, xhr) {
            return resp.data.channellist;
        }
    });
    var NewQudaoCollection = new QudaoCollection;
    var QudaoView = Backbone.View.extend({
            el: $(".paymentNav"),
            template: _.template($('#qudao').html()),
            events: {
                "click .qudao":function(event){
                	var obj = event.currentTarget;
                    data_Name=$(obj).attr("data-name")
                    $("#dataName").val(data_Name)
                	$(obj).addClass("activechanle").siblings().removeClass("activechanle")
                    var min_money =parseInt($(obj).attr("data-min_money"))
                    var max_money =parseInt($(obj).attr("data-max_money"))
                    $(".max_minmoney").find(".max_money").html(max_money)
                    $(".max_minmoney").find(".min_money").html(min_money)
                	var cid = $(obj).attr("data-cid")
                	var Getbank = Backbone.Model.extend()
                	var GetBankCollection = Backbone.Collection.extend({
                		model: Getbank,
				        parse: function (resp, xhr) {
				            return resp.data.data;
				        }
                	})
                	var NewGetBankCollection = new GetBankCollection();
				    var GetbankView = Backbone.View.extend({
				            el: $("#bank_list"),
				            template: _.template($('#Getbank').html()),
				            events: {
				                "click .bankCard":function(event){
				                	var obj = event.currentTarget;
				                	$(obj).addClass("activeCard").siblings().removeClass("activeCard")
				                }
				            },
				            initialize: function () {
				                var template = this.template;
				                var el = this.el;
				                var render = this.render();
				                NewGetBankCollection.fetch({
				                	data: {'model': '{"cid":"'+cid+'"}'},
				                	type:"POST",
                                    beforeSend:function(){
                                        beforeSend()
                                    },
				                    url: RootUrl+"/?d=api&c=channel&m=getchannelbanks",
				                    error:function(collection,xhr){
				                        console.log("请求充值渠道失败")
				                    },
				                    success: function (collection, xhr) {
				                       if(xhr.status==1){
				                       	console.log("请求成功")
				                       }
				                       $(el).html(template({data:collection.models}));
                                    },
				                    silent: true,
				                });
				            } 
				    })
				    var NewGetbankView = new GetbankView;
                },

            },
            initialize: function () {
                var template = this.template;
                var el = this.el;
                var render = this.render();
                NewQudaoCollection.fetch({
                    beforeSend:function(){
                        beforeSend()
                    },
                    url: RootUrl+"/?d=api&c=channel&m=getenablechannel",
                    error:function(collection,xhr){
                        console.log("请求充值渠道失败")
                    },
                    success: function (collection, xhr) {
                       $(el).html(template({data:collection.models}));
                       var dataName = $(".activechanle").attr("data-name")
                       $("#dataName").val(dataName)
                       var min_money = parseInt($(".activechanle").attr("data-min_money"))
                       var max_money = parseInt($(".activechanle").attr("data-max_money"))
                       $(".max_minmoney").find(".max_money").html(max_money)
                       $(".max_minmoney").find(".min_money").html(min_money)
                    },
                    silent: true,
                });
            } 
    })
    var NewQudaoView = new QudaoView;
    var number = /^[1-9]\d*$/;
	$(".submit").on("click",function(){
        var dataname = $("#dataName").val()
        if(isNaN($("#amount").val())){
            $(".amouterr").html("请输入数字")
        }else if(!number.test($("#amount").val())){
             $(".amouterr").html("取款金额只能为整数")
        }else if($("#amount").val()==""){
            $(".amouterr").html("请输入充值金额")
        }else if($("#amount").val()<parseInt($(".activechanle").attr("data-min_money"))){
            $(".amouterr").html("输入金额低于最小充值金额")
        }else if($("#amount").val()>parseInt($(".activechanle").attr("data-max_money"))){
            $(".amouterr").html("输入金额高于最大充值金额")
        }else if(!$(".bankCard").hasClass("activeCard")){
            $(".amouterr").html("请选择支付方式")
        }else{
            loading()
            var recharge = Backbone.Model.extend();
            var NewRecharge = new recharge({
                cid:$(".activechanle").attr("data-cid"),
                amount:$("#amount").val(),
                bankcode:$(".activeCard").attr("data-bankcode")
            });
            NewRecharge.save(null,{
                beforeSend:function(){
                    beforeSend()
                },
                url:RootUrl+"/"+dataname+"/index",
                error:function(model,xhr){
                    console.log("充值失败")
                },
                success:function(model,xhr){
                    if(xhr.data.flag==1){
                        window.document.write(xhr.data.data)                       
                    }else{
                         BootstrapDialog.alert({
                            message: "<img src="+xhr.data.qr_url+" />",
                            title: '扫描二维码支付',
                            type: BootstrapDialog.TYPE_WARNING
                        });
                        loaded()
                    }
                }
            })
        }
    })
})
$("#amount").keyup(function(){
    if($(this).val()!=0||$.trim($(this).val())!=""){
        $(".progressBar").addClass("oneStep")
        var timer
        caozuo()
        clearInterval(timer)
        timer = setInterval(function(){
            caozuo()
        },5100)
        function caozuo(){
            $(".caozuo_bg").animate({
                width:"90px"
            },5000,function(){
                $(".computer").find(".comL").addClass("caozuocoml")
                $(".computer").find(".comr").addClass("caozuocomr")
                $(this).animate({
                    width:"0px"
                },100,function(){
                    $(".computer").find(".comL").removeClass("caozuocoml")
                    $(".computer").find(".comr").removeClass("caozuocomr")
                }) 
            })
        }    
    }else{
        $(".bankCard").removeClass("activeCard")
        $(".progressBar").removeClass("oneStep")
        $(".progressBar").removeClass("twoStep")
        $(".progressBar").removeClass("threeStep")
    }
})

$(".blueafb").animate({
	width:"90px"
},20000)
