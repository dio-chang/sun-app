$(function(){
/**	
	$(".navbar-nav").find("li").eq(1).addClass("activenav").siblings().removeClass("activenav")
	var i=0;
	var kL = $(".touchArea").offset().left,
		kW = $(".touchArea").width(),
		kT = $(".touchArea").offset().top,
		kH = $(".touchArea").height();
	var hL = $(".hand").offset().left,
		hW = $(".hand").width(),
		hT = $(".hand").offset().top,
		hH = $(".hand").height();
	var chips1L = $(".chips1").offset().left,
		chips1W = $(".chips1").width(),
		chips1T = $(".chips1").offset().top,
		chips1H = $(".chips1").height();
	var chips2L = $(".chips2").offset().left,
		chips2W = $(".chips2").width(),
		chips2T = $(".chips2").offset().top,
		chips2H = $(".chips2").height();
	var chips3L = $(".chips3").offset().left,
		chips3W = $(".chips3").width(),
		chips3T = $(".chips3").offset().top,
		chips3H = $(".chips3").height();
	var chips4L = $(".chips4").offset().left,
		chips4W = $(".chips4").width(),
		chips4T = $(".chips4").offset().top,
		chips4H = $(".chips4").height();
	var chips5L = $(".chips5").offset().left,
		chips5W = $(".chips5").width(),
		chips5T = $(".chips5").offset().top,
		chips5H = $(".chips5").height();
	var chips6L = $(".chips6").offset().left,
		chips6W = $(".chips6").width(),
		chips6T = $(".chips6").offset().top,
		chips6H = $(".chips6").height();
	var chips7L = $(".chips7").offset().left,
		chips7W = $(".chips7").width(),
		chips7T = $(".chips7").offset().top,
		chips7H = $(".chips7").height();

	var bk1L = $(".bk1").offset().left,
		bk1W = $(".bk1").width(),
		bk1T = $(".bk1").offset().top,
		bk1H = $(".bk1").height();
	var bk2L = $(".bk2").offset().left,
		bk2W = $(".bk2").width(),
		bk2T = $(".bk2").offset().top,
		bk2H = $(".bk2").height();
	var bk3L = $(".bk3").offset().left,
		bk3W = $(".bk3").width(),
		bk3T = $(".bk3").offset().top,
		bk3H = $(".bk3").height();
	var bk4L = $(".bk4").offset().left,
		bk4W = $(".bk4").width(),
		bk4T = $(".bk4").offset().top,
		bk4H = $(".bk4").height();
	var bk5L = $(".bk5").offset().left,
		bk5W = $(".bk5").width(),
		bk5T = $(".bk5").offset().top,
		bk5H = $(".bk5").height();
	var bk6L = $(".bk6").offset().left,
		bk6W = $(".bk6").width(),
		bk6T = $(".bk6").offset().top,
		bk6H = $(".bk6").height(); 
	var clonep = $(".clonep")
	doMove()
	var onOff = false;
	function doMove(){
		$(document).mousemove(function(ev){
			if(ev.pageX>kL+hW/2&&ev.pageX<kL+kW-hW/2&&ev.pageY>kT+hH/4&&ev.pageY<kT+kH+90){
				$('.hand').css('left',ev.pageX-kL-hW/2);
				$('.hand').css('top',ev.pageY-hH/3-135);
			}
			// 试玩按钮
			var swL = $(".shiwan").offset().left,
			swW = $(".shiwan").width(),
			swT = $(".shiwan").offset().top,
			swH = $(".shiwan").height();
			var swVal = ev.pageX>swL&&ev.pageX<swL+swW&&ev.pageY>swT&&ev.pageY<swT+swH+40
			if(swVal){
				$(".shiwan").css("background-position","-336px 0px")
				$(".hand").on("click",function(){
					$(".shiwan").hide()
					$(".tips").show("500")
					setTimeout(function(){
						$(".tips").hide()
						$(".hand").unbind("click")
					},3000)
				})
			}else{
				$(".shiwan").css("background-position","0px 0px")
				return false;
			}
		});
	}
	$(".hand").mousedown(function(ev){
		var bak1Val = ev.pageX>bk1L&&ev.pageX<bk1L+bk1W&&ev.pageY>bk1T&&ev.pageY<bk1T+bk1H,
			bak2Val = ev.pageX>bk2L&&ev.pageX<bk2L+bk2W&&ev.pageY>bk2T&&ev.pageY<bk2T+bk2H,
			bak3Val = ev.pageX>bk3L&&ev.pageX<bk3L+bk3W&&ev.pageY>bk3T&&ev.pageY<bk3T+bk3H,
			bak4Val = ev.pageX>bk4L&&ev.pageX<bk4L+bk4W&&ev.pageY>bk4T&&ev.pageY<bk4T+bk4H,
			bak5Val = ev.pageX>bk5L&&ev.pageX<bk5L+bk5W&&ev.pageY>bk5T&&ev.pageY<bk5T+bk5H,
			bak6Val = ev.pageX>bk6L&&ev.pageX<bk6L+bk6W&&ev.pageY>bk6T&&ev.pageY<bk6T+bk6H;
		var chips1Val = ev.pageX>chips1L&&ev.pageX<chips1L+chips1W&&ev.pageY>chips1T&&ev.pageY<chips1T+chips1H,
			chips2Val = ev.pageX>chips2L&&ev.pageX<chips2L+chips2W&&ev.pageY>chips2T&&ev.pageY<chips2T+chips2H,
			chips3Val = ev.pageX>chips3L&&ev.pageX<chips3L+chips3W&&ev.pageY>chips3T&&ev.pageY<chips3T+chips3H,
			chips4Val = ev.pageX>chips4L&&ev.pageX<chips4L+chips4W&&ev.pageY>chips4T&&ev.pageY<chips4T+chips4H,
			chips5Val = ev.pageX>chips5L&&ev.pageX<chips5L+chips5W&&ev.pageY>chips5T&&ev.pageY<chips5T+chips5H,
			chips6Val = ev.pageX>chips6L&&ev.pageX<chips6L+chips6W&&ev.pageY>chips6T&&ev.pageY<chips6T+chips6H,
			chips7Val = ev.pageX>chips7L&&ev.pageX<chips7L+chips7W&&ev.pageY>chips7T&&ev.pageY<chips7T+chips7H;
		if(bak1Val||bak2Val||bak3Val||bak4Val||bak5Val||bak6Val){
			return false;
		}
		i++;


		if($(".clonep").length=1){
			if(chips1Val||chips2Val||chips3Val||chips4Val||chips5Val||chips6Val||chips7Val){
				$(".clonep").remove()
			}
		}
		if($(".clonep").length<1){
			if(chips1Val){
				var para=document.createElement("p")
				$(".touchArea").append(para);
				$(para).addClass("clone"+i+" clone"+" clonep")
				$(para).html($(".chips1").html())
				$(".clone").css("opacity",0)
				// $(this).hide()
			}	
		}
		// }
		if($(".clonep").length<1){
			if(chips2Val){
				var para1=document.createElement("p")
				$(".touchArea").append(para1);
				$(para1).addClass("clones0"+i+" clones"+" clonep")
				$(para1).html($(".chips2").html())
				$(".clones").css("opacity",0)
				// $(this).hide()
			}
		}
		if($(".clonep").length<1){
			if(chips3Val){
				var para2=document.createElement("p")
				$(".touchArea").append(para2);
				$(para2).addClass("clones1"+i+" clones1"+" clonep")
				$(para2).html($(".chips3").html())
				$(".clones1").css("opacity",0)
				// $(this).hide()
			}
		}
		if($(".clonep").length<1){
			if(chips4Val){
				var para3=document.createElement("p")
				$(".touchArea").append(para3);
				$(para3).addClass("clones2"+i+" clones2"+" clonep")
				$(para3).html($(".chips4").html())
				$(".clones2").css("opacity",0)
			}
		}
		if($(".clonep").length<1){
			if(chips5Val){
				var para4=document.createElement("p")
				$(".touchArea").append(para4);
				$(para4).addClass("clones3"+i+" clones3"+" clonep")
				$(para4).html($(".chips5").html())
				$(".clones3").css("opacity",0)
			}
		}
		if($(".clonep").length<1){
			if(chips6Val){
				var para5=document.createElement("p")
				$(".touchArea").append(para5);
				$(para5).addClass("clones4"+i+" clones4"+" clonep")
				$(para5).html($(".chips6").html())
				$(".clones4").css("opacity",0)
			}
		}
		if($(".clonep").length<1){
			if(chips7Val){
				var para6=document.createElement("p")
				$(".touchArea").append(para6);
				$(para6).addClass("clones5"+i+" clones5"+" clonep")
				$(para6).html($(".chips7").html())
				$(".clones5").css("opacity",0)
			}
		}

		$(document).mousemove(function(ev){
			if($(".shiwan").css("display")=="none"){
				console.log(1111)
				if($(".clonep").length<2){
					if(ev.pageX>kL+hW/2&&ev.pageX<kL+kW-hW/2&&ev.pageY>kT+hH/4&&ev.pageY<kT+kH+30){
						$('.clone'+i).css({'left':ev.pageX-kL-chips1W/2,'opacity':1});
						$('.clone'+i).css({'top':ev.pageY - kT-chips1H/2,'opacity':1});
						$('.clones0'+i).css({'left':ev.pageX -kL-chips2W/2,'opacity':1});
						$('.clones0'+i).css({'top':ev.pageY - kT-chips2H/2,'opacity':1});
						$('.clones1'+i).css({'left':ev.pageX -kL-chips3W/2,'opacity':1});
						$('.clones1'+i).css({'top':ev.pageY - kT-chips3H/2,'opacity':1});
						$('.clones2'+i).css({'left':ev.pageX -kL-chips4W/2,'opacity':1});
						$('.clones2'+i).css({'top':ev.pageY - kT-chips4H/2,'opacity':1});
						$('.clones3'+i).css({'left':ev.pageX -kL-chips5W/2,'opacity':1});
						$('.clones3'+i).css({'top':ev.pageY - kT-chips5H/2,'opacity':1});
						$('.clones4'+i).css({'left':ev.pageX -kL-chips6W/2,'opacity':1});
						$('.clones4'+i).css({'top':ev.pageY - kT-chips6H/2,'opacity':1});
						$('.clones5'+i).css({'left':ev.pageX -kL-chips7W/2,'opacity':1});
						$('.clones5'+i).css({'top':ev.pageY - kT-chips7H/2,'opacity':1});
					}
					// if()
				}
				
				if(ev.pageX>bk1L&&ev.pageX<bk1L+bk1W&&ev.pageY>bk1T&&ev.pageY<bk1T+bk1H){
				    $(".bk1").addClass("bk1hover bkhover")
				}else{
					$(".bk1").removeClass("bk1hover bkhover")
				}

				if(ev.pageX>bk2L&&ev.pageX<bk2L+bk2W&&ev.pageY>bk2T&&ev.pageY<bk2T+bk2H){
					$(".bk2").addClass("bk2hover bkhover")
				}else{
					$(".bk2").removeClass("bk2hover bkhover")
				}
				if(ev.pageX>bk3L&&ev.pageX<bk3L+bk3W&&ev.pageY>bk3T&&ev.pageY<bk3T+bk3H){
					$(".bk3").addClass("bk3hover bkhover")
				}else{
					$(".bk3").removeClass("bk3hover bkhover")
				}
				if(ev.pageX>bk4L&&ev.pageX<bk4L+bk4W&&ev.pageY>bk4T&&ev.pageY<bk4T+bk4H){
					$(".bk4").addClass("bk4hover bkhover")
				}else{
					$(".bk4").removeClass("bk4hover bkhover")
				}
				if(ev.pageX>bk5L&&ev.pageX<bk5L+bk5W&&ev.pageY>bk5T&&ev.pageY<bk5T+bk5H){
					$(".bk5").addClass("bk5hover bkhover")
				}else{
					$(".bk5").removeClass("bk5hover bkhover")
				}
				if(ev.pageX>bk6L&&ev.pageX<bk6L+bk6W&&ev.pageY>bk6T&&ev.pageY<bk6T+bk6H){
					$(".bk6").addClass("bk6hover bkhover")
				}else{
					$(".bk6").removeClass("bk6hover bkhover")
				}

			}else{
				
				return false;
			}


		});
		$(document).mouseup(function(ev){
			if($(".shiwan").css("display")=="none"){
				var bak1Val = ev.pageX>bk1L&&ev.pageX<bk1L+bk1W&&ev.pageY>bk1T&&ev.pageY<bk1T+bk1H,
					bak2Val = ev.pageX>bk2L&&ev.pageX<bk2L+bk2W&&ev.pageY>bk2T&&ev.pageY<bk2T+bk2H,
					bak3Val = ev.pageX>bk3L&&ev.pageX<bk3L+bk3W&&ev.pageY>bk3T&&ev.pageY<bk3T+bk3H,
					bak4Val = ev.pageX>bk4L&&ev.pageX<bk4L+bk4W&&ev.pageY>bk4T&&ev.pageY<bk4T+bk4H,
					bak5Val = ev.pageX>bk5L&&ev.pageX<bk5L+bk5W&&ev.pageY>bk5T&&ev.pageY<bk5T+bk5H,
					bak6Val = ev.pageX>bk6L&&ev.pageX<bk6L+bk6W&&ev.pageY>bk6T&&ev.pageY<bk6T+bk6H;
				var bak1CenterL = bk1W/2-chips1W/2-40,
					bak1CenterT = bk1H/2-chips1H/2;
				var bak2CenterL = bk1W+bk2W/2-chips1W/2-60,
					bak2CenterT = bk1H/2-chips1H/2;
				var bak3CenterL = bk1W+bk2W+bk3W/2-chips1W/2-60,
				    bak3CenterT = bk1H/2-chips1H/2;
				var bak4CenterL = bk1W/2-chips1W/2-40,
					bak4CenterT = bk1H+bk4H/2-chips1H/2;
				var bak5CenterL = bk1W+bk2W/2-chips1W/2-40,
					bak5CenterT = bk1H+bk4H/2-chips1H/2;
				var bak6CenterL = bk1W+bk2W+bk3W/2-chips1W/2-40,
					bak6CenterT = bk1H+bk4H/2-chips1H/2;
				var leftp = $(".clonep").css('left')

				if(bak1Val){
					$(".clonep").css({"left":bak1CenterL,"top":bak1CenterT})
				}
				if(bak2Val){
					$(".clonep").css({"left":bak2CenterL,"top":bak2CenterT})
				}
				if(bak3Val){
					$(".clonep").css({"left":bak3CenterL,"top":bak3CenterT})
				}
				if(bak4Val){
					$(".clonep").css({"left":bak4CenterL,"top":bak4CenterT})
				}
				if(bak5Val){
					$(".clonep").css({"left":bak5CenterL,"top":bak5CenterT})
				}
				if(bak6Val){
					$(".clonep").css({"left":bak6CenterL,"top":bak6CenterT})
				}
				$(document).off()
				$(".livepob").show();
				$(".hand").css("z-index","15")
				$(".confirmBet").on("click",function(){
					var bet;
					if($(".bk1").hasClass("bkhover")||$(".bk2").hasClass("bkhover")||$(".bk3").hasClass("bkhover")){
						bet=1
					}else{
						bet=2
					}
					$(document).off()
					var GetpokerModel = Backbone.Model.extend();
					var NewGetpoker = new GetpokerModel({
						bet:bet
					});
					NewGetpoker.save(null,{
						url:RootUrl+"/?d=api&c=baccarat&m=trybaccarat",
						error:function(){
							console.log("获取扑克失败")
						},
						success:function(model,xhr){
							console.log(xhr.data)
							$(".player1").find(".fan").find("img").attr("src","http://10.10.2.108:12345/uedfile/dist/static/images/porker.cards.hx_"+xhr.data[0]+".png")
							$(".banker1").find(".fan").find("img").attr("src","http://10.10.2.108:12345/uedfile/dist/static/images/porker.cards.hx_"+xhr.data[1]+".png")
							$(".player2").find(".fan").find("img").attr("src","http://10.10.2.108:12345/uedfile/dist/static/images/porker.cards.hx_"+xhr.data[2]+".png")
							$(".banker2").find(".fan").find("img").attr("src","http://10.10.2.108:12345/uedfile/dist/static/images/porker.cards.hx_"+xhr.data[3]+".png")
						}
					})
					$(".gamemask").hide();
					$(".livepob").hide();
					goAuto();				
					auto();
					licensing();
					setTimeout(function(){
						callBack()
					},5000)
				})
				$(".rebate").on("click",function(){
					$(".gamemask").hide();
					$(".livepob").hide();
					$(".bk").removeClass("bk1hover bkhover bk2hover bk3hover bk4hover bk5hover bk6hover")
					$(".bk").css("background","none")
					$(".clonep").remove()
					doMove()
				})
				doMove()
			}else{
				return false;
			}
		});
		return false;
	})
	function goAuto(){
		var time = 0
		var timer=setInterval(function(){
			time++
			auto()
			if(time == 3){
			clearInterval(timer)
			}
		},1000)
	}
	
	function auto(){
		$(".jia").animate({
			right:"116px",
			top:"116px"
		},500,function(){
			$(".jia").animate({
				right:"113px",
				top:"113px"
			},500) 
		})
	}
	function licensing(callBack){
		$(".player1").animate({
			right:"702px",
			top:"65px",
			opacity:1
		},1000,function(){
			$(".player1").css("transform","rotate(0deg)")
			$(".player1 .zheng").addClass("on")
			$(".player1 .fan").addClass("in").css("z-index","3")
			$(".banker1").animate({
				right:"510px",
				top:"65px",
				opacity:1
			},1000,function(){
				$(".banker1").css("transform","rotate(0deg)")
				$(".banker1 .zheng").addClass("on")
				$(".banker1 .fan").addClass("in").css("z-index","3")
				$(".player2").animate({
					right:"632px",
					top:"65px",
					opacity:1
				},1000,function(){
					$(".player2").css("transform","rotate(0deg)")
					$(".player2 .zheng").addClass("on")
					$(".player2 .fan").addClass("in").css("z-index","3")
					$(".banker2").animate({
						right:"440px",
						top:"65px",
						opacity:1
					},1000,function(){
						$(".banker2").css("transform","rotate(0deg)")
						$(".banker2 .zheng").addClass("on")
						$(".banker2 .fan").addClass("in").css("z-index","3")
					})
				})
			})
		})
	}
	var callBack = function(){
		$(".gamemask").show();
		$(".successGame").show(); 
	}
	$(".gamemask").mousemove(function(){
		$(document).off()
	})
	$(".oneMore").on("click",function(){
		$(".gamemask").hide();
		$(".successGame").hide();
		$(".clonep").remove();
		$(".bk").removeClass("bk1hover bkhover bk2hover bk3hover bk4hover bk5hover bk6hover")
		$(".card").css({"right":"114px","top":"87px","transform":"rotate(-60deg)","opacity":0})
		$(".zheng").removeClass("on")
		$(".zheng").css("z-index","2")
		$(".fan").css("z-index","1")
		$(".fan").removeClass("in")
		$(".tips").show()
		setTimeout(function(){
			$(".tips").hide()
		},2000)
		doMove()
	})

	var picWidth = -(parseFloat($(".playGame").find("li").css('width')));
	var leftVal =  parseFloat($(".playGame").css('left'));
	var aLi = $(".playGame").find("li")
		function gotoNext(){
			i++
			if(i==1){
				$(".playGame").animate({
					left:leftVal+picWidth+'px'
				})
			}
			if(i==2){
				$(".playGame").animate({
					left:leftVal+picWidth*2+'px'
				})
			}
			if(i==3){
				$(".playGame").animate({
					left:leftVal+picWidth*3+'px'
				})
				
			}
			if(i==4){
				$(".playGame").animate({
					left:leftVal
				},0)
				i=0
			}
		}
		function gotopre(){
			i++
			if(i==1){
				$(".playGame").animate({
					left:leftVal+picWidth*3+'px'
				})
				
			}
			if(i==2){
				$(".playGame").animate({
					left:leftVal+picWidth*2+'px'
				})
			}
			if(i==3){
				$(".playGame").animate({
					left:leftVal+picWidth+'px'
				})
			}
			if(i==4){
				$(".playGame").animate({
					left:leftVal
				},0)
				i=0
			}
		}
	//底部banner 		
		var bottomtimer
		bottomAuto()
		function bottomAuto(){
			clearInterval(bottomtimer)
			bottomtimer = setInterval(function(){
				gotoNext()
			},4000)
		}
		$(".playGame").hover(function(){
			clearInterval(bottomtimer)
		},function(){
			bottomAuto()
		})
		$(".rightArrow").on("click",function(){
			clearInterval(bottomtimer)
			gotoNext()
		})
		$(".leftArrow").on("click",function(){
			clearInterval(bottomtimer)
			gotopre()
		})
		$(".shiwan").on("click",function(){
			$(".gamemask").hide();
			$(".shiwan").hide();
			doMove()
		})
		$(".playing").on("click",function(){
			$(".successGame").hide()
			$(".gamemask").show(500);
			$(".goPlay").show(500)
		})
		var scroll_offset = $(".main_inner").offset(); 
		$("body,html").animate({
			scrollTop:scroll_offset.top
		},1000)
**/
	$(".navbar-nav").find("li").eq(2).addClass("activenav").siblings().removeClass("activenav")
	$(".shiwan").on("click",function(){
		$(this).hide()
		$(".goPlay").show("slow")
		$(".gamemask").show()
	})
})		