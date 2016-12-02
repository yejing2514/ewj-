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