$(function(){
    $(".main_l4").addClass("active")
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
            console.log(cities)
            console.log(cities.length)
            for(var i = 0; i < cities.length; i++) {
                cityHtml += '<option data-cityID="'+cities[i].id+'"  value="' + i + '"' + ((hasDefaultCity && cities[i].name == defaultCity) ? ' selected="selected"' : '') + '>' + cities[i].name + '</option>';
            }
            cityEl.html(cityHtml);
        } else {
            cityEl.html('<option value="-1">请先选择</option>');
        }
    };
    $.initProv("#pro", "#city", "北京市", "市辖区");
    $(".saveAddr").on("click",function(){
        var provinceid = $("#pro").find("option:selected").attr("data-provinceID");
        var cityid = $("#city").find("option:selected").attr("data-cityID");
        var address = $("#address").val();
        if(provinceid==undefined){
            $(".addrerror").html("请选择省份")
            return false;
        }else if(cityid==undefined){
            $(".addrerror").html("请选择城市")
            return false; 
        }else if(address==""){
            $(".addrerror").html("请填写详细地址")
        }else{
            var saveAddr = Backbone.Model.extend();
            var NewSaveAddr = new saveAddr({
                country:1,
                provinceid:provinceid,
                cityid:cityid,
                address:address
            });
            NewSaveAddr.save(null,{
                beforeSend:function(){
                    beforeSend()
                },
                url:RootUrl+"/?d=api&c=user&m=setuseraddress",
                error:function(model,xhr){
                    console.log("保存地址失败")
                },
                success:function(model,xhr){

                    $(".addrpob").find("dd").html(xhr.data.msg)
                    $(".addrpob").show();
                    $(".mask").show();
                    $(".addrpob").find("dt").removeClass("failed")
                    if(xhr.status==0){
                        $(".addrpob").find("dt").addClass("failed")
                    }
                }
            })
        }

       
    })
    $(".sure").on("click",function(){
        $(".mask").hide();
        $(".addrpob").hide();
        $(".addCardPob").find("input").val("")
        $(".bankaddr").val("")
        reload();
    })

    var GetAddr = Backbone.Model.extend();
    var NewGetAddr = new GetAddr;
    NewGetAddr.fetch({
        beforeSend:function(){
            beforeSend()
        },
        url:RootUrl+"/?d=api&c=user&m=getuseraddress",
        error:function(model,xhr){
            console.log("获取用户地址失败")
        },
        success:function(model,xhr){
            if(xhr.data.info.provinceid!=0){
                $("select").disabled=true;
                $("textarea").disabled=true;
                $("select").css({"background":"#f1f1f1","-webkit-appearance":"none"})
                var province = $("#pro").find("option[data-provinceID="+xhr.data.info.provinceid+"]").text()
                $("#pro:selected").val(province) 
                $("#pro").attr("disabled",true)
                var city = $("#city").find("option[data-cityID="+xhr.data.info.cityid+"]").text()
                $("#city:selected").val(city)
                $("#city").attr("disabled",true)
                $("#address").val(xhr.data.info.address).css({"background":"#f1f1f1","-webkit-appearance":"none"}).attr("disabled",true);
                $(".saveAddr").hide()
            }
        }
    })
    
    var GetBankCard = Backbone.Model.extend()
    var GetBankCardCollection = Backbone.Collection.extend({
        model: GetBankCard,
        parse: function (resp, xhr) {
            return resp.data.list;
        }
    })
    var NewGetBankCardCollection = new GetBankCardCollection;
    var GetBankCardView = Backbone.View.extend({
        el: $(".bankList"),
        template: _.template($('#getBank').html()),
        events: {
            "click .bank_card":function(event){
                var obj=event.currentTarget;
                $(obj).addClass("active").siblings().removeClass("active")
            }
            
        },
        initialize: function () {
            var template = this.template;
            var el = this.el;
            var render = this.render();
            NewGetBankCardCollection.fetch({
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
                    }else if(xhr.status==0){
                        $(el).html("<li class='nodata'>没有绑定银行卡</li>")
                    }
                }
            })
        }    
    });
    $(".addCard").on("click",function(){
        if($(".bankList").find("li").length>5||$(".bankList").find("li").length==5){
            $(".Carderr").html("每人最多只能绑定5张银行卡")
        }else{
            $(".addCardPob").show();
            $(".mask").show();
        }
    })

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
                }
            })
        }    
    })
    var NewGetBankView = new GetBankListView
// 绑定银行卡
    $.initProv("#bankpro", "#bankcity", "北京市", "市辖区");
    var NewGetBankCardView = new GetBankCardView;
    $("#cardNum").keydown(function(){
        formatAcc(this) 
    })
    $("#cardNum").keyup(function(){
        $(this).attr("data-num",Trim($("#cardNum").val(),"g"))
    })
    $("input").blur(function(){
        $(".err").html("")
    })
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
        }else if(!isChineseChar($("#payeeName").val())){
            $(".name_err").html("请输入汉字")
        }else if(cardnum==""){
            $(".cardnum_err").html("请输入银行卡号")
        }else if(bankcityid==undefined){
            $(".liandong").find("err").html("请选择城市")
        }else if(bankproid==undefined){
            $$(".liandong").find("err").html("请选择省份")
        }else if(bankaddr==""){
            $(".Bankserr").html("请填写开户行")
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
                    $(".mask").show();
                    $(".addCardPob").hide();
                    $(".addrpob").show();
                    $(".addrpob").find("dd").html(xhr.data.msg)
                    $(".addrpob").find("dt").removeClass("failed")    
                    if(xhr.status==0){
                        $(".addrpob").find("dt").addClass("failed")    
                    }else{
                        reload() 
                    }
                    $(".err").html("")
                    $(".addCardPob").find("input").val("");
                    $("#bankaddr").val("")
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
})    