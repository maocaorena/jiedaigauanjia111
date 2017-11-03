var dd = util.getSearch().par.split('-');
$('.input1').val(dd[0]);
$('.input2').val(dd[1]);
$('.input3').val(dd[2]);
window.onload = Js(1);

function Js(sss) {
	//num1:初始本金  num2：年利率 % num3：贷款期限
	var num1 = $('#x1').val();
	var num2 = $('#x3').val();
	var num3 = $('#x2').val();
	
	if(num1 < 0 || isNaN(num1)) {
		dialog.alert("请填写正确的贷款总额！");
		return false;
	}
	if(num2 == 0 || isNaN(num2)) {
		dialog.alert("请填写正确的月利率！");
		return false;
	} else {
		num2 = num2 / 100; //转换百分比
	}
	if(num3 == 0 || isNaN(num3)) {
		dialog.alert("请填写正确的贷款期限！");
		return false;
	}
	
	var lxzj = 0;
	var qcye = num1; //期初余额
	$("li").remove("#ssss");

	var j = document.getElementById("bj").className;
	if(sss == '3') {
		if(j.indexOf('active') > 0) {
			sss = 1;
		} else {
			sss = 2;
		}
	}

	if(sss == '1') {
		$('#bj').addClass('active');
		$('#bx').removeClass('active');
		//—————————————等额本金——————————————
		var bj = (qcye / num3).toFixed(2); //月还本金不变
		util.getN({
			url: 'loan/getPerLoanPlan',
			params: {
				amount: num1,
				months: num3,
				loanRate: num2,
				type: 1
			},
			success: function(res){
				if(res.flag){
					$("#zlx").text(res.data.totalInterest);
					var _nn = res.data.paymentDetailInfoList;
					for(var i = 0; i < _nn.length; i++) {
						//循环输出列表
						var addRow = 
							'<li id="ssss">'+
								'<ul>'+
									'<li class="fl">' + _nn[i].payAmount + '</li>'+
									'<li class="fl">' + _nn[i].payCapital + '</li>'+
									'<li class="fl">' + _nn[i].payInterest + '</li>'+
									'<li class="fl">' + _nn[i].number + '</li>'+
								'</ul>'+
							'</li>';
						$("#tab1").append(addRow);
					}
				}
			}
		});
	} else if(sss == '2') {
		$('#bx').addClass('active');
		$('#bj').removeClass('active');
		//——————————————等额本息———————————————
		var p1 = Math.pow(1 + num2, num3);
		var p2 = Math.pow(1 + num2, num3) - 1;
		var hke = (qcye * num2 * p1 / p2).toFixed(2); //月还款额不变
		util.getN({
			url: 'loan/getPerLoanPlan',
			params: {
				amount: num1,
				months: num3,
				loanRate: num2,
				type: 2
			},
			success: function(res){
				if(res.flag){
					$("#zlx").text(res.data.totalInterest)
					var _nn = res.data.paymentDetailInfoList;
					for(var i = 0; i < _nn.length; i++) {
						//循环输出列表
						var addRow = 
							'<li id="ssss">'+
								'<ul>'+
									'<li class="fl">' + _nn[i].payAmount + '</li>'+
									'<li class="fl">' + _nn[i].payCapital + '</li>'+
									'<li class="fl">' + _nn[i].payInterest + '</li>'+
									'<li class="fl">' + _nn[i].number + '</li>'+
								'</ul>'+
							'</li>';
						$("#tab1").append(addRow);
					}
				}
			}
		});
	}
}

var dialog = {
	//对话框，cont是提示内容（可以是html标签等），time是停留时间
	alert: function(cont, time) {
		if(typeof time == "undefined") {
			time = 1200;
		}
		var html = '<div id="pub_alert" style="background-color: rgba(42, 42, 42, 0.9);color:#FFF; min-width: 50px;_width:50px; padding:0 20px;height: 50px; line-height: 50px; position: fixed; left:0%;top:35%; z-index: 1000000; text-align: center; display:none; box-shadow: 0px 0px 10px rgba(0,0,0,0.3);border-radius: 3px;"></div>';
		if(cont == 'loading') {
			$('#showloading,.mask').removeClass('none');
			$('#showloading').css({
				"left": ($(window).width() - $('#showloading').outerWidth(true)) / 2 + "px"
			});
			setTimeout(function() {
				$('#showloading,.mask').addClass('none');
			}, time);
		} else {
			if($("#pub_alert").length == 0) {
				$("body").append(html);
			}
		}
		var pub_alert = $("#pub_alert");
		pub_alert.html(cont).css({
			"left": ($(window).width() - pub_alert.outerWidth(true)) / 2 + "px"
		}).stop(true, true).fadeIn();
		clearTimeout(timer);
		var timer = setTimeout(function() {
			//pub_alert.html("");
			pub_alert.stop(true, true).fadeOut();
		}, time);
	},
	//确认框，cont是显示内容（可以是html标签等）,callback是确定后的操作,options是初始化框架参数：宽,高,内边距,距离顶部位置,是否有遮罩背景,随窗口滚动
	confirm: function(cont, callback, options) {
		//设置默认值
		if(options == undefined) {
			options = {};
		}
		opt = {
			width: options.width ? options.width : "440px", //宽
			height: options.height ? options.height : "170px", //高
			padding: options.padding ? options.padding : "10px", //内边距            
			top: options.top ? options.top : "5%", //,距离顶部位置
			ismask: options.ismask ? options.ismask : false, //是否有遮罩背景
			isscroll: options.isscroll ? options.isscroll : false //随窗口滚动,随窗口滚动
		};
		var html = '<div id="pub_confirm" style="position:' + (opt.isscroll ? "absolute" : "fixed") + '; left: 0;top:0;width: 100%;height: ' + $(document).outerHeight(true) + 'px;background-color:transparent;background-color:' + (opt.ismask ? "rgba(0,0,0,0.5)" : "transparent") + '; z-index:99999;">' +
			'<div style=" position:relative; margin:0 auto; text-align:center;font-size:20px; top:' + opt.top + '; width:' + opt.width + '; height:' + opt.height + ';overflow:hidden; padding:' + opt.padding + '; background-color:#fff;' + (!opt.ismask ? "box-shadow: 0 0 10px rgba(0,0,0,0.3); boder:1px solid #d5d5d5;" : "") + '">' +
			'<div class="pub_confirm_cont" style="margin:40px auto;"></div>' +
			'<div class="pub_confirm_btn" style="font-size:16px;"><a href="#" style="width: 188px;height: 40px;line-height: 40px;color:#fff;background-color:#3a84ae;margin-right:25px; border-radius:3px; display:inline-block;*display:inline;*zoom:1;">确定</a><a href="#" style="width: 188px;height: 40px;line-height: 40px;color:#fff;background-color:#c1c1c1; border-radius:3px; display:inline-block;*display:inline;*zoom:1;">取消</a></div>' +
			'</div>' +
			'</div>';
		$("body").append(html); //body添加框架
		$(".pub_confirm_cont").html(cont); //写入内容
		//移除框架
		$(".pub_confirm_btn a").on("click", function() {
			$("#pub_confirm").remove();
			return false;
		})
		//确定
		$(".pub_confirm_btn a:eq(0)").on("click", function() {
			if(typeof callback != "undefined") {
				callback(true);
			}
		});
		$(".pub_confirm_btn a:eq(1)").on("click", function() {
			if(typeof callback != "undefined") {
				callback(false);
			}
		});

	}
}