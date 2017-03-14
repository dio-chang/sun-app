$(function(){
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
                yuan2()
			}else{
				percentage+=0
				yuan2()
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
                 yuan2()
 			}else{
				percentage+=0
				yuan2()
			}
 			if(xhr.data.user.mobile!=""){
 				$(".bindphone").addClass("isbind")
                 percentage+=25
                 yuan2()
 			}else{
				percentage+=0
				yuan2()
			}
 			if(xhr.data.user.email!=""){
 				$(".bindemail ").addClass("isbind")
                 percentage+=25
                 yuan2()
 			}else{
				percentage+=0
				yuan2()
			}
 		}
 	})
 	
 	function yuan2(){
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
	        lineWidth:"5"
    	});
    	if(percentage==0){
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
	var getuserprofile = Backbone.Model.extend();
	var NewuserModel = new getuserprofile;
	NewuserModel.fetch({
		beforeSend:function(){
			beforeSend()
		},
		url:RootUrl+"/?d=api&c=user&m=getuserprofile",
		error:function(model,xhr){
			console.log("获取用户资料失败")
		},
		success:function(model,xhr){
			setCookie("uid",xhr.data.user.id,30)
			if(xhr.data.user.name==""){
				$(".goName").show();
				$(".realName").hide();
			}else{
				$(".realName").html(xhr.data.user.firstname+"**").show();
				$(".goName").hide();
				$(".xin").find("input").val(xhr.data.user.firstname).attr("disabled",true).css("background","#f1f1f1");
				$(".ming").find("input").val(xhr.data.user.lastname).attr("disabled",true).css("background","#f1f1f1");
				$(".tishi").hide()
			}
			if(xhr.data.user.mobile==""){
				$(".mobileNumber").hide();
				$(".goMobile").show()
			}else{
				$(".mobileNumber").html(xhr.data.user.mobile).show();
				$(".goMobile").hide()
			}
			if(xhr.data.user.email==""){
				$(".emailNumber").hide();
				$(".goEmaile").show();
			}else{
				$(".emailNumber").html(xhr.data.user.email).show();
				$(".goEmaile").hide();
			}
			if($(".mobileNumber").html()!=""){
				$(".safeNav2").hide()
			}
			var regtime = formatTime(xhr.data.user.lastlogtime,2)
			$(".regtime").html(regtime).show();
			if(xhr.data.user.sex!=0){
				$(".gender").find("p").unbind("click")
				if(xhr.data.user.sex==1){
					$(".man").addClass("checked"); 
				}else if(xhr.data.user.sex==2){
					$(".woman").addClass("checked");
				}
				$(".save").hide();
			}
			if(xhr.data.user.birthday==""){
				$("p.birthday").hide();
				$("div.birthday").show();
			}else{
				var str = xhr.data.user.birthday.split("|")
				$("#idYear").val(str[0]).attr("disabled",true).css("background","#f1f1f1");
				$("#idMonth").val(str[1]).attr("disabled",true).css("background","#f1f1f1");
				$("#idDay").val(str[2]).attr("disabled",true).css("background","#f1f1f1");
			}
		}
	})
	$(".userName").html(getCookie("username"))
	if(!getCookie("ci_session")){
		goHome()
	}
})
