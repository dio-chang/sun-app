$(function(){
    beforeSend()
    var percentage = 0
	var bindcardModel = Backbone.Model.extend();
	var NewBindcard = new bindcardModel;
	NewBindcard.fetch({
        beforeSend:function(){
            beforeSend()
        },
		url:RootUrl+"/?d=api&c=bank&m=getcardlist",
		error:function(model,xhr){
			console.log("获取用户银行卡失败")
		},
		success:function(model,xhr){
			if(xhr.status==1){
				$(".bindcard").addClass("isbind")
                percentage+=25
                yuan()
			}else{
                percentage=0
                yuan()
            }
		} 
	})
	var bindNameModel = Backbone.Model.extend();
	var NewBindName = new bindNameModel; 
 	NewBindName.fetch({
        beforeSend:function(){
            beforeSend()
        },
 		url:RootUrl+"/?d=api&c=user&m=getuserprofile",
 		error:function(model,xhr){
 			console.log("获取用户信息失败")
           
 		},
 		success:function(model,xhr){
 			if(xhr.data.user.name!=""){
 				$(".zhanghao").addClass("isbind")
                 percentage+=25
                 yuan()
 			}else{
                percentage+=0
                yuan()

            }
 			if(xhr.data.user.mobile!=""){
 				$(".bindphone").addClass("isbind")
                 percentage+=25
                 yuan()
 			}else{
                percentage+=0
                yuan()

            }
 			if(xhr.data.user.email!=""){
 				$(".bindemail ").addClass("isbind")
                 percentage+=25
                 yuan()
 			}else{
                percentage+=0
                yuan()

            }
 		}
 	})
   
    function yuan(){
        var loader = $('.loader').ClassyLoader({
            width:110,
            height:110,
            fontSize:"0px",
            diameter:50,
            animate: true,
            start: "top",
            percentage: percentage,
            remainingLineColor:"#e6f0fb",
            lineColor:"#98c2f3",
            lineWidth:"5",
            fontColor:"#98c2f3"
        }); 
        if(percentage==0){
            // $('.loader').css({"border-radius":"50%","border":"5px solid #d1dae4","width":"104px","height":"104px"})
            $(".safeTips").find("span").html("很低").css("color","#f00")
        }else{
            if(percentage==25){
                $(".safeTips").find("span").html("低").css("color","#f00") 
            }else if(percentage==50){
                $(".safeTips").find("span").html("还不错").css("color","#08f") 
            }else if(percentage==75){
                $(".safeTips").find("span").html("高").css("color","#08f") 
            }else if(percentage==100){
                $(".safeTips").find("span").html("很安全").css("color","#08f") 
            }
            var num = 0 
            var perTimer = setInterval(function(){
                num++
                if(num==percentage){
                    clearTimeout(perTimer)
                    num==percentage
                }
                $(".percent").find("span").html(num) 
            },10)
        }         
	}
    $(".userName").html(getCookie("username"))
    
})
//获取中心钱包余额

getBlance()
function getBlance(){
    var blanceModel = Backbone.Model.extend()
    var newBlance = new blanceModel()
    newBlance.fetch({
        beforeSend:function(){
            beforeSend()
        },
        url: RootUrl+"/?d=api&c=user&m=getuserfund",
        error:function (model, xhr){
            console.log("获取余额失败")
        },
        success:function (model, xhr){
            if(xhr.status==1){
                $(".blance").html(xhr.data.userfund.available)
                // $(".shuaxin").find("img").removeClass('zhuan')
                $("#getuserfund").val(xhr.data.userfund.available)
                $(".centermoney").find("h4").html(xhr.data.userfund.available)
                setCookie("blance",xhr.data.userfund.available,30)
                // setCookie("hold",xhr.data.userfund.hold,30)
                // $(".cenbg").attr("pname",parseFloat(xhr.data.userfund.balance))
                // $(".lockbg").attr("pname",parseFloat(xhr.data.userfund.hold))
            }else{
                $(".blance").html("....")
                $(".centermoney").find("h4").html("获取中..").css({"font-size":"18px"})
            }
        }
    })
}
//获取平台余额
function getBalance(id,className){ 

    var GetBalanceModel = Backbone.Model.extend()
    var NewGetbalanceModel = new GetBalanceModel({
        pid:id
    });
    NewGetbalanceModel.save(null,{
        beforeSend:function(){
            beforeSend()
        },
        url:RootUrl+"/?d=api&c=game&m=getbalance",
        error:function(){
            console.log("获取平台"+id+"失败")
        },
        success:function(model,xhr){
            if(xhr.status==1){
                $(className).find("h4").html(xhr.data.availablebalance)
                // $(className).attr("pname",xhr.data.availablebalance)
            }else{
                $(className).find("h4").html("获取失败..").css({"font-size":"18px"})
                // $(className).attr("pname","获取失败..")
            }
        }
    })
}
//获取平台id
function GetPid(className,template){
    loading()
    var pid = 0;
    var getplatBlanceModel = Backbone.Model.extend();
    var getplatBlanceCollection = Backbone.Collection.extend({
        model: getplatBlanceModel,
        parse: function (resp, xhr) {
            return resp.data.list;
        }
    })
    var NewgetplatBlanceCollection = new getplatBlanceCollection;
    var getplatBlanceView = Backbone.View.extend({
            el: $(className),
            template: _.template($(template).html()),
            events: {
            
            },
            initialize: function () {
                var template = this.template;
                var el = this.el;
                var render = this.render();
                NewgetplatBlanceCollection.fetch({
                    url:RootUrl+"/?d=api&c=platform&m=getplatformlist&platform=balance",
                    error:function(collection,xhr){
                        console.log("获取平台数据失败")
                    },
                    success:function(collection,xhr){   
                        $(el).html(template({data:collection.models}));
                        for(var i=0;i<$(".pName").length;i++){
                            var pid = $(".pName").eq(i).attr("data-id")
                            getBalance(pid,$(".pName").eq(i))
                            
                        }
                        $(el).find("li").last().css("background","none")
                        getBlance()
                        loaded()
                    }
                })
            }    
    });
    var NewgetplatBlanceView = new getplatBlanceView;
    
}
$(".shuaxin").on("click",function(){
    $(this).find("img").addClass("zhuan")
    getBlance()
    setTimeout(function(){
        $(".shuaxin").find("img").removeClass("zhuan")    
    },1000)
})

