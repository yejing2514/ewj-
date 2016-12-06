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
		
/*************************************用户名显示******************************/	
			if(cookieMy.getCookie('zhanghao1')) {
				
				$('.navL_o').find('em').html(cookieMy.getCookie('zhanghao1'))	
				
				
			}else{
				
					$('.navL_o').find('em').html('您好')	
			}

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

/****************************滑入的mask效果***********************************/
(function() {

	$(function() {
		$(document).on('mouseover', '.newGoods', function() {

			$(this).children('.mask').stop(true).fadeIn()

		})
		$(document).on('mouseout', '.newGoods', function() {

			$(this).children('.mask').stop(true).fadeOut()

		})
	})

	$(document).on('mouseover', '.arrivalGoods', function() {

		$(this).children('.mask').stop(true).fadeIn()

	})
	$(document).on('mouseout', '.arrivalGoods', function() {

		$(this).children('.mask').stop(true).fadeOut()

	})

	$(document).on('mouseover', '.crossGoods', function() {

		$(this).children('.mask').stop(true).fadeIn()

	})
	$(document).on('mouseout', '.crossGoods', function() {

		$(this).children('.mask').stop(true).fadeOut()

	})

})();

/****************************加入购物车按钮的效果********************************/
$(document).on('mouseover', '.crossMoList li a', function() {

	$(this).stop(true).animate({
		backgroundColor: '#fff',
		color: '#252525'

	}, 500)

})

$(document).on('mouseout', '.crossMoList li a', function() {

	$(this).css("background-color", "");
	$(this).stop(true).animate({

		color: '#fff'

	}, 500)

})

$(document).on('mouseover', '.btn_box', function() {

	$(this).stop(true).animate({
		backgroundColor: '#e60000'

	}, 500)

	$(this).children('a').stop(true).animate({
		color: '#fff'

	}, 500)

});

$(document).on('mouseout', '.btn_box', function() {

	$(this).stop(true).animate({
		backgroundColor: '#fff'

	}, 500)
	$(this).children('a').stop(true).animate({
		color: '#e60000'

	}, 500)

});

