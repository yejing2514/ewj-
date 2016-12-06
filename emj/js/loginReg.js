(function() {

	$(function() {
		/*用户注册用户名验证*/
		$('.regName').on('input', function() {
				var regExp = /^[a-zA-Z\_][\w]+$/g;
				var regNameValue = $(this).val()
				if(regExp.test(regNameValue)) {
					if(regNameValue.length < 6 || regNameValue.length > 20) {
						$(this).siblings('.tips').show()
						$(this).siblings('.tips').html("请确认您输入的用户名在4-20字符");

					} else {
						$(this).siblings('.tips').hide()

					}

				} else {
					if(regNameValue.length == 0) {

						$(this).siblings('.tips').show()
						$(this).siblings('.tips').html("请输入您的用户名");

					} else {

						$(this).siblings('.tips').show()
						$(this).siblings('.tips').html("用户名只能输入数字、字母、减号和下划线，并且必须字母开头");
					}

				}

			})
			/*手机号码验证*/

		$('.regPhone').on('input', function() {
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var regPhoneValue = $(this).val()
			if(!myreg.test(regPhoneValue)) {
				if(regPhoneValue.length == 0) {

					$(this).siblings('.tips').show()
					$(this).siblings('.tips').html("请填写您的手机号码");
				} else {

					$(this).siblings('.tips').show()
					$(this).siblings('.tips').html("请正确填写您的手机号码");
				}

			} else {
				$(this).siblings('.tips').hide()

			}

		})

		/*验证码随机生成*/

		$.ajax({
			url: "json/pin.json",
		}).done(function(data) {
			var pinRandom = parseInt(Math.random() * (data.pinPic.length + 1))
			$('#flushCode').siblings('img').attr({
				'src': data.pinPic[pinRandom],
				'sid': data.pinNum[pinRandom],

			})
			$('#flushCode').on('click', function() {
				pinRandom = parseInt(Math.random() * (data.pinPic.length + 1))
				$('#flushCode').siblings('img').attr({
					'src': data.pinPic[pinRandom],
					'sid': data.pinNum[pinRandom],

				})

			})

		});

		/*验证码验证*/
		$('.pin1').on('change', function() {
			var pin1Value = $(this).val()

			if(pin1Value == $(this).siblings('img').attr('sid')) {
				$(this).siblings('.tips').hide()

			} else {

				$(this).siblings('.tips').show()
				$(this).siblings('.tips').html('验证码不正确')
			}

		})

		/*短信验证*/
		$('.pin2').on('change', function() {
				var pin2Value = $(this).val()

				if(pin2Value.length != 0) {
					$(this).siblings('.tips').hide()

				} else {

					$(this).siblings('.tips').show()
					$(this).siblings('.tips').html('手机验证码为空不正确')
				}

			})
			/*密码验证*/
		$('.regpassword').on('input', function() {
			var regpasswordValue = $(this).val()
			var passExp = /^[a-z0-9_-]{6,20}$/
			if(!passExp.test(regpasswordValue)) {

				if(regpasswordValue.length == 0) {
					$(this).siblings('.tips').show()
					$(this).siblings('.tips').html('密码不能为空')

				} else {

					$(this).siblings('.tips').show()
					$(this).siblings('.tips').html('对不起，请检查您的输入。密码设置支持6-20位字母、符号或数字，密码区分大小写')

				}

			} else {
				$(this).siblings('.tips').hide()

			}

		})
	})

	/*密码重复验证*/
	$('.againpassword').on('change', function() {
		if($(this).val() != $('.regpassword').val()) {
			$(this).siblings('.tips').show()
			$(this).siblings('.tips').html('对不起，请检查您的输入。密码输入不一致')

		} else {
			$(this).siblings('.tips').hide()

		}

	})
	
	

	/*提交cookie验证*/
	$('.RegSignInBtn').on('click', function() {
		var mimaValue = $('.regpassword').val();
		var md5mima = hex_md5(mimaValue)
		var duozhang = $('.regName').val();
		var arr=[]
		if($('.form_group').find('.tips').css('display') == "none") {
			if($('.form_group').find('input').val().length==0){
				
			alert('不能为空请检查输入')
			return false;
				
			}else{
				
				if(cookieMy.getCookie('usermore') == undefined) {
				arr.push(duozhang, md5mima);
				cookieMy.addCookie('usermore', arr.toString(),7);
				window.location='login.html'

			} else {
				arr = cookieMy.getCookie("usermore").split(',');
				if(cookieMy.arrsearch(duozhang, arr)) {

					alert('账号已存在')

				} else {
					window.location='login.html'
					arr.push(duozhang, md5mima);
					cookieMy.addCookie('usermore', arr.toString(), 7);
					

				}

			}
			}
			

		} else {
			alert('信息未正确填写请重新检查填写')
			return false;
		}

	})
	
	/*登录验证*/
	$('.SignInBtn').click(function(){
		var loginMimavalue =$('.userPassword').val()
		var loginMimamd5 = hex_md5(loginMimavalue)
		var loginZhang = $('.username').val()
			

			
	
				if($('.form_group').find('input').val().length==0){
					
					alert('请输入账号密码')
					
				}else{
					
					if(cookieMy.getCookie('usermore') == undefined) {
						alert('没有数据请先注册')
					

				} else {
					var shuzu = cookieMy.getCookie('usermore').split(',')
					if(cookieMy.arrsearch(loginZhang, shuzu)) {
						var index = cookieMy.arrsearchXia(loginZhang, shuzu);
						if(loginMimamd5 != shuzu[index + 1]) {
							$(this).parents('#loginForm').find('.form_group').eq(1).find('.userPassword').val('')
							$(this).parents('#loginForm').find('.form_group').eq(1).find('.tips').show()

						} else {
							if($(this).parents('#loginForm').find('.form_group').eq(2).find('.tips').css('display')=="none"){
								cookieMy.addCookie('zhanghao1', loginZhang, 7)
								cookieMy.addCookie('mima1', loginMimamd5, 7);
								window.location = 'index.html';
								
							}
							

						}

					} else {
						$(this).parents('#loginForm').find('.form_group').eq(0).find('.tips').show()
						$(this).parents('#loginForm').find('.form_group').eq(1).find('.userPassword').val('')

					}

				}
					
					
				}
				
	})
	
		$('.username').on('change',function(){
		
			if($(this).val().length==0){
				$(this).siblings('.tips').show()
				
			}else{
				$(this).siblings('.tips').hide()
				
			}
		
	})
		
		$('.userPassword').on('change',function(){
		
			if($(this).val().length==0){
				$(this).siblings('.tips').show()
				
			}else{
				$(this).siblings('.tips').hide()
				
			}
		
	})
		
		/*验证码验证2*/
		$('.pin').on('change', function() {
			var pinValue = $(this).val()

			if(pinValue == $(this).siblings('img').attr('sid')) {
				$(this).siblings('.tips').hide()

			} else {

				$(this).siblings('.tips').show()
				$(this).siblings('.tips').html('验证码不正确')
			}

		})


})();