if(!getCookie("ci_session")){
    goHome()
}

// GetPid(".pinttaiList",".pintaiBg")  
// function getFunds(){
//     getBalance("9",".ptbg")
//     getBalance("18",".agbg")
//     getBalance("20",".xinbg")
//     getBalance("21",".pngbg")
//     getBalance("22",".mgbg")
//     getBalance("23",".bbinbg")
//     getBalance("29",".sporbg")
    
// }
// getFunds()
// function shuzi(class_name){
//     if(!isNaN($("."+class_name).attr("pname"))){
//         $("."+class_name).attr("pname",0)
//     }else{
//         $("."+class_name).attr("pname",parseFloat($("."+class_name).attr("pname")))
//     }
// }
// shuzi("ptbg")
// shuzi("agbg")
// shuzi("xinbg")
// shuzi("pngbg")
// shuzi("mgbg")
// shuzi("bbinbg")
// shuzi("sporbg")

// $(".prograss").find("li").hover(function(){
//     var name = $(this).attr("data-name");
//     var yue = $(this).attr("data-id");
//     var class_name = $(this).attr("class");
//     console.log(class_name)
//     var qian ;
//     if(yue!="q"&&yue!="s"){
//         getBalance(yue,"."+class_name)
//         qian = $(this).attr("pname");
//     }else if(yue=="q"){
//         getBlance()
//         qian = getCookie("blance")
//     }else if(yue=="s"){
//         qian = getCookie("hold");
//     }
//     $(this).addClass("hoverLi").html('<p class="blanceTips">'+name+'账户余额'+qian+'</p>')

//     $(".blanceTips").show("slow")
// },function(){
//     $(this).removeClass("hoverLi").html("")
//     $(".blanceTips").hide("slow") 
// })
// setTimeout(function(){
//     for(var i=0;i<$(".prograss").find("li").length;i++){
//         console.log($(".prograss").find("li").length)
//         $(".prograss").find("li").eq(i).css("width",$(".prograss").find("li").eq(i).attr("pname"))
//     }
// },2000)

/**
function getWidth(){
    var cenMoney = parseFloat($(".cenbg").attr("pname"))
    var lockMoney = parseFloat($(".lockbg").attr("pname"))
    var sporMoney = parseFloat($(".sporbg").attr("pname"))
    var bbinMoney = parseFloat($(".bbinbg").attr("pname"))
    var ptMoney = parseFloat($(".ptbg").attr("pname"))
    var mgMoney = parseFloat($(".mgbg").attr("pname"))
    var xinMoney = parseFloat($(".xinbg").attr("pname"))
    var pngMoney = parseFloat($(".pngbg").attr("pname"))
    var agMoney = parseFloat($(".agbg").attr("pname"))
    var allMoney =cenMoney+lockMoney+sporMoney+bbinMoney+ptMoney+mgMoney+xinMoney+pngMoney+agMoney
    var cenWidth = cenMoney/allMoney
    var lockWidth = lockMoney/allMoney
    var sporWidth = sporMoney/allMoney
    var bbinWidth = bbinMoney/allMoney
    var ptWidth = ptMoney/allMoney
    var mgWidth = mgMoney/allMoney 
    var xinWidth = xinMoney/allMoney 
    var pngWidth = pngMoney/allMoney 
    var agWidth = agMoney/allMoney 

    console.log(allMoney)
    console.log(ptMoney)
    console.log($(".ptbg").attr("pname"))
    $(".cenbg").animate({
        width:cenWidth
    })
    $(".lockbg").animate({
        width:lockWidth
    })
    $(".sporbg").animate({
        width:sporWidth
    })
    $(".bbinbg").animate({
        width:bbinWidth
    })
    $(".ptbg").animate({
        width:ptWidth
    })
    $(".mgbg").animate({
        width:mgWidth
    })
    $(".xinbg").animate({
        width:xinWidth
    })
    $(".pngbg").animate({
        width:pngWidth
    })
    $(".agbg").animate({
        width:agWidth
    })
}**/

// $("")