/****************************滑下出现固定的搜索框预加载********************************/
(function() {

		$(function() {
			var bstop = true;
			var bstop1 = true;
			var bstop2 = true;
			var bstop3 = true;
			var bstop4 = true;
			$(window).scroll(function() {
				var scrolltop = $(this).scrollTop();
				var $height = $(window).height(); //可视区
				var $sellGoodstop = $('.sellGoodsG').offset().top + 200;
				var $newArrivaltop = $('.newArrivalG').offset().top + 200;
				var $borderTratop = $('.cross_borderTraG').offset().top + 200;
				var $EnjoyCitytop = $('.EnjoyCityG').offset().top + 200;
				var $originDirecttop = $('.originDirectG').offset().top + 200;

					$('.louceng').each(function(i){
						var $top1 = ($('.louceng').eq(i).offset().top+200)
						if($top1>scrolltop){
						$('.loutiNav li').eq(i).addClass('loutiActive').siblings('li').removeClass('loutiActive')
							return false;
								
							}
						
					})	
			

					/***************************请求尖货推荐的结构页面********************************/
					if($sellGoodstop < scrolltop + $height) {
						if(bstop) {
							$.ajax({
								url: 'html/sellGoods.html',
								beforeSend: function() { //发送请求前
									bstop = false;
									$('.sellGoodsG').find('.loading').show();

								}
							}).done(function(data) {
								$('.sellGoodsG').append(data)
									//请求尖货推荐的json数据	
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

							});

							$('.sellGoodsG').find('.loading').hide();
						}
					}
					/***************************上新品推荐的结构页面*********************************/
					if($newArrivaltop < scrolltop + $height) {
						if(bstop1) {
							$.ajax({
								url: 'html/newArrival.html',
								beforeSend: function() { //发送请求前
									bstop1 = false;
									$('.newArrivalG').find('.loading').show();

								}
							}).done(function(data) {
								$('.newArrivalG').append(data)
									//请求上新品推荐的json数据	
								$.ajax({
									url: "json/newArrival.json",
								}).done(function(data) {
									$('.arrival_view').children('img').each(function(i) {
										$(this).attr('src', data.img_src[i])
										$(this).parents('.arrivalGoods').find('.tag').find('img').attr('src', data.tag_logo[i])
										$('.jj_box').find('img').eq(i).attr('src', data.img_logo[i])
										$('.jj_box').find('span').eq(i).html(data.title[i])
										$('.jj_p2').find('a').eq(i).html(data.category[i])
										$('.jj_p3').find('a').eq(i).html(data.intro[i])
										$(this).parents('.arrivalGoods').find('.shop_pri').children('span').children('i').html(data.price[i])
										$(this).parents('.arrivalGoods').find('.shop_pri').children('del').children('i').html(data.priceDel[i])

									})

								});

							});

							$('.newArrivalG').find('.loading').hide();
						}
					}

					/***************************跨境精选的结构页面***********************************/
					if($borderTratop < scrolltop + $height) {
						if(bstop2) {
							$.ajax({
								url: 'html/crossBorder.html',
								beforeSend: function() { //发送请求前
									bstop2 = false;
									$('.cross_borderTraG').find('.loading').show();

								}
							}).done(function(data) {
								$('.cross_borderTraG').append(data)
									//请求上跨境精选的json数据	
								$.ajax({
									url: "json/crossBorder.json"
								}).done(function(data) {

									$('.cross_view').children('img').each(function(i) {
										$(this).attr('src', data.img_src[i])
										$(this).parents('.crossGoods').find('.tag').find('img').attr('src', data.tag_logo[i])
										$(this).parents('.crossGoods').find('.jj_p1').find('img').attr('src', data.img_logo[i])
										$(this).parents('.crossGoods').find('.jj_box').find('span').html(data.title[i])
										$(this).parents('.crossGoods').find('.jj_p2').find('a').html(data.category[i])
										$(this).parents('.crossGoods').find('.jj_p3').find('a').html(data.intro[i])
										$(this).parents('.crossGoods').find('.shop_pri').children('span').children('i').html(data.price[i])
										$(this).parents('.crossGoods').find('.shop_pri').children('del').children('i').html(data.priceDel[i])

									})

								});

							});

							$('.cross_borderTraG').find('.loading').hide();
						}
					}

					/***************************EnjoyCity结构页面**********************************/
					if($EnjoyCitytop < scrolltop + $height) {
						if(bstop3) {
							$.ajax({
								url: 'html/EnjoyCity.html',
								beforeSend: function() { //发送请求前
									bstop3 = false;
									$('.EnjoyCityG').find('.loading').show();

								}
							}).done(function(data) {
								$('.EnjoyCityG').append(data)
									//请求EnjoyCity的json数据	
								$.ajax({
									url: "json/EnjoyCity.json"
								}).done(function(data) {

									$('.EnjoyCityG').find('.crossGoods').each(function(i) {
										$(this).find('.cross_view').children('img').attr('src', data.img_src[i])
										$(this).find('.tag').children('img').attr('src', data.tag_logo[i])
										$(this).find('.tag').children('img').attr('src', data.tag_logo[i])
										$(this).find('.jj_p1').children('img').attr('src', data.img_logo[i])
										$(this).find('.jj_box').children('span').html(data.title[i])
										$(this).find('.jj_p2').children('a').html(data.category[i])
										$(this).find('.jj_p3').children('a').html(data.intro[i])
										$(this).find('.shop_pri').children('span').children('i').html(data.price[i])
										$(this).find('.shop_pri').children('del').children('i').html(data.priceDel[i])

									})

								});

							});

							$('.EnjoyCityG').find('.loading').hide();
						}
					}
					/***************************产地直采结构页面************************************/
					if($originDirecttop < scrolltop + $height) {
						if(bstop4) {
							$.ajax({
								url: 'html/originDirect.html',
								beforeSend: function() { //发送请求前
									bstop4 = false;
									$('.originDirectG').find('.loading').show();

								}
							}).done(function(data) {
								$('.originDirectG').append(data)
									//请求产地直采的json数据	
								$.ajax({
									url: "json/originDirect.json"
								}).done(function(data) {

									$('.originDirectG').find('.crossGoods').each(function(i) {
										$(this).find('.cross_view').children('img').attr('src', data.img_src[i])
										$(this).find('.tag').children('img').attr('src', data.tag_logo[i])
										$(this).find('.tag').children('img').attr('src', data.tag_logo[i])
										$(this).find('.jj_p1').children('img').attr('src', data.img_logo[i])
										$(this).find('.jj_box').children('span').html(data.title[i])
										$(this).find('.jj_p2').children('a').html(data.category[i])
										$(this).find('.jj_p3').children('a').html(data.intro[i])
										$(this).find('.shop_pri').children('span').children('i').html(data.price[i])
										$(this).find('.shop_pri').children('del').children('i').html(data.priceDel[i])

									})

								});

							});

							$('.originDirectG').find('.loading').hide();
						}
					}
					/***************************楼梯fixed***************************************/
					if(scrolltop > 800) {

						$('.loutiNav').fadeIn()
						$('.cartLayer').fadeIn()

					} else {

						$('.loutiNav').fadeOut();
						$('.cartLayer').fadeOut();
					}

					/***************************搜索框fixed************************************/
					if(scrolltop > 1000) {

						$('.header_body').addClass('header_bodyFixed')
						$('.logo').hide();
						$('.headerCart').hide()
						$('.headerSearchHotkey').hide();
						$('.headerScrollNav').show();
						$('#search_form').css({
							top: "-73px",
							left: "670px"

						})

					} else {

						$('.header_body').removeClass('header_bodyFixed')
						$('.logo').show();
						$('.headerCart').show()
						$('.headerSearchHotkey').show()
						$('.headerScrollNav').hide()
						$('#search_form').css({
							top: "0px",
							left: "0px"

						})
					}

				})

			})

		})();
/**********************************楼层效果页面********************************/
		(function() {

			$(function() {

				$('.loutiNav ul li').on('click', function() {
					$(this).siblings('li').find('.topxs').show().siblings('.topyc').hide()
					$(this).find('.topyc').show().css('display', 'inline-block').siblings('.topxs').hide()
					$(this).addClass('loutiActive').siblings('li').removeClass('loutiActive')

					var $loucengtop = $('.louceng').eq($(this).index()).offset().top;

					$('html,body').stop(true).animate({ //兼容问题
						scrollTop: $loucengtop
					}, 600)
					
				})
				
				
				
				$('.entry03').click(function(){
						$('html,body').stop(true).animate({
						scrollTop: 0

					}, 400)
						
					})

			})

		})();