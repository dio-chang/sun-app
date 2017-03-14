$(function() {
	$(".navbar-nav").find("li").eq(7).addClass("activenav").siblings().removeClass("activenav")
	$("div [data-code=content] ._vr_promo_join").remove();
	$(".sidePromo dd").fadeOut(0);
	$(".sidePromo dt").click(function() {
		$(".sidePromo dd").not($(this).next()).slideUp('fast');
		$(this).next().slideToggle(400);
	});
	$(".getMyRankActivity").on("click", function() {
		getMyRankActivity();
		if (sessionStorage.is_login == "true") {
			$(this).parent().hide();
		}
	});
	$(".changeType").change(function(e) {
		var val = $(e.target).val();
		var type = $(e.target).data("type");
		var commonSelector = "._vr_promo_check[data-type^='" + type + "']";
		var typeSelector = "." + val + "[data-type^='" + type + "']";
		if (val == "_all_") {
			$(commonSelector).show();
		} else {
			$(commonSelector).hide();
			$(typeSelector).show();
		}
	});
	// promoCheck();
	if (sessionStorage.is_login == "true") {
		changeApplyStatus();
	}
});

function promoCheck() {
	var nowTime = $("._user_time").attr("time");
	$("._vr_promo_check").each(function() {
		var $this = $(this);
		var st = $this.find("._vr_promo_ostart").val();
		var et = $this.find("._vr_promo_oend").val();
		var sTime = moment(Number(st)).utcOffset(sessionStorage.getItem("timezone"));
		var eTime = moment(Number(et)).utcOffset(sessionStorage.getItem("timezone"));
		$this.find("._vr_promo_start").each(function() {
			$(this).text(sTime.format($(this).data("format")));
		})
		$this.find("._vr_promo_end").each(function() {
			$(this).text(eTime.format($(this).data("format")));
		})
		if (nowTime < sTime) {
			$this.find("._vr_promo_processing").hide();
			$this.find("._vr_promo_nostart").show();
			$this.find("._vr_promo_over").hide();
			$this.find("._vr_promo_join").text("未开始");
		} else if (nowTime > sTime && nowTime < eTime) {
			$this.find("._vr_promo_processing").show();
			$this.find("._vr_promo_nostart").hide();
			$this.find("._vr_promo_over").hide();
			$this.find("._vr_promo_join").text("立即加入");
			var endTimeVal = new Date(parseInt(et));
			$this.find("._vr_promo_countdown").ccountdown(endTimeVal.getFullYear(), endTimeVal.getMonth() + 1, endTimeVal.getDate(), endTimeVal.getHours() + ':' + endTimeVal.getSeconds());
		} else if (nowTime > eTime) {
			$this.attr("data-type", "over");
			$this.find("._vr_promo_over").show();
			$this.find("._vr_promo_processing").hide();
			$this.find("._vr_promo_nostart").hide();
			if (typeof $this.find("._vr_promo_join").attr("join-over-hide") != "undefined") {
				$this.find("_vr_promo_join").hide();
			}
			var oldClass = $this.find("._vr_promo_join").data("oldClass");
			var newClass = $this.find("._vr_promo_join").data("newClass");
			$this.find("._vr_promo_join").removeClass(typeof oldClass == "undefined" ? "" : oldClass).addClass(typeof newClass == "undefined" ? "" : newClass).attr("onclick", "").text("已结束");
			$("._vr_promo_overparent").append($this);
		}
	})
}

function getMyRankActivity() {
	if (sessionStorage.is_login == "true") {
		$(".notfit").each(function(i, btn) {
			$(btn).parents("._vr_promo_check").hide();
		});
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	} else {
		loginObj.getLoginPopup(function(bol) {
			if (sessionStorage.is_login == "true") {
				window.location.href = "/promo.html";
			}
		});
	}
}

function changeApplyStatus() {
	var backwaterObj = $("._vr_promo_join").parents("._vr_promo_check[data-code^='back_water'][data-type='processing']");
	backwaterObj.each(function(i, obj) {
		$(obj).find("._vr_promo_join").text("参与中");
	});
	$.ajax({
		url: "/ntl/activity/getPlayerActivityIds.html",
		type: "POST",
		dataType: "json",
		success: function(data) {
			filterActyByPlayer(data);
		}
	});
}

