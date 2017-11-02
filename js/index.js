$(function() {
	$('.nc-tab').on('click','td',function() {
		console.log($(this).attr('data'))
		$(this).addClass('cur').siblings().removeClass('cur');
		//资讯选项卡
		barGet($(this).attr('data'))
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
	//资讯选项卡
	chanpinIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: '5',
		},
		tpl: $("#topBarItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#topBar'),
	},1)
	//底部机构列表
	chanpinIn({
		url: 'institution/getAllInstitutionList',
		params: {
		},
		tpl: $("#jigouItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#jigouMain'),
	})
	function chanpinIn(obj,type){
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
					if(type==1){
						barGet(res.data[0].id);
					}
				}
			}
		});
	};
	//资讯列表
	function barGet(type){
		chanpinIn({
			url: 'article/getRecentArticleList',
			params: {
				type: type,
			},
			tpl: $("#barMainItem").html(),
			data: '',
			template: '',
			html: '',
			inHtml: $('#barMain'),
		})
	}
})