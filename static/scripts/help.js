$(function(){
	var timezoneTran = "";
    var dateTimeFromat = "";
    var userTimeTimerId;
    $(function() {
        $(".help .active").parents("ul").show().prev().addClass("over");
        $(".help .hp-nav a").click(function() {
            var url = $(this).attr("href");
            if (url == "" || url == "#") {
                $(this).next().toggle();
                $(this).toggleClass("over");
                return false;
            }
        });
        $(window).scroll(function() {
            $hpnav = $(".help .hp-nav");
            if ($(window).scrollTop() > 100) {
                $hpnav.addClass("hp-nav-fixed");
            } else {
                $hpnav.removeClass("hp-nav-fixed");
            }
        });
        openNewPopWindow();
        // userTime();
        changeActive();

    });
    function changeActive(){
        var activeContent = $("a[href='"+location.pathname.split("/")[2]+"']");
        $(activeContent).addClass("active");
        $(activeContent).parents(".nav-2").css("display","block");
        $(activeContent).parents(".nav-3").css("display","block");
        $(activeContent).parents(".li-1").children("a").addClass("over")
        $(activeContent).parents(".li-２").children("a").addClass("over")
    }
    function openNewPopWindow(){
        var width;
        var size ;
        $(".openNewWindow").on("click",function(){
            var url =  $(this).data("url");
            size = typeof ($(this).data("winSize"))!='undefined'?$(this).data("winSize"):"1";
            if (size =="1") width = "960";
            if (size =="2") width = "1100";
            if ($(this).data("random")){
                url = url +"?t="+ new Date().getTime().toString(36)
            }
            window.open(
                    url,
                    "NewWindow",
                    "width="+width+",height=600,top=50,left=50,resizable,scrollbars=yes,status=yes,centerscreen=yes,toolbar=yes"
            );
        })
    }

    /******************** 顶部时间 *******************/
    function userTime(isTranslate){
        $.ajax({
            url:'/index/getUserTimeZoneDate.html',
            dataType:"json",
            async:false,
            success:function(data){
                timezoneTran = data.timezone;
                if(isTranslate!=undefined){
                    timezoneTran = transTimeZone(timezoneTran)
                }
                dateTimeFromat=data.dateTimeFromat;
                $("._user_time").text(timezoneTran + " " + data.dateTime);
                $("._user_time").attr("time",data.time);
                $("._user_time").css("display","inline");
                //agent.html 时区
                sessionStorage.setItem("timezone",data.timezone);
                if(userTimeTimerId) {
                    window.clearInterval(userTimeTimerId);
                }
                userTimeTimerId=window.setInterval(function () {
                    changeTimeTimer();
                },1000);
            }
        });
    }

    function changeTimeTimer(){
        var $userTime =  $("._user_time");
        if(dateTimeFromat && $userTime.attr("time")) {
            var date = new Date();
            date.setTime(parseInt($userTime.attr("time"))+1000);
            $userTime.attr("time",date.getTime());
            var theMoment=moment(date);
            theMoment.utcOffset(sessionStorage.getItem("timezone"),false);
            $userTime.text(timezoneTran + " " + theMoment.format(dateTimeFromat));
        }
    }
})