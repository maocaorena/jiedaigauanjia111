$(function() {
	var rililv = '';
	var chanpinId = util.getSearch().id;
	$(document).on('input', '#jie_money,#jie_day', function() {
		var jie_money = $('#jie_money').val();
		var jie_day = $('#jie_day').val();
		suan(jie_money, jie_day);
		console.log(jie_money, jie_day)
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
			console.log(rililv)
			util.getN({
				url: 'loan/getPerLoanInfo',
				params: {
					amount: jie_money,
					days: jie_day,
					loanRate: parseFloat(rililv)*100,
				},
				success: function(res) {
					if(res.flag) {
						$('#yhk').text(res.data.loanAmount);//应还款
						$('#zfy').text(res.data.loanInterest);//总费用
					}
				}
			});
			
		}
	}

	$(window).scroll(function() {
		var top = $(window).scrollTop();
		if(top > 150)
			$('.f-top').fadeIn(100);
		else
			$('.f-top').fadeOut(100);
	});
	//立即借款
	new QRCode(document.getElementById('inCode'), util.chanpinHtml+'?id='+chanpinId);
	$(window).on('click','.showpro',function(){
		$('.ld-twocode').removeClass('none');
        $('.mask').removeClass('none');
	});
	
	$('.pc-close').on('click',function(){
		$('.ld-twocode').addClass('none');
        $('.mask').addClass('none');
	});
	
	//回顶
	$('.fh-top').click(function() {
		$(window).scrollTop(0);
	});
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

	function messageIn(obj) {
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res) {
				if(res.flag) {
					obj.data = res.data;
					rililv = res.data.rate;
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
		params: {},
		tpl: $("#chanpinTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#chanpinIn'),
	});
	//合作机构
	chanpinIn({
		url: 'institution/getAllInstitutionList',
		params: {},
		tpl: $("#jigouItem").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#jigouMain'),
	});

	function chanpinIn(obj,type) {
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res) {
				if(res.flag) {
					obj.data = res.data.splice(0, 4);
					obj.template = Handlebars.compile(obj.tpl);
					obj.html = obj.template(obj);
					obj.inHtml.html(obj.html);
				}
			}
		});
	};
})