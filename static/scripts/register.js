$(function(){
	var usernameVal = new RegExp("^[a-z0-9]{6,10}$");
	var passwordVal = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$");
	if(getCookie("ci_session")){
		goHome()
	}else{

	}
	getCaptcha()
	$("._vr_captcha_code").click(function(){
		getCaptcha()
	})
	function getCaptcha(){
		var captchaModel = Backbone.Model.extend();
		var newCaptcha = new captchaModel();
		newCaptcha.fetch({
			url: RootUrl+"/?d=api&c=captcha&m=index",
			error:function (model, xhr){
	        },
	        success:function (model, xhr){
	        	$("._vr_captcha_code").attr("src","http://"+xhr.data.captcha.img)
	        }
		})
	}
	$(".registerBtn").on("click",function(event){
		if($(".username").val()==""){
			$(".username").parent().removeClass("has-success").addClass("has-error");
			$(".username").siblings(".error").html("请输入用户名")
		}else if($(".password").val()==""){
			$(".password").parent().removeClass("has-success").addClass("has-error");
			$(".password").siblings(".error").html("请输入密码")
		}else if($(".passwordcheck").val()==""){
			$(".passwordcheck").parent().removeClass("has-success").addClass("has-error");
			$(".passwordcheck").siblings(".error").html("请确认密码")
		}else if($(".captcha").val()==""){
			$(".captcha").parent().removeClass("has-success").addClass("has-error");
			$(".yanzheng").find(".error").html("请输入验证码")
		}else{
			var register=event.currentTarget
			var registerModel = Backbone.Model.extend({
				parse: function (resp, xhr) {
	                return resp.data.data;
	            },
				defaults: {
					pid:'',
		            password:'',
		            username:'',
		            passwordcheck:'',
		            captcha:''
		        }
			});
			var newRegister = new registerModel({
				'pid': $(".pid").val(),
				'passwordcheck': $(".passwordcheck").val(),
				'password': $(".password").val(),
				'username': $(".username").val(),
				'captcha': $(".captcha").val()
			});
			// newRegister.set("pid",$(".pid").val())
			// newRegister.set("passwordcheck",$(".passwordcheck").val())
			// newRegister.set("password",$(".password").val())
			// newRegister.set("username",$(".username").val())
			// newRegister.set("captcha",$(".captcha").val())

			newRegister.save(null,{
				type:"POST",
				url: RootUrl+"/?d=api&c=user&m=register",
				error:function (model, xhr){
		        },
		        success:function (model, xhr){
		        	$(".success").show();
	    			$(".mask").show();
	    			$(".success").find("dd").html(xhr.data.msg)
		        	if(xhr.status==1){
		    			setCookie("ci_session",xhr.data.user.session_id)
		    			setCookie("username",xhr.data.user.username)
		    			$(".success").find("dt").removeClass("failed")
		    			$(".loginsure").on("click",function(){
							window.location.href=indexUrl+views+"successRegistration.html"
						})
		        	}else{
		        		$(".success").find("dt").addClass("failed")
		        		$(".loginsure").on("click",function(){
							// window.location.reload()
						})
		        	}
	    			
		        }
			})
		}
	})
	var PASSWORD_LEVEL_1 = new RegExp("^[a-zA-Z]+$");
	var PASSWORD_LEVEL_2 = new RegExp("^[0-9]+$");
	var PASSWORD_LEVEL_3 = new RegExp("^[0-9a-zA-Z]+$");
	var PASSWORD_LEVEL_4 = new RegExp("^[A-Za-z0-9~!@#$%^&*()_+\\{\\}\\[\\]|\\:;\'\"<>,./?]+$");
	$('.noCp').bind("cut copy paste", function(e) {
		e.preventDefault();
	});
	$("[name='sysUser.password']").on("keyup", function() {
		setTimeout(changePassowrdLevel, $.validator.defaults.keypressDelay + 500)
	});

	$("[name='sysUser.username']").on('blur',function(){
		if($(this).val()==""){
			$(this).parent().removeClass("has-success").addClass("has-error");
			$(this).parents(".form-group").removeClass("has-success").addClass("has-error");
			$(this).siblings(".error").html("用户名不能为空")
			return false
		}
		if(!usernameVal.test($(this).val())){
			$(this).parent().removeClass("has-success").addClass("has-error");
			$(this).parents(".form-group").removeClass("has-success").addClass("has-error");
			$(this).siblings(".error").html("用户名格式不正确");
			return false;
		}else{
			$(this).parent().removeClass("has-error").addClass("has-success");
			$(this).parents(".form-group").removeClass("has-error").addClass("has-success");
			$(this).siblings(".error").html("");
			return false;
		}
	})
	$("[name='sysUser.password']").on('blur',function(){
		console.log(passwordVal.test($(this).val()))
		if($(this).val()==""){
			$(this).parent().removeClass("has-success").addClass("has-error");
			$(this).parents(".form-group").removeClass("has-success").addClass("has-error");
			$(this).siblings(".error").html("密码不能为空")
			return false
		}
		if(!passwordVal.test($(this).val())){
			$(this).parent().removeClass("has-success").addClass("has-error");
			$(this).parents(".form-group").removeClass("has-success").addClass("has-error");
			$(this).siblings(".error").html("密码格式不正确");
			return false;
		}else{
			$(this).parent().removeClass("has-error").addClass("has-success");
			$(this).parents(".form-group").removeClass("has-error").addClass("has-success");
			$(this).siblings(".error").html("");
			return false;
		}
	})
	
	$("[name='confirmPassword']").on("blur", function() {
		var pwdObj = $("[name='sysUser.password']");
		if ($(this).val() == $(pwdObj).val()) {
			$(this).parent().removeClass("has-error").addClass("has-success");
			$(this).parents(".form-group").removeClass("has-error").addClass("has-success");
			$(this).siblings(".error").html("");
			return false;		
		} else {
			if($(this).val()==""){
				$(this).parent().removeClass("has-success").addClass("has-error");
				$(this).parents(".form-group").removeClass("has-success").addClass("has-error");
				$(this).siblings(".error").html("请确认密码");
			}
			$(this).parent().removeClass("has-success").addClass("has-error");
			$(this).parents(".form-group").removeClass("has-success").addClass("has-error");
			$(this).siblings(".error").html("两次输入密码不一致");
			return false;
		}
	});
	function changePassowrdLevel() {
		var $this = $("[name='sysUser.password']");
		var $parent = $this.parents(".form-group");
		var level = 0;
		var value = $this.val();
		if (!$parent.hasClass("has-error")) {
			if (PASSWORD_LEVEL_1.test(value) || PASSWORD_LEVEL_2.test(value)) {
				level = 1;
			} else if (PASSWORD_LEVEL_3.test(value)) {
				level = 2;
			} else if (PASSWORD_LEVEL_4.test(value)) {
				level = 3;
			}
			$("[name='sysUser.passwordLevel']").val(level * 10);
		}
		$("._password_level", $parent).find('[password-level]').hide().eq(level).show();
	}
})

