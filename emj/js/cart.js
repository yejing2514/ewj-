/*************************************购物车操作**************************/
(function() {
		
	function cookiearr() { //把cookie值转换成数组(思路：通过arrsearch函数判断对应的cookie值是否已经存在，而且cookie是一个数组)
		if(cookieMy.getCookie('cartsid')) { //cartindex 存放cookie的索引名称
			sidarr = cookieMy.getCookie('cartsid').split(',');
		} else {
			sidarr = [];
		}
		if(cookieMy.getCookie('cartnum')) { //cartnum   存放数量的cookie名称
			numarr = cookieMy.getCookie('cartnum').split(',');
		} else {
			numarr = []
		}

		if(cookieMy.getCookie('checkboxIng')) {
			checkboxIng = cookieMy.getCookie('checkboxIng').split(',');
		} else {
			checkboxIng = []
		}
		if(cookieMy.getCookie('checkboxIng')) {
			checkboxIng = cookieMy.getCookie('checkboxIng').split(',');
		} else {
			checkboxIng = []
		}

	}

	function createcart(sid, num) {
		$.ajax({
			url: "json/cart.json",
		}).done(function(data) {
			cookiearr();
			for(var i = 0; i < data.piclist.length; i++) {

				if(sid == data.piclist[i].sid) {
					var str = ''

					str += '<li class="CartListLi">' +
						'							<div class="ld1">' +
						'								<div class="iputDiv">' +
						'									<input type="checkbox" checked="checked">' +
						'								</div>' +
						'								<div class="Cart_view">' +
						'									<img src="' + data.piclist[i].img + '" sid="' + data.piclist[i].sid + '" >' +
						'								</div>' +
						'							</div>' +
						'							<div class="ld2">' +
						'								<a href="#">' + data.piclist[i].title + '</a>' +
						'							</div>' +
						'							<div class="ld3">　</div>' +
						'							<div class="ld4">¥<span>' + data.piclist[i].price + '</span></div>' +
						'							<div class="ld5">' +
						'								<span class="midde">' +
						'									<a href="javascript:;" class="detail_less"></a>' +
						'							<input type="text" class="quantity_txt" value="' + numarr[sidarr.indexOf(sid)] + '">' +
						'							<a href="javascript:;" class="detail_add"></a>' +
						'								<br>' +
						'								<span class="canDelivery">有货</span>' +
						'								</span>' +
						'							</div>' +
						'							<div class="ld6">' +
						'								<em>¥</em>' +
						'								<span>' + data.piclist[i].price * num + '</span>' +
						'							</div>' +
						'							<div class="ld7">' +
						'								<span class="midde">' +
						'									<a href="javascript:; "">删除</a>' +
						'									' +
						'								</span>' +
						'							</div>' +
						'						</li>';

					$('.ll').append(str);
					totalprice()

				}

			}

		});

	}
	
	setTimeout(function() {
	cookiearr();
	if(cookieMy.getCookie('allsel') == 'true') {

		$('.allsel').prop('checked', true)
	} else {
		$('.allsel').prop('checked', false)
	}
	$('.CartListLi').find('.iputDiv').find('input').each(function() {
		var sidwo = sidarr.indexOf($(this).parents('.CartListLi').find('.Cart_view').find('img').attr('sid'))

		if(checkboxIng[sidwo] == 'true') {
			$(this).prop('checked', true)
		} else {

			$(this).prop('checked', false)

		}
		
		totalprice()
	})

}, 50)

	
	
	if(cookieMy.getCookie('cartsid')) {
		var priceNum=0;
		var sidarr1 = cookieMy.getCookie('cartsid').split(',')
		var numarr1 = cookieMy.getCookie('cartnum').split(',')

		for(var i = 0; i < sidarr1.length; i++) {

			createcart(sidarr1[i], numarr1[i])
			priceNum+=parseInt(numarr1[i])
		}
			setTimeout(function(){
				
				$('.headerCart').find('a').find('strong').html(priceNum)
				$('.numCar').html(priceNum)
				
			},100)
		
	}else{
		
		$('.cartEmptyTips').show()
		$('.datles_table').hide()
		$('.jiesuan').hide()
		
	}

	var sidarr = [];
	var numarr = [];
	var checkboxIng = [];
	var sumjia = 0;
	var dianci = 0;
	$(document).on('click', '.btn_box', function() {
		var zongshu=0;
		var zongji=[]
		cookiearr();
		cookieMy.addCookie('allsel',true,7)
		if(cookieMy.getCookie('cartnum')){
			
		zongji=cookieMy.getCookie('cartnum').split(',')
		for(var i=0;i<zongji.length;i++){
			
			zongshu+=parseInt(zongji[i])
			
			
		}
			$('.headerCart').find('a').find('strong').html(zongshu+1)
			$('.numCar').html(zongshu+1)
			
		}
	
	
		
		var sid = $(this).parents('.arrivalGoods').find('.arrival_view').find('img').attr('sid');
		$(this).attr('btnsid', numarr[sidarr.indexOf(sid)])
		if($.inArray(sid, sidarr) != -1) {

			dianci = parseInt($(this).attr('Btnsid'))
			dianci++;
			$(this).attr('Btnsid', dianci)
			numarr[sidarr.indexOf(sid)] = $(this).attr('Btnsid');
			cookieMy.addCookie('cartnum', numarr.toString(), 7);

			$(this).parents('.arrivalGoods').find('.arrival_view').find('img').attr('sid')
				$(this).find('.CartTip').show(function(){
					$(this).stop(true).hide(3000)
				
				})
				

		} else {
			checkboxIng.push(true)
			cookieMy.addCookie('checkboxIng', checkboxIng.toString(), 7);
			sidarr.push(sid);
			cookieMy.addCookie('cartsid', sidarr.toString(), 7);
			numarr.push(1);
			
			if(!cookieMy.getCookie('cartnum')){
				$('.headerCart').find('a').find('strong').html(1)
				$('.numCar').html(1)
			}
			
			cookieMy.addCookie('cartnum', numarr.toString(), 7);
			
			
				$(this).find('.CartTip').show(function(){
					
					$(this).stop(true).hide(3000)
					
				})
				

		}

	})

	function delarr(sid, arr) {

		var arr1 = [];
		for(var i = 0; i < arr.length; i++) {

			if(arr[i] != sid) {

				arr1.push(arr[i])

			}

		}

		numarr.splice(arr.indexOf(sid), 1)
		checkboxIng.splice(arr.indexOf(sid), 1)
		sidarr = arr1;
		cookieMy.addCookie('cartsid', arr1.toString(), 7)
		cookieMy.addCookie('cartnum', numarr.toString(), 7)
		cookieMy.addCookie('checkboxIng', checkboxIng.toString(), 7)

	}

	$(document).on('click', '.ld7 .midde a', function() {

		cookiearr();
		$(this).parents('.CartListLi').remove();
		delarr($(this).parents('.CartListLi').find('.Cart_view').find('img').attr('sid'), sidarr);
		totalprice()

	})

	$('.allsel').on('change', function() {
		cookiearr()

		if($(this).prop('checked')) {
			$('.allsel').prop('checked', true)
			cookieMy.addCookie('allsel', true, 7)
			for(var i = 0; i < checkboxIng.length; i++) {
				checkboxIng[i] = true
				cookieMy.addCookie('checkboxIng', checkboxIng.toString(), 7)
			}

			$('.CartListLi :checkbox').prop('checked', true);
		} else {
			cookieMy.addCookie('allsel', false, 7)

			for(var i = 0; i < checkboxIng.length; i++) {
				checkboxIng[i] = false
				cookieMy.addCookie('checkboxIng', checkboxIng.toString(), 7)
			}
			$('.allsel').prop('checked', false)
			$('.CartListLi :checkbox').prop('checked', false);
		}
		totalprice()
	})

	$(document).on('click', '.iputDiv input', function() {
		cookiearr()
		var biaozhi = sidarr.indexOf($(this).parents('.CartListLi').find('.Cart_view').find('img').attr('sid'))

		if($('.CartListLi input:checked').length == $('.iputDiv').length) {
			$('.allsel').prop('checked', true);
			cookieMy.addCookie('allsel', true)
		} else {
			$('.allsel').prop('checked', false);
			cookieMy.addCookie('allsel', false)
		}

		if($(this).prop('checked')) {
			checkboxIng[biaozhi] = true;
			cookieMy.addCookie('checkboxIng', checkboxIng.toString(), 7)

		} else {
			checkboxIng[biaozhi] = false;
			cookieMy.addCookie('checkboxIng', checkboxIng.toString(), 7)
		}

		totalprice()

	})

	$(document).on('input', '.quantity_txt', function() {

		cookiearr();

		if($.isNumeric($(this).val())) {
			var a = parseInt($(this).val())
			if(a >= 99) {

				$(this).val(99)

			} else if(a <= 1) {

				$(this).val(1)
			} else {
				$(this).val(a)

			}

		} else {

			$(this).val(1)

		}
		$(this).parents('.CartListLi').find('.ld6').find('span').html(smalltotal($(this)));
		totalprice();
		changecookie($(this));

	})

	$('body').on('click', '.detail_add', function() {
		var $buynum = parseInt($(this).prev('input').val());
		$buynum++;
		if($buynum >= 99) {
			$(this).prev('input').val(99);
		} else {
			$(this).prev('input').val($buynum);
		}
		$(this).parents('.CartListLi').find('.ld6').find('span').html(smalltotal($(this)));
		totalprice();
		changecookie($(this));

	})

	$('body').on('click', '.detail_less', function() {

		var $buynum = parseInt($(this).next('input').val());
		$buynum--;
		if($buynum < 1) {
			$(this).next('input').val(1);
		} else {
			$(this).next('input').val($buynum);
		}
		$(this).parents('.CartListLi').find('.ld6').find('span').html(smalltotal($(this)));
		totalprice();
		changecookie($(this));

	})

	//统计总价格
	function totalprice() {
		var $total = 0;
		var sum = 0;
		$('.CartListLi').each(function() {
			if($(this).find('.iputDiv').children('input').is(':checked')) {
				$total += parseFloat($(this).find('.ld6').find('span').html());
			}
		})
		$('.price').html($total.toFixed(2))
		$('.heji').html('￥' + $total.toFixed(2));
		$('.payPrice').html($total.toFixed(2))
			//统计件数
		$('.CartListLi').find('.quantity_txt').each(function(i) {

			if($(this).parents('.CartListLi').find('.iputDiv').find('input').prop('checked')) {
				sum += parseInt($(this).val())

			}

		})

		$('.bd').find('strong').html(sum);
		$('.totalAmountS').html(sum)
	}

	//按钮添加数量进cookie
	function changecookie(obj) {
		cookiearr();
		var $index = obj.parents('.CartListLi').find('.Cart_view').find('img').attr('sid');
		numarr[sidarr.indexOf($index)] = obj.parents('.CartListLi').find('.quantity_txt').val();
		cookieMy.addCookie('cartnum', numarr.toString(), 7);
	}

	//计算小计
	function smalltotal(row) { //参数：哪一个商品的小计
		var $dprice = parseFloat(row.parents('.CartListLi').find('.ld4').children('span').html());

		var $dnum = parseInt(row.parents('.CartListLi').find('.quantity_txt').val());

		return($dprice * $dnum).toFixed(2);
	}
		//存账号名称
		if(cookieMy.getCookie('zhanghao1')) {
				
				$('.siteNavLogin').find('span').html(cookieMy.getCookie('zhanghao1'))	
				
				
			}else{
				
					$('.siteNavLogin').find('span').html('您好')	
			}
			
			
			$('.region_list').hover(function() {
		$('.region_pop').show()

	}, function() {

		$('.region_pop').hide()

	})	

})()