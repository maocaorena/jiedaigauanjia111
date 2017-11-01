$(function() {
	$('.nc-tab').on('click','td',function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		var num = $(this).index();
		$('.news-list li').eq(num).removeClass('none').siblings().addClass('none');
	});
	$('#JigouSuan').on('click', "", function() {
		var money = $('#suanmoney').val();
		var yue = $('#suanyue').val();
		var rate = $('#suanrate').val();
		if(money && yue && rate) {
			window.location.href = "./jisuanqi.html?par=" + money + "-" + yue + "-" + rate;
		} else {
			window.location.href = "./jisuanqi.html";
		}
	});
	var mySwiper = new Swiper('.swiper-container', {
		lazyLoading: true,
		autoplay: 3000,
		lazyLoadingOnTransitionStart: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		pagination: '.swiper-pagination',
		paginationClickable: true
	});

	$(window).scroll(function() {
		var top = $(window).scrollTop();
		if(top > 150)
			$('.f-top').fadeIn(100);
		else
			$('.f-top').fadeOut(100);
	});
	$('.fh-top').click(function() {
		$(window).scrollTop(0);
	});
	//推荐列表 新口子
	chanpinIn({
		url: 'loan/getRecentLoanList',
		params: {
			loanNewType: 'y'
		},
		tpl: $("#listItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#first'),
	})
	//推荐列表 大额
	chanpinIn({
		url: 'loan/getRecentLoanList',
		params: {
			loanType: 'bigloan',
		},
		tpl: $("#listItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#second'),
	})
	//推荐列表 小额
	chanpinIn({
		url: 'loan/getRecentLoanList',
		params: {
			loanType: 'smallloan',
		},
		tpl: $("#listItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#third'),
	})
	function chanpinIn(obj){
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res){
				if(res.flag){
					console.log(res)
					obj.data = res.data;
					obj.template = Handlebars.compile(obj.tpl);
					obj.html = obj.template(obj);
					obj.inHtml.html(obj.html);
				}
			}
		});
	};
})