/**********************************引入头部尾部********************************/
(function() {

	$(function() {
		//引入头部文件
		$.ajax({
			url: "html/head.html",
			async: false,
		}).done(function(data) {
			$('.header').append(data)

		});
		//引入限时抢购界面
		$.ajax({
			url: "html/flashSale.html",
			async: false,
		}).done(function(data) {
			$('.flashSaleG').append(data)

		});

		//引入尖货推荐界面
		$.ajax({
			url: "html/sellGoods.html",
			async: false,
		}).done(function(data) {
			$('.sellGoodsG').append(data)

		});
		
			//引入上新品界面
		$.ajax({
			url: "html/newArrival.html",
			async: false,
		}).done(function(data) {
			$('.newArrivalG').append(data)

		});

		//引入尾部文件
		$.ajax({
			url: "html/foot.html",
			async: false,
		}).done(function(data) {
			$('.footing').append(data)

		});

	})

})();
/*************************************分类的tab切换***************************/
(function() {
	$(function() {
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

		}, function() {

			$(this).hide();
		})

	})

})();
/****************************图片轮播效果**************************************/
(function() {
	$(function() {
		var $num = 0;
		var $bstop = true;
		var $timer = null;
		$.ajax({
			url: "json/banner.json",
		}).done(function(data) {
			function tab() {

				$('.listUl li').eq($num).addClass('listActive').siblings('li').removeClass('listActive')
				$('.banner_picU li').eq($num).children('a').css({
					background: 'url(' + data.bannerPic[$num] + ') no-repeat center 0'

				})

				$('.banner_picU li').eq($num).stop(true).animate({
					'opacity': 1
				}).siblings('li').stop(true).animate({
					'opacity': 0
				})

			}

			$('.banner_list').hover(function() {
				clearInterval($timer)

			}, function() {

				$timer = setInterval(function() {
					$('#rightBtn').click();

				}, 5000)

			})

			$('.listUl li').on('mouseover', function() {
				$num = $(this).index();

				tab();

			})

			$('#rightBtn').on('click', function() {

				$num++;
				if($num > $('.listUl li').length - 1) {

					$num = 0;

				}
				tab();

			})

			$timer = setInterval(function() {
				$('#rightBtn').click();

			}, 5000)

		});

	})

})();
/****************************flashSale倒计时+json文件引入数据********************/
(function() {

	$(function() {
		/*实现边框的淡入淡出效果以及产品的介绍的具体展示*/
		$('.newGoodsList').hover(function() {
			$(this).children('.mask').stop(true).fadeIn()
			$(this).find('.shop_name').stop(true).animate({
				bottom: "25px"

			})
			$(this).find('.intro').stop(true).animate({
				top: "-6px"

			})

		}, function() {

			$(this).children('.mask').stop(true).fadeOut()

			$(this).find('.intro').stop(true).animate({
				top: "26px"

			})
			$(this).find('.shop_name').stop(true).animate({
				bottom: "0px"

			})

		})

		/*倒计时的实现*/
		/*不足10的转换+0*/
		function dou(value) {
			if(value < 10) {
				return '0' + value;
			} else {
				return value;
			}
		}

		function djs() {
			var future = new Date(2016, 11, 25, 00, 00, 00);
			var t = (future - new Date()) / 1000;
			var d = Math.floor(t / 86400);
			var h = Math.floor(t % 86400 / 3600);
			var m = Math.floor(t % 86400 % 3600 / 60);
			$('.numDay1').html(parseInt(dou(d) / 10))
			$('.numDay2').html(parseInt(dou(d) % 10))
			$('.numHour1').html(parseInt(dou(h) / 10))
			$('.numHour2').html(parseInt(dou(h) % 10))
			$('.numMinute1').html(parseInt(dou(m) / 10))
			$('.numMinute2').html(parseInt(dou(m) % 10))

		}

		djs();
		setInterval(djs, 1000);

		$.ajax({
			url: "json/flashSale.json",

		}).done(function(data) {
			/*闪购界面json数据的请求*/
			$('.img_viewP').find('img').each(function(i) {
				$(this).attr('src', data.img_src[i])
				$('.img_country').find('img').eq(i).attr('src', data.img_logo[i])
				$('.img_title').eq(i).html(data.title[i])
				$('.shop_name').children('a').eq(i).html(data.category[i])
				$('.shop_pri').children('span').children('i').eq(i).html(data.price[i])
				$('.shop_pri').children('del').children('i').eq(i).html(data.priceDel[i])
				$('.qcpointStyle').eq(i).html(data.intro[i])

			});

		});

	})

})();

