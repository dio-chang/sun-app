$(function(){
	//获取平台ID 余额用
	GetPid("#select2","#getplat")
	var getsecuritycode = Backbone.Model.extend()
	var Newgetsecuritycode = new getsecuritycode;
	Newgetsecuritycode.fetch({
		url:RootUrl+"/?d=api&c=user&m=checksecuritycode",
		error:function(){
			console.log("获取是否设置资金密码失败")
		},
		success:function(model,xhr){
			$("#haspass").val(xhr.status)
		}
	})	
	$(".transferNav").addClass("active")
	var outz = $(".out").css("top")
	var intoz = $(".into").css("top")
	$(".exchange").click(function(){ 
		if($(".select1").hasClass("out")){
			$(".select1").removeClass("out").addClass("into")
			$(".zhuanchu").html("转入：") 
			$(".zhuanru").html("转出：")
			$(".select2").removeClass("into").addClass("out")
		}else if($(".select2").hasClass("out")){
			$(".select2").removeClass("out").addClass("into")
			$(".zhuanchu").html("转出：")
			$(".zhuanru").html("转入：")
			$(".select1").removeClass("into").addClass("out")
		}

	})
	$(".transfer").unbind("click")
	var number = /^[1-9]\d*$/;
	$(".transfer").on("click",function(){
		var getuserfund = $(".blance").html()
		getuserfund = Number(getuserfund);
		var amount = $("#amount").val();
		var select1 = $("#select1").parent(".select1");
		var getsecuritycode = Backbone.Model.extend()
		var Newgetsecuritycode = new getsecuritycode;
		if($("#haspass").val()==1){
				if(amount!=""&&amount>0&&number.test(amount)){
					if(select1.hasClass("out")){
						var outBind = false;
						if(amount>getuserfund){
							$(".error").html("可转出余额不足") 
						}else{
							$(".transferout").html($(".out").find("select").val())
							$(".transferinfo").html($(".into").find("select").val())
							$(".maney").html(amount)
							$(".transferpob").show();
							$(".mask").show();
						}
						$(".yes").unbind("click")
						$(".yes").on("click",function(){
							transfer()
							function transfer(){
								pid = $("#select2").find("option:selected").attr("data-pid")
								$(".goTransfer").removeClass("yes").addClass("wait").html("正在转账")
								$(".goTransfer").unbind("click")
								var scode = $(".finpassword").val()
								if(scode==""){
									$(".perror").html("资金密码不能为空")
								}else{
									var transferin = Backbone.Model.extend()
									var NewTransferin = new transferin({
										pid:pid,
										amount:amount,
										scode:scode,
									});
									NewTransferin.save(null,{
										beforeSend:function(){
				                            beforeSend()
				                        },
										url:RootUrl+"/?d=api&c=game&m=transferin",
										error:function(model,xhr){
											console.log("获取失败")
										},
										success:function(model,xhr){
											if(xhr.status!=1){
												console.log(xhr.status)
												$(".perror").html(xhr.data.msg)
												$(".goTransfer").removeClass("wait").addClass("yes").html("确定")
											}else{
												$(".goTransfer").removeClass("wait").addClass("yes").html("确定")
												$(".transferpob").hide();
												$(".success").show();
												$(".success").find("dd").html(xhr.data.msg)
												$(".success").find("a").addClass("comfire")
												$(".comfire").on("click",function(){
													reload()
												})
											}
											if(outBind==false){
												$(".yes").bind("click",function(){
													transfer()
													outBind=true
												})
											}else{
												return false;
											}
										}
									})
								}
							}
						})
					}else{
						if(amount>0){
							$(".transferout").html($(".out").find("select").val())
							$(".transferinfo").html($(".into").find("select").val())
							$(".maney").html(amount)
							$(".transferpob").show();
							$(".mask").show(); 
							$(".yes").unbind("click")
							var bind = false;
							$(".yes").on("click",function(){
								transfer2() //这个地方有改动
								function transfer2(){
									pid = $("#select2").find("option:selected").attr("data-pid")
									$(".goTransfer").removeClass("yes").addClass("wait").html("正在转账")
									$(".goTransfer").unbind("click")
									var scode = $(".finpassword").val()
									console.log("scode")
									if(scode==""){
										$(".perror").html("资金密码不能为空")
									}else{
										var transferout = Backbone.Model.extend()
										var NewTransferout = new transferout({
											pid:pid,
											amount:amount,
											scode:scode,
										});
										NewTransferout.save(null,{
											beforeSend:function(){
					                            beforeSend()
					                        },
											url:RootUrl+"/?d=api&c=game&m=transferout",
											error:function(model,xhr){
												console.log("获取失败")
											},
											success:function(model,xhr){
												if(xhr.status!=1){
													console.log(xhr.status)
													$(".perror").html(xhr.data.msg)
													$(".goTransfer").removeClass("wait").addClass("yes").html("确定")
												}else{
													$(".goTransfer").removeClass("wait").addClass("yes").html("确定")
													$(".transferpob").hide();
													$(".success").show();
													$(".success").find("dd").html(xhr.data.msg)
													$(".success").find("a").addClass("comfire")
													$(".comfire").on("click",function(){
														reload()
													})
												}
												if(bind==false){
													$(".yes").bind("click",function(){
														transfer2()
														bind=true
													})
												}else{
													return false;
												}
												
											}
										})
									}
								
								}
								
								
							})
						}else{
							$(".error").html("请输入正确的金额")
						}
					}
				}else{
					if(amount==""){
						$(".error").html("请输入转账金额")
					}else if(isNaN(amount)){
						$(".error").html("请输入数字")
					}else{
						$(".error").html("请输入正整数")
					}
				}
		}else{
			$(".error").html("您还没有设置资金密码")
		}
	})
	$(".sure,.close").on("click",function(){
		$(".success").hide();
		$(".mask").hide();
		$(".transferpob").hide();
		reload()
	})
	for(var i=0;i<$(".counList li").length;i++){
		$(".counList li").click(function(){
			$(this).addClass("active").siblings().removeClass("active")
		})
	}
	GetPid(".qian","#getplattop")
	

})	