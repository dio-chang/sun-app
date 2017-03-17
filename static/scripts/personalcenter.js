$(function(){
	var myDate = new Date();
    $("#dateSelector").DateSelector({
            ctlYearId: 'idYear',
            ctlMonthId: 'idMonth',
            ctlDayId: 'idDay',
            defYear: myDate.getFullYear(),
            defMonth: (myDate.getMonth()+1),
            defDay: myDate.getDate(),
            minYear: 1800,
            maxYear: (myDate.getFullYear()+1)
    });
	$(".main_l3").addClass("active")
	$(".gender").find("p").click(function(){
		$(this).addClass("checked").siblings().removeClass("checked")
	})
	$(".safeNav").find("li").click(function(){
		$(".error").html("")
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
		if($(".safeNav4").hasClass("active")){
			$(".showbox4").addClass("show").siblings().removeClass("show")
		}
		if($(".safeNav5").hasClass("active")){
			$(".showbox5").addClass("show").siblings().removeClass("show")
		}
		if($(".safeNav6").hasClass("active")){
			$(".showbox6").addClass("show").siblings().removeClass("show")
		}
		if($(".safeNav7").hasClass("active")){
			$(".showbox7").addClass("show").siblings().removeClass("show")
		}
		if($(".safeNav8").hasClass("active")){
			$(".showbox8").addClass("show").siblings().removeClass("show")
		}
	})
	
	$(".save").on("click",function(){
		var xin = $(".xin").find("input").val();
		var ming =$(".ming").find("input").val();
		var sex = $(".checked").attr("data-sex");
		var year = $("#idYear").val();
		var month = $("#idMonth").val();
		var day = $("#idDay").val();
		if(xin!=""&&ming!=""&&sex!=""&&year!=""&&month!=""&&day!=""){
			var Setusername=Backbone.Model.extend()
			var NewSetusername = new Setusername({
				firstname:xin,
				lastname:ming,
				sex:sex,
				year:year,
				month:month,
				day:day
			})
			NewSetusername.save(null,{
				beforeSend:function(){
					beforeSend()
				},
				url: RootUrl+"/?d=api&c=user&m=setusername",
				error:function(model,xhr){
					console.log("失败")
				},
				success:function(model,xhr){
					$(".mask").show();
					$(".success").show();
					$(".success").find("dd").html(xhr.data.msg)
					$(".success").find("dt").removeClass("failed")
					if(xhr.status == 0){
						$(".success").find("dt").addClass("failed")
						
					}

				}
			})
		}else{
			if(xin==""){
				alert("请输入姓")
				return false;
			}
			if(ming==""){
				alert("请输入名")
				return false;
			}
			if(sex==""){
				alert("请选择性别")
				return false;
			}

		}
		
	})
	var reg = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$");
	function newpassword(){
		if($(".newpassword").val()==""){
			$(".newpassword").parent("div").addClass("redbor")
			$(".newpassword").siblings(".error").html("新密码不能为空")
		}else if(!reg.test($(".newpassword").val())){
			$(".newpassword").parent("div").addClass("redbor")
			$(".newpassword").siblings(".error").html("密码只能是6到12位的小写字母和数字的组合")
		}else{
			$(".newpassword").parent("div").removeClass("redbor")
			$(".newpassword").siblings(".error").html("")
		}
	}
	function pronewpassword(){
		if($(".pronewpassword").val()==""){
			$(".pronewpassword").parent("div").addClass("redbor")
			$(".pronewpassword").siblings(".error").html("请确认密码")
		}else if($(".pronewpassword").val()!=$(".newpassword").val()){
			$(".pronewpassword").parent("div").addClass("redbor")
			$(".pronewpassword").siblings(".error").html("两次输入的密码不一致")
		}else{
			$(".pronewpassword").parent("div").removeClass("redbor")
			$(".pronewpassword").siblings(".error").html("")
		}
	}
	$(".newpassword").on("blur",function(){
		newpassword()
	})
	$(".pronewpassword").on("blur",function(){
		pronewpassword()
	})
	$(".savepassword").on("click",function(){
		$(".error").html("")
		var oldpassword = $(".oldpassword").val()
		var newpassword = $(".newpassword").val()
		var pronewpassword = $(".pronewpassword").val()
		if(oldpassword==""){
			$(".oldpassword").parent("div").addClass("redbor")
			$(".oldpassword").siblings(".error").html("请输入旧密码")
		}else if(newpassword==""){
			$(".newpassword").parent("div").addClass("redbor")
			$(".newpassword").siblings(".error").html("新密码不能为空")
		}else if(!reg.test(newpassword)){
			$(".newpassword").parent("div").addClass("redbor")
			$(".newpassword").siblings(".error").html("密码只能是6到12位的小写字母和数字的组合")
		}else if(pronewpassword==""){
			$(".pronewpassword").parent("div").addClass("redbor")
			$(".pronewpassword").siblings(".error").html("请确认密码")
		}else if(pronewpassword!=newpassword){
			$(".pronewpassword").parent("div").addClass("redbor")
			$(".pronewpassword").siblings(".error").html("两次输入的密码不一致")
		}else{
			var PasswordModel = Backbone.Model.extend();
			var NewPasswordModel = new PasswordModel({
				password_old:oldpassword ,
				password_new:newpassword ,
				password_new_check:pronewpassword 
			});
			NewPasswordModel.save(null,{
				type:"POST",
				beforeSend:function(){
					beforeSend()
				},
				url: RootUrl+"/?d=api&c=user&m=changepassword",
				error:function(model,xhr){
					console.log("密码保存失败")
				},
				success:function(model,xhr){
					$(".mask").show();
					$(".success").show();
					$(".success").find("dd").html(xhr.data.msg)
					$(".success").find("dt").removeClass("failed")
					if(xhr.status == 0){
						$(".success").find("dt").addClass("failed")
						
					}
				}
				
			})
		}
		
	})

	$(".savefundspassword").on("click",function(){ 
		$(".error").html("")
		var oldfundspassword = $(".oldfundspassword").val()
		var newfundspassword = $(".newfundspassword").val()
		var pronewfundspassword = $(".pronewfundspassword").val()
		//if()
		if(newfundspassword==""){
			$(".newfundspassword").parent("div").addClass("redbor")
			$(".newfundspassword").siblings(".error").html("新密码不能为空")
		}
		// else if(!reg.test(newfundspassword)){
		// 	$(".newfundspassword").parent("div").addClass("redbor")
		// 	$(".newfundspassword").siblings(".error").html("密码只能是6到12位的小写字母和数字的组合")
		// }
		else if(pronewfundspassword==""){
			$(".pronewfundspassword").parent("div").addClass("redbor")
			$(".pronewfundspassword").siblings(".error").html("请确认密码")
		}else if(pronewfundspassword!=newfundspassword){
			$(".pronewfundspassword").parent("div").addClass("redbor")
			$(".pronewfundspassword").siblings(".error").html("两次输入的密码不一致")
		}else{
			var nPasswordModel = Backbone.Model.extend();
			var NewnPasswordModel = new nPasswordModel({
				oldscode:oldfundspassword ,
				scode:newfundspassword ,
				rescode:pronewfundspassword
			});
			NewnPasswordModel.save(null,{
				type:"POST",
				beforeSend:function(){
					beforeSend()
				},
				url: RootUrl+"/?d=api&c=user&m=setsecuritycode",
				error:function(model,xhr){
					console.log("密码保存失败")
				},
				success:function(model,xhr){
					$(".mask").show();
					$(".success").show();
					$(".success").find("dd").html(xhr.data.msg)
					$(".success").find("dt").removeClass("failed")
					if(xhr.status == 0){
						$(".success").find("dt").addClass("failed")
						
					}
					
				}
				
			})
		}
		
	})
    var wait=0;  
    var isemail=/^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/; 
	dianji()
    function dianji(wait){
    	$(".getCode").unbind("click")
        $(".getCode").click(function(){
        	$(".error").html("")
            _this=$(this)
            var email = $("#email").val();
            if(email.match(isemail)){
            	_this.siblings(".error").html("")
	            var getCode = Backbone.Model.extend();
	            var NewgetCode = new getCode({
	            	email:email
	            });
	            NewgetCode.save(null,{
	            	type:"POST",
	            	beforeSend:function(){
						beforeSend()
					},
	            	url: RootUrl+"/?d=api&c=user&m=getemailcaptcha",
	            	error:function(model,xhr){
	            		console.log("请求失败")
	            	},
	            	success:function(model,xhr){
	            		console.log(xhr.data.msg)
	            		if(xhr.status==1){
	            			wait = 5
	            			$(".codebox").find(".error").html(xhr.data.msg).css("color","#a5d1a6")
	            			repule()
	            		}else if(xhr.status==2){
	            			$(".codebox").find(".error").html(xhr.data.msg).css("color","#a5d1a6")
	            			wait = 30
	            			repule()
	            		}else{
	            			console.log("xhr.data.msg")
	            		}
	            		var timer
	            		function daojishi(){
							wait--
						    _this.addClass("disabled")
		            		_this.html("重新发送("+wait+")")
		            		_this.unbind("click")
		            		if(wait==0){
		            			clearTimeout(timer)
		            			_this.bind("click",dianji())
		            			_this.html("获取验证码").removeClass("disabled")
		            		}
						}
	            		function repule(){
	            			daojishi()
							timer = setInterval(function(){
								daojishi()
							    
							},1000)
							
	            		}
	            		
	            	}
	            })
            }else{
            	$("#email").siblings(".error").html("邮箱格式不正确")
            }
        })
    }
    $(".saveemail").on("click",function(){
    	$(".error").html("")
    	if($("#email").val()==""){
    		$("#email").siblings(".error").html("请输入邮箱")
    	}else if(!$("#email").val().match(isemail)){
    		$("#email").siblings(".error").html("邮箱格式不正确")
    	}else if($(".emailcode").val()==""){
    		$(".emailcode").siblings(".error").html("请输入验证码")
    	}else{
    		var savEmail = Backbone.Model.extend();
		    var NewsavEmail = new savEmail({
		    	email:$("#email").val(),
		    	captcha:$(".emailcode").val()
		    });
		    NewsavEmail.save(null,{
		    	beforeSend:function(){
					beforeSend()
				},
		    	url: RootUrl+"/?d=api&c=user&m=setemail",
		    	error:function(model,xhr){
		    		console.log("绑定失败")
		    	},
		    	success:function(model,xhr){
		    		if(xhr.status==0){
		    			$(".emailcode").siblings(".error").html(xhr.data.msg)
		    		}else{
		    			$(".success").show()
		    			$(".success").find("dd").html(xhr.data.msg)
		    			$(".mask").show()
		    		}
		    	}
		    })
    	}
    })
	var Getsecuritycode =Backbone.Model.extend()
	var Newgetsecuritycode = new Getsecuritycode;
	Newgetsecuritycode.fetch({
		beforeSend:function(){
			beforeSend()
		},
		url:RootUrl+"/?d=api&c=user&m=checksecuritycode",
		error:function(model,xhr){
			console.log("失败")
		},
		success:function(model,xhr){
			if(xhr.status==1){
				$(".safeNav3").find("a").html("修改资金密码")
				$(".zijin").show()
			}else{
				$(".safeNav3").find("a").html("设置资金密码")
				$(".newfundpwd").html("设置资金密码：")
				$(".zijin").hide()

				
			}
		}
	})
	$('.safeNav5').on("click",function(){
		var QusetionModel = Backbone.Model.extend()
	    var QusetionCollection = Backbone.Collection.extend({
	        model: QusetionModel,
	        parse: function (resp, xhr) {
	            return resp.data.question;
	        }
	    });
	    var NewQusetionCollection = new QusetionCollection;
	    var QusetionView = Backbone.View.extend({
	            el: $(".questionName"),
	            template: _.template($('#question').html()),
	            events: {
	               // "click option":function(event){
	               // 	}

	            },
	            initialize: function () {
	                var template = this.template;
	                var el = this.el;
	                var render = this.render();
	                NewQusetionCollection.fetch({
	                	beforeSend:function(){
							beforeSend()
						},
	                    url: RootUrl+"/?d=api&c=userquestion&m=getlists",
	                    error:function(collection,xhr){
	                        console.log("请求安全问题失败")
	                    },
	                    success: function (collection, xhr) {
	                       console.log(xhr.data.msg)
	                       $(el).html(template({data:collection.models}));
	                       $(".savequestion").on("click",function(){
	                       		$(".showbox5").find(".error").html("")
	                       		if($(".answer").val()!=""){
		                       		$("#questionName").find("option:selected").attr("data-id")
		                       		var saveQuestion = Backbone.Model.extend()
		                       		var NewQuestionModel = new saveQuestion({
		                       			qid:$(".questionName").find("option:selected").attr("data-id"),
		                       			answer:$(".answer").val()
		                       		});
		                       		NewQuestionModel.save(null,{
		                       			type:"POST",
		                       			url:RootUrl+"/?d=api&c=userquestion&m=setanswer",
		                       			error:function(){
		                       				alert("设置安全问题失败")
		                       			},
		                       			success:function(model,xhr){
		                       				$(".success").show();
		                       				$(".mask").show();
		                       				$(".success").find("dd").html(xhr.data.msg)
		                       				if(xhr.status!=1){
		                       					$(".success").find("dt").addClass("failed")	
		                       				}else if(xhr.status==1){
		                       					$(".success").find("dt").removeClass("failed")
		                       				}
		                       			}
		                       		})
	                       		}else{
	                       			$(".answerBox").find(".error").html("请输入安全问题")
	                       		}
	                       })


	                    },
	                    silent: true,
	                });
	            } 
	    })
	    var NewQusetionView = new QusetionView;
	})

	var getusertype = Backbone.Model.extend();
	var newGetusertype = new getusertype;
	newGetusertype.save(null,{
		beforeSend:function(){
			beforeSend()
		},
		url:RootUrl+"/?d=api&c=user&m=findpasswordway&uid="+getCookie("uid"),
		error:function(){
			console.log("获取用户设置问题否失败")
		},
		success:function(model,xhr){
			console.log(xhr.data.question)
			if(xhr.data.question==1){
				$(".safeNav5").hide()
			}else{
				$(".safeNav6").hide()
			}

		}
	})

	$('.safeNav6').on("click",function(){
		
		var QusetionModel6 = Backbone.Model.extend()
	    var QusetionCollection6 = Backbone.Collection.extend({
	        model: QusetionModel6,
	        parse: function (resp, xhr) {
	            return resp.data.question;
	        }
	    });
	    var NewQusetionCollection6 = new QusetionCollection6;
	    var QusetionView6 = Backbone.View.extend({
	            el: $(".questionName6"),
	            template: _.template($('#question').html()),
	            events: {
	            },
	            initialize: function () {
	                var template = this.template;
	                var el = this.el;
	                var render = this.render();
	                NewQusetionCollection6.fetch({
	                	beforeSend:function(){
							beforeSend()
						},
	                    url: RootUrl+"/?d=api&c=userquestion&m=getlists",
	                    error:function(collection,xhr){
	                        console.log("请求安全问题失败")
	                    },
	                    success: function (collection, xhr) {
	                       $(el).html(template({data:collection.models}));
	                       $(".checkquestion").click(function(){
	                       		$(".error").html("")
	                       		if($(".answer6").val()!=""){
			                       var Checkquestion = Backbone.Model.extend();
								   var uid = getCookie("uid")
								   var NewCheckquestion = new Checkquestion({
								   		qid:$(".questionName6").find("option:selected").attr("data-id"),
								   		answer:$(".answer6").val()
								   });

								   NewCheckquestion.save(null,{
									   	url:RootUrl+"/?d=api&c=userquestion&m=checkanswer&uid="+uid,
									   	error:function(){
									   		console.log("请求检测失败")
									   	},
									   	success:function(model,xhr){
									   		if(xhr.status == 1){
									   			$(".qastep1").hide()
									   			$(".qastep2").show()
									   			console.log($(".questionName6").find("option:selected").val())
									   			setTimeout(function(){
									   				$(".questionNamestep2").val($(".questionName6").find("option:selected").val())
									   			},10)
									   			
											// 	var QusetionModel7 = Backbone.Model.extend()
											//     var QusetionCollection7 = Backbone.Collection.extend({
											//         model: QusetionModel7,
											//         parse: function (resp, xhr) {
											//             return resp.data.question;
											//         }
											//     });
											//     var NewQusetionCollection7 = new QusetionCollection7;
											//     var QusetionView7 = Backbone.View.extend({
											//             el: $(".questionNamestep2"),
											//             template: _.template($('#question').html()),
											//             events: {
											//             },
											//             initialize: function () {
											//             	var template = this.template;
											//                 var el = this.el;
											//                 var render = this.render();
											//                 NewQusetionCollection7.fetch({
											//                     url: RootUrl+"/?d=api&c=userquestion&m=getlists",
											//                     error:function(collection,xhr){
											//                         console.log("请求安全问题失败")
											//                     },
											//                     success: function (collection, xhr) {
											//                     	console.log(xhr.data)
											//                     	$(el).html(template({data:collection.models}));
											//                     }
											//                 })
											//             }
											//         })
											//     var NewQusetionView7 = new QusetionView7;

									   		}else{
									   			$(".huida").find(".error").html("答案或者问题错误")
									   		}
									   	}
								   })
							    }else{
							    	$(".showbox6").find(".huida").find(".error").html("请输入安全问题的答案")
							    } 
	                       })
	                    },
	                    silent: true,
	                });
	            } 
	    })
	    var NewQusetionView6 = new QusetionView6;
	})	
	$(".changequestion").click(function(){
	    var changeModel = Backbone.Model.extend();
	    var NewchangeModel = new changeModel({
	    	qid:$(".questionName6").find("option:selected").attr("data-id"),
	    	answer:$(".answerstep2").val()
	    });
	    NewchangeModel.save(null,{
	    	beforeSend:function(){
				beforeSend()
			},
	    	url:RootUrl+"/?d=api&c=userquestion&m=changeanswer",
	    	error:function(){
	    		console.log("设置失败，请重试")
	    	},
	    	success:function(model,xhr){
	    		$(".mask").show();
	    		$(".success").show();
	    		$(".success").find("dd").html(xhr.data.msg)
	    		if(xhr.status !== 1){
	    			$(".success").find("dt").addClass("failed")	
	    		}
	    	}
	    })
	})
	var phoneTime;
	$(".yanzheng").on("click",function(){
		if($(".phoneNumber").val()==""){
			$(".showbox2").find(".error").html("请输入验证码")
		}else if(!(/^1[34578]\d{9}$/.test($(".phoneNumber").val()))){
			$(".showbox2").find(".error").html("请输入正确格式的手机号")
		}else{
			$(".yanzheng").unbind("click")
			var GetPhoneCode = Backbone.Model.extend();
			var newGetPhoneCode = new GetPhoneCode({
				mobile:$(".phoneNumber").val()
			});
			newGetPhoneCode.save(null,{
				beforeSend:function(){
					beforeSend()
				},
				url:RootUrl+"/?d=api&c=mobile&m=getcaptcha",
				error:function(){
					console.log("获取手机验证码失败")
				},
				success:function(model,xhr){
					if(xhr.status==1){
						var time = 60
						function phoneM(){
							time--
							$(".yanzheng").html("重新获取（"+time+"S）").addClass("disabled")
							if(time==0){
								clearInterval(phoneTime)
								$(".yanzheng").removeClass("disabled")	
								$(".yanzheng").html("获取验证码")
								time=60
							}
						}
						phoneM()	
						phoneTime = setInterval(function(){
							phoneM()
							
						},1000)
					}else{
						$(".success").show();
						$(".mask").show()
						$(".success").find("dd").html(xhr.data.msg)
						$(".success").find("dt").addClass("failed")	
					}
				}
			})
		}


	})
	$(".savephone").on("click",function(){
		$(".error").html()
		var PhoneModel = Backbone.Model.extend();
		var NewPhoneModel = new PhoneModel({
			mobilenumber:$(".phoneNumber").val(),
			captcha:$(".phonecode").val()
		})
		NewPhoneModel.save(null,{
			beforeSend:function(){
				beforeSend()
			},
			url:RootUrl+"/?d=api&c=user&m=setmobile",
			error:function(){
				$(".error").html("绑定手机失败")
			},
			success:function(model,xhr){
				$(".success").show();
				$(".mask").show()
				$(".success").find("dd").html(xhr.data.msg)
				if(xhr.status!=1){
					$(".success").find("dt").addClass("failed")	
				}
			}
		})
	})

	$(".saveqq").on("click",function(){
		var strQQ = $("#qqVal").val()
		$(".error").html()
		if($("#qqVal").val()==""){
			$(".error").html("请输入QQ号")
		}else if(isNaN(strQQ)){
			$(".error").html("QQ号格式不正确")	
		}else if($("#conqqVal").val()!=$("#qqVal").val()){
			if($("#conqqVal").val()==""){
				$(".error").html("请确认QQ号")
			}else{
				$(".error").html("两次输入的号码不一致")
			}
		}else{
			var qqModel =Backbone.Model.extend()
			var NewqqModel = new qqModel({
				qq:$("#qqVal").val(),
			});
			NewqqModel.save(null,{
				type:"POST",
				beforeSend:function(){
					beforeSend()
				},
				url:RootUrl+"/?d=api&c=user&m=setQq",
				error:function(){
					$(".error").html("绑定QQ失败")
				},
				success:function(model,xhr){
					$(".success").show();
					$(".mask").show()
					$(".success").find("dd").html(xhr.data.msg)
					if(xhr.status!=1){
						$(".success").find("dt").addClass("failed")	
					}
				}
			})
		}
	})
	$(".saveweixin").on("click",function(){
		$(".error").html()
		if($("#weiVal").val()==""){
			$(".error").html("请输入微信号")
		}else if($("#conweiVal").val()!=$("#weiVal").val()){
			if($("#conweiVal").val()==""){
				$(".error").html("请确认微信号")
			}else{
				$(".error").html("两次输入的号码不一致")
			}
		}else{
			var wechatModel =Backbone.Model.extend()
			var NewwechatModel = new wechatModel({
				wechat:$("#weiVal").val(),
			});
			NewwechatModel.save(null,{
				type:"POST",
				beforeSend:function(){
					beforeSend()
				},
				url:RootUrl+"/?d=api&c=user&m=setWechat",
				error:function(){
					$(".error").html("绑定微信失败")
				},
				success:function(model,xhr){
					$(".success").show();
					$(".mask").show()
					$(".success").find("dd").html(xhr.data.msg)
					if(xhr.status!=1){
						$(".success").find("dt").addClass("failed")	
					}
				}
			})
		}
	})

	$(".loginsure").on("click",function(){
		$(".mask").hide();
		$(".success").hide();
		$("#email").val("");
		$(".emailcode").val("");
		window.location.reload()
	})
})