function filterActyByPlayer(data) {
	var rankActvyObj = $("._vr_promo_check[data-rank-id][data-type='processing']");
	rankActvyObj.each(function(j, actObj) {
		var startTimeObj = $(actObj).find("._vr_promo_ostart");
		var flag = new Date(parseInt(startTimeObj.val())) < new Date();
		var oldClass = $(actObj).find("._vr_promo_join").data("oldClass");
		oldClass = typeof oldClass == "undefined" ? "" : oldClass;
		var newClass = $(actObj).find("._vr_promo_join").data("newClass");
		newClass = typeof newClass == "undefined" ? "" : newClass;
		if (($(actObj).data("code") == "first_deposit" || $(actObj).data("code") == "deposit_send") && flag) {
			if (data.length < 1) {
				if ($(actObj).data("rankId") === "all") {
					$(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled").text("存款时申请");
				} else {
					$(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未满足条件");
				}
			} else {
				var isContain = false;
				for (var j = 0; j < data.length; j++) {
					if ($(actObj).data("searchid") === data[j]) {
						isContain = true;
					}
				}
				if (isContain || $(actObj).data("rankId") === "all") {
					$(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled").text("存款时申请");
				} else {
					$(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未满足条件");
				}
			}
		}
		if ($(actObj).data("code") == "regist_send" || $(actObj).data("code") == "relief_fund" || $(actObj).data("code") == "profit_loss" || $(actObj).data("code") == "effective_transaction") {
			if (data.length < 1) {
				if ($(actObj).data("rankId") != "all" && flag) {
					$(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未满足条件");
				}
			}
			if (data.length > 0 && $(actObj).data("rankId") != "all" && flag) {
				var isContain = false;
				for (var j = 0; j < data.length; j++) {
					if ($(actObj).data("searchid") === data[j]) {
						isContain = true;
					}
				}
				if (!isContain) {
					$(actObj).find("._vr_promo_join").removeClass(oldClass).addClass(newClass + " disabled notfit").text("未满足条件");
				}
			}
		}
	});
}

function joinPromo(aplyObj, isRefresh) {
	$(aplyObj).attr("disabled", "disabled");
	var nowTime = $("._user_time").attr("time");
	if ($(aplyObj).parents("._vr_promo_check").find("._vr_promo_ostart").val() > nowTime || $(aplyObj).parents("._vr_promo_check").find("._vr_promo_oend").val() < nowTime) {
		return false;
	}
	if (sessionStorage.is_login == "true") {
		var code = $(aplyObj).parents("._vr_promo_check").data("code");
		if (code == "back_water" || code == "first_deposit" || code == "deposit_send") {
			if (isRefresh) {
				BootstrapDialog.alert({
					title: "提示",
					type: BootstrapDialog.TYPE_WARNING,
					message: "参与中",
					callback: function() {
						window.location.href = "/promo.html";
					}
				});
			}
			return false;
		} else {
			if (isRefresh) {
				applyActivities(aplyObj, true);
			} else {
				applyActivities(aplyObj);
			}
		}
	} else {
		loginObj.getLoginPopup(function(bol) {
			if (sessionStorage.is_login == "true") {
				joinPromo(aplyObj, true);
			}
		});
	}
}

function applyActivities(aplyObj, isRefresh) {
	var code = $(aplyObj).parents("._vr_promo_check").data("code");
	var searchId = $(aplyObj).parents("._vr_promo_check").data("searchid");
	$.ajax({
		url: "/ntl/activity/applyActivities.html",
		type: "POST",
		dataType: "json",
		data: {
			code: code,
			resultId: searchId
		},
		success: function(data) {
			showWin(data, isRefresh);
			$(aplyObj).removeAttr("disabled")
		}
	})
}

function showWin(data, isRefresh) {
	if (typeof data.state == "undefined") {
		return false;
	}
	if (data.state) {
		$("._fail").hide();
		$("._success").show();
	} else {
		$("._success").hide();
		$("._fail").show();
	}
	$("._msg").html('<p class="text-center">' + data.msg + '</p>');
	var dialog = BootstrapDialog.show({
		type: BootstrapDialog.TYPE_WARNING,
		message: function(dialog) {
			var $content = $(".promoTip").html();
			return $content;
		},
		title: "消息",
		closable: 'true',
		buttons: [{
			label: '好的',
			cssClass: 'btn btn-info',
			action: function(dialogItself) {
				if (isRefresh) {
					dialogItself.close();
					window.location.href = "/promo.html";
				} else {
					dialogItself.close();
				}
			}
		}, {
			label: '查看优惠记录',
			cssClass: 'btn btn-default',
			action: function() {
				window.open('/pcenter/#/preferential/list.html', '_blank');
			}
		}]
	});
}
// $(function() {
// 	var hash = window.location.hash;
// 	if (hash != undefined) {
// 		var id = hash.substr(1);
// 		$("#" + id).find("img").trigger("click");
// 	}
// })
$(".promo-sorts li").each(function() {
	$(this).on("click", "a", function() {
		if (!$(this).parent().hasClass("active")) {
			$(this).parent().siblings().removeClass("active");
			$(this).parent().addClass("active");
			var val = $(this).data("item");
			if (val == "_all_") {
				$(".promo-item").show();
			} else {
				$(".promo-item").hide();
				$("." + val).show();
			}
		}
	})
})
var scrolltop;
var timer;
$(document).scroll(function() {
	scrolltop=$(document).scrollTop()
	if(scrolltop<=100){
		$(".goTop").hide()
	}else{
		$(".goTop").show()
	}
	$(".goTop").click(function(){
		clearInterval(timer)
		timer = setInterval(function(){
			scrolltop=scrolltop-25
			if(scrolltop<=0){
				clearInterval(timer)
			}
			$(document).scrollTop(scrolltop)
		},10)
	})
})
