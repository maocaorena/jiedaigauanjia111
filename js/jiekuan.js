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
	//计算器点击事件
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
	//获取搜索参数
	var search = {
		first: util.getSearch().f || '',
		second: util.getSearch().s || '',
		third: util.getSearch().t || '',
		fouth: util.getSearch().fu || ''
	}
	//初始化分页
	$("#pagination").pagination({
		currentPage: 1,
		totalPage: 1,
		callback: function(current) {
			$("#current1").text(current);
			$(window).scrollTop(0);
			getList(current);
		}
	});
	// 获取列表
	getList(1)

	//	 * 搜索条件  借款额度
	modelIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: 1
		},
		tpl: $("#searchTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#firstSearch')
	});
	//	 * 搜索条件  借款期限
	modelIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: 2
		},
		tpl: $("#searchTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#secondSearch')
	});
	//	 * 搜索条件  职业身份
	modelIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: 3,
			source: 'PC'
		},
		tpl: $("#searchTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#thirdSearch'),
	});
	//	 * 搜索条件  是否新口子
	modelIn({
		url: 'loan/getLoanConditionList',
		params: {
			type: 4
		},
		tpl: $("#searchTpl").html(),
		data: '',
		template: '',
		html: '',
		inHtml: $('#fouthSearch')
	});
	//handlebars 渲染搜索条件
	function modelIn(obj) {
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res) {
				if(res.flag) {
					obj.data = res.data;
					switch(obj.params.type) {
						case 1:
							if(util.getSearch().f) {
								obj.selected = util.getSearch().f;
							} else {
								obj.selected = obj.data[0].id;
								//								search.first = obj.data[0].id;
							};
							break;
						case 2:
							if(util.getSearch().s) {
								obj.selected = util.getSearch().s;
							} else {
								obj.selected = obj.data[0].id;
								//								search.second = obj.data[0].id;
							};
							break;
						case 3:
							if(util.getSearch().t) {
								obj.selected = util.getSearch().t;
							} else {
								obj.selected = obj.data[0].id;
								//								search.third = obj.data[0].id;
							};
							break;
						case 4:
							if(util.getSearch().fu) {
								obj.selected = util.getSearch().fu;
							} else {
								obj.selected = obj.data[0].id;
								//								search.fouth = obj.data[0].id;
							};
							break;
						default:
							break;
					};
					obj.template = Handlebars.compile(obj.tpl);
					obj.html = obj.template(obj);
					obj.inHtml.html(obj.html);
				}
			}
		});
	};
	// 搜索条件点击事件
	$(window).on("click", '.goto', function() {
		switch($(this).attr('thisType')) {
			case '1':
				util.goSearch('./jiekuan.html', {
					f: $(this).attr('thisId'),
					s: search.second,
					t: search.third,
					fu: search.fouth,
				})
				break;
			case '2':
				util.goSearch('./jiekuan.html', {
					f: search.first,
					s: $(this).attr('thisId'),
					t: search.third,
					fu: search.fouth,
				})
				break;
			case '3':
				util.goSearch('./jiekuan.html', {
					f: search.first,
					s: search.second,
					t: $(this).attr('thisId'),
					fu: search.fouth,
				})
				break;
			case '4':
				util.goSearch('./jiekuan.html', {
					f: search.first,
					s: search.second,
					t: search.third,
					fu: $(this).attr('thisId'),
				})
				break;
			default:
				break;
		};
		/*$(this).parents().children('.cur').removeClass("cur");
		$(this).addClass('cur');
		switch($(this).attr('thisType')) {
			case '1':
				search = {
					first: $(this).attr('thisId'),
					second: search.second,
					third: search.third,
					fouth: search.fouth,
				}
				break;
			case '2':
				search = {
					first: search.first,
					second: $(this).attr('thisId'),
					third: search.third,
					fouth: search.fouth,
				}
				break;
			case '3':
				search = {
					first: search.first,
					second: search.second,
					third: $(this).attr('thisId'),
					fouth: search.fouth,
				}
				break;
			case '4':
				search = {
					first: search.first,
					second: search.second,
					third: search.third,
					fouth: $(this).attr('thisId'),
				}
				break;
			default:
				break;
		};
		getList(1);*/
	});

	function getList(one) {
		listIn({
			url: 'loan/getAllLoanList',
			params: {
				pageIndex: one,
				pageSize: 15,
				loanAmount: search.first,
				loanPeriod: search.second,
				loanType: search.third,
				loanNewType: search.fouth,
			},
			tpl: $("#listItem").html(),
			data: '',
			template: '',
			html: '',
			inHtml: $('#listIn')
		});
	};

	function listIn(obj) {
		util.getN({
			url: obj.url,
			params: obj.params,
			success: obj.callb || function(res) {
				if(res.flag) {
					obj.data = res.data;
					for(var i = 0; i < res.data.length; i++) {
						obj.data[i].tags1 = obj.data[i].tags.split('、');
					}
					obj.template = Handlebars.compile(obj.tpl);
					obj.html = obj.template(obj);
					obj.inHtml.html(obj.html);
					$("#pagination").pagination("setPage", res.paginator.page, res.paginator.pages);
				}
			}
		});
	};
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

	function chanpinIn(obj) {
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