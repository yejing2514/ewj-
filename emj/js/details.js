/**********************************引入头部尾部********************************/
(function() {

	//引入头部文件
	$.ajax({
		url: "html/head.html",
		async: false,
	}).done(function(data) {
		$('.header').append(data)

	});
	//让tab隐藏
	$('.list').hide()
	$('.title').hover(function() {
		$('.list').show()

	}, function() {

		$('.list').hide()

	})

	$('.list').hover(function() {
		$('.list').show()

	}, function() {

		$('.list').hide()

	})

	//引入尾部文件
	$.ajax({
		url: "html/foot.html",
		async: false,
	}).done(function(data) {
		$('.footing').append(data)

	});

})();
/*************************************分类的tab切换***************************/
(function() {

	var $num = 0;
	$('.list li').hover(function() {
			$num = $(this).index();
			$('.list_detail').eq($num).show().siblings('.list_detail').hide()
			$('.list li').eq($num).children('a').css('color', '#fff')

		}, function() {
			$num = $(this).index();
			$('.list li').eq($num).children('a').css('color', '#000')

			$('.list_detail').each(function(i) {

				$('.list_detail').eq(i).hide();

			})

		})
		//右边内容滑上显示滑出隐藏	
	$('.list_detail').hover(function() {

		$(this).show();
		$('.list').show()

	}, function() {

		$(this).hide();
		$('.list').hide()
	})
	//回到顶部	
	$('.entry03').click(function() {
			$('html,body').stop(true).animate({
				scrollTop: 0

			}, 400)

		})
	

	/*************************************用户名显示******************************/
	if(cookieMy.getCookie('zhanghao1')) {

		$('.navL_o').find('em').html(cookieMy.getCookie('zhanghao1'))

	} else {

		$('.navL_o').find('em').html('您好')
	}

})();
/*************************************放大镜效果******************************/

(function() {
	var midViewList = ['img/itemDetails/yb1.jpg', 'img/itemDetails/yb2.jpg', 'img/itemDetails/yb3.jpg', 'img/itemDetails/yb4.jpg', 'img/itemDetails/yb5.jpg']

	$('.midView').hover(function() {

		$('.winSelector').show();
		$('.bigView').show();

	}, function() {

		$('.winSelector').hide();
		$('.bigView').hide();

	})

	$('.imageMenu li').on('mouseover', function() {

		$('.midView').children('img').attr('src', midViewList[$(this).index()])
		$('.bigView').children('img').attr('src', midViewList[$(this).index()])

	})

	$('.midView').on('mousemove', function(ev) {
			var x = ev.pageX - $(this).offset().left - ($('.winSelector').width() / 2)
			var y = ev.pageY - $(this).offset().top - ($('.winSelector').height() / 2)

			if(x < 0) {
				x = 0

			} else if(x >= $('.midView').width() - $('.winSelector').width()) {

				x = $('.midView').width() - $('.winSelector').width();

			}

			if(y < 0) {
				y = 0

			} else if(y >= $('.midView').height() - $('.winSelector').height()) {

				y = $('.midView').height() - $('.winSelector').height();

			}

			$('.winSelector').css({
				left: x,
				top: y
			})

			var scalex = $('.winSelector').position().left / ($('.midView').width() - $('.winSelector').width())
			var scaley = $('.winSelector').position().top / ($('.midView').height() - $('.winSelector').height())

			$('.bvImg').css({
				left: -scalex * ($('.bvImg').width() - $('.bigView').width()),
				top: -scaley * ($('.bvImg').height() - $('.bigView').height())

			})

		})
		/*************************************下面商品滑动效果******************************/
	var num = 0;
	var cishu = $('.imageMenu li').length - 4
	$('.smallImgUp').click(function() {
		$(".smallImgDown").css('visibility', 'visible')
		num--

		$('.imageMenu ul').stop(true).animate({
			marginLeft: -95 * num + "px"

		}, function() {
			if(num == 0) {
				$(".smallImgUp").css('visibility', 'hidden')
			}

		})

	})

	$('.smallImgDown').click(function() {
		$(".smallImgUp").css('visibility', 'visible')
		num++;
		$('.imageMenu ul').stop(true).animate({
			marginLeft: -95 * num + "px"

		}, function() {

			if(num == cishu) {

				$(".smallImgDown").css('visibility', 'hidden')

			}

		})

	})

	/*************************************下拉菜单******************************/
	$('.region_list').hover(function() {
		$('.region_pop').show()

	}, function() {

		$('.region_pop').hide()

	})

	/*************************************tab切换******************************/
	$('.detail_rightNav a').click(function() {
		$(this).addClass('detailsActive').siblings('a').removeClass('detailsActive')
		$('.tabItem').eq($(this).index()).show().siblings('.tabItem').hide();

	})

	/*************************************出现楼层******************************/

	$(window).scroll(function() {
		var scrolltop = $(this).scrollTop();

		if(scrolltop > 800) {
			$('.cartLayer').fadeIn()

		} else {

			$('.cartLayer').fadeOut();
		}
	})

})();