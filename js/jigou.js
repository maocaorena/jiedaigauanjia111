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
		type1 = typeof type1 == 'undefined' ? 0 : type1;
		type2 = typeof type2 == 'undefined' ? 0 : type2;
		type3 = typeof type3 == 'undefined' ? 0 : type3;
//		window.location.href = "/jiekuan-" + type1 + "-" + type2 + "-" + type3 + "-0/";
		window.location.href = './jiekuan.html'
	});
	
	//相关产品
	chanpinIn({
		url: 'loan/getRecommendLoanList',
		params: {
		},
		tpl: $("#chanpinTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#chanpinIn'),
	})
	function chanpinIn(obj){
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res){
				if(res.flag){
					obj.data = res.data.splice(0,4);
					obj.template = Handlebars.compile(obj.tpl);
					obj.html = obj.template(obj);
					obj.inHtml.html(obj.html);
					console.log(obj.data)
				}
			}
		});
	};
})