/****************************尖货推荐内容部分son文件引入数据********************/
(function() {

	$(function() {

		$('.newGoods').hover(function() {
			$(this).children('.mask').stop(true).fadeIn()

		}, function() {

			$(this).children('.mask').stop(true).fadeOut()

		})

		$.ajax({
			url: "json/sellGoods.json"
		}).done(function(data) {

			$('.goods_view').children('img').each(function(i) {
				$(this).attr('src', data.img_src[i])
				$('.tag').children('img').eq(i).attr('src', data.tag_logo[i])
				$(this).parents('.newGoods').find('.img_country').children('img').attr('src', data.img_logo[i])
				$(this).parents('.newGoods').find('.img_title').html(data.title[i])
				$(this).parents('.newGoods').find('.shop_name').children('a').html(data.category[i])
				$(this).parents('.newGoods').find('.goods_intro').children('a').html(data.intro[i])
				$(this).parents('.newGoods').find('.goods_price').children('span').children('i').html(data.price[i])
				$(this).parents('.newGoods').find('.goods_price').children('del').children('i').html(data.priceDel[i])
			})

		});

	})

})();
/****************************上新品部分son文件引入数据***************************/
(function() {

	$(function() {

		$('.arrivalGoods').hover(function() {

			$(this).children('.mask').stop(true).fadeIn()

		}, function() {

			$(this).children('.mask').stop(true).fadeOut()

		})
		
		$.ajax({
			url:"json/newArrival.json",
		}).done(function(data){
			
				$('.arrival_view').children('img').each(function(i){
					$(this).attr('src', data.img_src[i])
					$(this).parents('.arrivalGoods').find('.tag').find('img').attr('src',data.tag_logo[i])
					$('.jj_box').find('img').eq(i).attr('src', data.img_logo[i])
					$('.jj_box').find('span').eq(i).html(data.title[i])
					$('.jj_p2').find('a').eq(i).html(data.category[i])
					$('.jj_p3').find('a').eq(i).html(data.intro[i])
					$(this).parents('.arrivalGoods').find('.shop_pri').children('span').children('i').html(data.price[i])
					$(this).parents('.arrivalGoods').find('.shop_pri').children('del').children('i').html(data.priceDel[i])
					
				})
			
			
		});
		
		

	})

})();
/****************************加入购物车按钮的效果********************************/
$(document).on('mouseover','.btn_box',function(){
	
	
	$(this).stop(true).animate({
		backgroundColor: '#e60000'

	}, 500)

	$(this).children('a').stop(true).animate({
		color: '#fff'

	}, 500)
	
	
});

$(document).on('mouseout','.btn_box',function(){
	
	
	$(this).stop(true).animate({
		backgroundColor: '#fff'

	}, 500)
	$(this).children('a').stop(true).animate({
		color: '#e60000'

	}, 500)
	
	
});
/****************************滑下出现固定的搜索框********************************/
(function(){
	
	$(function(){
		
		$(window).scroll(function(){
        var scrolltop=$(this).scrollTop();
  		if(scrolltop>1200){
  			
  			$('.header_body').addClass('header_bodyFixed')
  			$('.logo').hide();
  			$('.headerCart').hide()
  			$('.headerSearchHotkey').hide();
  			$('.headerScrollNav').show();
			$('#search_form').css({
				top:"-73px",
				left:"670px"
				
				
			})
  			
  			
  		}else{
  			
  			$('.header_body').removeClass('header_bodyFixed')
  			$('.logo').show();
  			$('.headerCart').show()
  			$('.headerSearchHotkey').show()
  			$('.headerScrollNav').hide()
  			$('#search_form').css({
				top:"0px",
				left:"0px"
				
				
			})
  		}
  			
  
  })
		
		
		
		
		
	})
	
	
	
})()

  
