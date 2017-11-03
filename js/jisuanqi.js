$(function(){
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
	//合作机构
	chanpinIn({
		url: 'institution/getAllInstitutionList',
		params: {
		},
		tpl: $("#jigouItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#jigouMain'),
	});
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
				}
			}
		});
	};
	
})
