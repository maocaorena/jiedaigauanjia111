$(function() {
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
		type1 = typeof type1 == 'undefined' ? '' : type1;
		type2 = typeof type2 == 'undefined' ? '' : type2;
		type3 = typeof type3 == 'undefined' ? '' : type3;
		util.goSearch('./jiekuan.html',{
			f: type1,
			s: type2,
			t: type3,
			fu: '',
		})
	});
	
	//机构详情
	chanpinIn({
		url: 'institution/getInstitutionById',
		params: {
			id: util.getSearch().id
		},
		tpl: $("#detailItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#detailMain'),
	});
	//右侧相关产品
	chanpinIn({
		url: 'loan/getRecommendLoanList',
		params: {
		},
		tpl: $("#chanpinTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#chanpinIn'),
	},1);
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
	},1);
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
	function chanpinIn(obj,type){
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res){
				if(res.flag){
					obj.template = Handlebars.compile(obj.tpl);
					if(type==1){
						obj.data = res.data.splice(0,4);
						obj.html = obj.template(obj);
					}else if(type==2){
						obj.data = res.data;
						obj.html = obj.template(obj);
					}else{
						obj.data = res.data;
						obj.html = obj.template(obj.data);
					}
					obj.inHtml.html(obj.html);
				}
			}
		});
	};
})