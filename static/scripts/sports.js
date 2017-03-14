$(function() {
	document.getElementById('sportFrame').contentWindow.location.replace(RootUrl+"/?d=api&c=game&m=entergame&pid=29&gametype=3")
	$("body").addClass("sports-page")

	$(".navbar-nav").find("li").eq(2).addClass("activenav").siblings().removeClass("activenav")
	var dateTimeFromat = "";

	function maintainCheck() {
		var newTime = $("._user_time").attr("time");
		$("._vr_mt_check").each(function() {
			if ($(this).hasClass("jumpOver")) {
				return;
			}
			var startTime = $(this).attr("starttime");
			var endTime = $(this).attr("endtime");
			var sVal = parseInt(startTime);
			var eVal = parseInt(endTime);
			var apiId = $(this).data("api");
			var gameName = $(this).data("gameName");
			var gameCode = $(this).data("gameCode");
			var dropdown = $(this).data("mtIc");
			if (sVal < newTime && eVal > newTime) {
				handleMt($(this));
				if (!$(this).hasClass("_vr_mt_no")) {
					$(this).attr("onclick", "maintainInfo(" + startTime + "," + endTime + "," + apiId + ",'" + gameName + "')");
				}
				dateTimeFromat = data.dateTimeFromat;
				$("._user_time").text(timezoneTran + " " + data.dateTime);
				$("._user_time").attr("time", data.time);
				$("._user_time").css("display", "inline");
				sessionStorage.setItem("timezone", data.timezone);
				if (userTimeTimerId) {
					window.clearInterval(userTimeTimerId);
				}
				userTimeTimerId = window.setInterval(function() {
					changeTimeTimer();
				}, 1000);
			}
		});
	}

	function changeTimeTimer() {
		var $userTime = $("._user_time");
		if (dateTimeFromat && $userTime.attr("time")) {
			var date = new Date();
			date.setTime(parseInt($userTime.attr("time")) + 1000);
			$userTime.attr("time", date.getTime());
			var theMoment = moment(date);
			theMoment.utcOffset(sessionStorage.getItem("timezone"), false);
			$userTime.text(timezoneTran + " " + theMoment.format(dateTimeFromat));
		}
	}
})