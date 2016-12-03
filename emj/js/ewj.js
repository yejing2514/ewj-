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
					background: 'url('+ data.bannerPic[$num]+') no-repeat center 0'

				})

				$('.banner_picU li').eq($num).stop(true).animate({
					'opacity': 1
				}).siblings('li').stop(true).animate({
					'opacity': 0
				})

			}
			
			$('.banner_list').hover(function(){
				clearInterval($timer)
				
				
				
			},function(){
				
			$timer=setInterval(function(){
				$('#rightBtn').click();
				
				
			},5000)	
				
				
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
			
			$timer=setInterval(function(){
				$('#rightBtn').click();
				
				
			},5000)
			
		});

	})

})();
/****************************flashSale倒计时+json文件引入数据********************/
(function(){
	
	$(function(){
		/*实现边框的淡入淡出效果以及产品的介绍的具体展示*/
		$('.newGoodsList').hover(function(){
			$(this).children('.mask').stop(true).fadeIn()
			$(this).find('.shop_name').stop(true).animate({
					bottom:"25px"
				
			})
			$(this).find('.intro').stop(true).animate({
					top:"-6px"
				
			})

	
			
		},function(){
			
		$(this).children('.mask').stop(true).fadeOut()
			
			$(this).find('.intro').stop(true).animate({
					top:"26px"
				
			})
			$(this).find('.shop_name').stop(true).animate({
					bottom:"0px"
				
			})
		
		
			
		})
		
		/*倒计时的实现*/
		/*不足10的转换+0*/
		  function dou(value){
        	if(value<10){
        		return '0'+value;
        	}else{
        		return value;
        	}
        }
		 
		 function djs(){
			var future = new Date(2016, 11, 25, 00, 00, 00);
	        var t = (future - new Date()) / 1000;
	        var d = Math.floor(t / 86400);
	        var h = Math.floor(t % 86400 / 3600);
	        var m = Math.floor(t % 86400 % 3600 / 60);
			$('.numDay1').html(parseInt(dou(d)/10))
			$('.numDay2').html(parseInt(dou(d)%10))
			$('.numHour1').html(parseInt(dou(h)/10))
			$('.numHour2').html(parseInt(dou(h)%10))
			$('.numMinute1').html(parseInt(dou(m)/10))
			$('.numMinute2').html(parseInt(dou(m)%10))
		
		}
		 
		 
		djs();
		setInterval(djs,1000);
		
		$.ajax({
			url:"json/flashSale.json",
			
		}).done(function(data){
				/*闪购界面json数据的请求*/
			$('.img_viewP').find('img').each(function(i){
				$(this).attr('src',data.img_src[i])
				$('.img_country').find('img').eq(i).attr('src',data.img_logo[i])
				$('.img_title').eq(i).html(data.title[i])
				$('.shop_name').children('a').eq(i).html(data.category[i])
				$('.shop_pri').children('span').children('i').eq(i).html(data.price[i])
				$('.shop_pri').children('del').children('i').eq(i).html(data.priceDel[i])
				$('.qcpointStyle').eq(i).html(data.intro[i])
				
				/*划入滑出显示产品介绍*/
				
			});
			
			
		});
		
		
		
	})
	
	
	
})()
