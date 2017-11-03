$(function() {
	$('window').on('keyup','#jie_money,#jie_day',function() {
		var jie_money = $('#jie_money').val();
		var jie_day = $('#jie_day').val();
		suan(jie_money, jie_day);
	});

	function suan(jie_money, jie_day) {
		if(!jie_money || !jie_day) {
			$('#yhk').text('0');
			$('#zfy').text('0');
			return false;
		}
		if(!isNaN(jie_money) && !isNaN(jie_day)) {
			var rate = "0.05";
			var yhk = '',
				zfy = '';
			zfy = jie_money * (rate / 100) * jie_day;
			yhk = jie_money - (-zfy);
			$('#yhk').text(yhk.toFixed(2));
			$('#zfy').text(zfy.toFixed(2));
		}
	}
	
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
	var chanpinId = util.getSearch().id;
	//详情
	messageIn({
		url: 'loan/getLoanDetailsById',
		params: {
			id: chanpinId
		},
		tpl: $("#itemMessageTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#itemMessageIn'),
	})
	function messageIn(obj){
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res){
				if(res.flag){
					obj.data = res.data;
					obj.data.tags1 = obj.data.tags.split('、');
					obj.template = Handlebars.compile(obj.tpl);
					obj.html = obj.template(obj.data);
					obj.inHtml.html(obj.html);
				}
			}
		});
	};
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
	});
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