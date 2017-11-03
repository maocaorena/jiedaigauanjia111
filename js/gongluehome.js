$(function() {

	$('.cur').on('click', "", function() {
		var that = $(this);
		var display = $(this).parent().find('ul').css('display');
		if(display == 'none') {
			$(that).addClass('show');
		} else {
			$(that).removeClass('show');
		}
		$(that).parent().find('ul').slideToggle(100);
		$(this).parent().siblings().find('.cur').removeClass('show');
		$(this).parent().siblings().find('ul').slideUp(100);
		var li = $(this).parent().find('li');
		$(li).click(function() {
			var text = $(this).text();
			var data = $(this).attr('data');
			$(that).text(text);
			$(that).attr('data', data);
			$(that).parent().find('ul').slideUp(100);
			$(that).removeClass('show');
		});
	});
	$('#JigouSearch').on('click', "", function() {
		var type1 = $('#JigouSearch_type1').attr('data');
		var type2 = $('#JigouSearch_type2').attr('data');
		var type3 = $('#JigouSearch_type3').attr('data');
		type1 = typeof type1 == 'undefined' ? 0 : type1;
		type2 = typeof type2 == 'undefined' ? 0 : type2;
		type3 = typeof type3 == 'undefined' ? 0 : type3;
		util.goSearch('./jiekuan.html',{
			f: type1,
			s: type2,
			t: type3,
			fu: '',
		})
	});
	//顶部选项卡
	chanpinIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: '5',
		},
		tpl: $("#barItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#barMain'),
	},4);
	//swiper
	chanpinIn({
		url: 'article/getRecommendArticleList',
		params: {},
		tpl: $("#swiperItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#swiperMain'),
	}, 1);
	//main
	chanpinIn({
		url: 'article/getRecentRecommendArticleList',
		params: {},
		tpl: $("#mainItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#mainMain'),
	}, 1);
	//	 * 搜索条件  借款额度
	chanpinIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: 1
		},
		tpl: $("#searchItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#searchMain1')
	},2);
//	 * 搜索条件  借款期限
	chanpinIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: 2
		},
		tpl: $("#searchItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#searchMain2')
	},2);
//	 * 搜索条件  职业身份
	chanpinIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: 3,
			source: 'PC'
		},
		tpl: $("#searchItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#searchMain3'),
	},2);
	//右侧相关产品
	chanpinIn1({
		url: 'loan/getRecommendLoanList',
		params: {
		},
		tpl: $("#chanpinTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#chanpinIn'),
	},1);
	function chanpinIn(obj, type) {
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res) {
				if(res.flag) {
					if(type==4){
						obj.data = res.data;
						obj.selected = util.getSearch().barid;
					}else{
						obj.data = res.data;
					};
					obj.data = res.data;
					obj.template = Handlebars.compile(obj.tpl);
					obj.html = obj.template(obj);
					obj.inHtml.html(obj.html);
					if(type == 1) {
						var swiper = new Swiper('.swiper-container', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							spaceBetween: 30,
							centeredSlides: true,
							autoplay: 8000,
							autoplayDisableOnInteraction: false
						});
					}
				}
			}
		});
	};
	function chanpinIn1(obj,type){
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res){
				if(res.flag){
					obj.template = Handlebars.compile(obj.tpl);
					obj.data = res.data.splice(0,4);
					obj.html = obj.template(obj);
					obj.inHtml.html(obj.html);
				}
			}
		});
	};
})