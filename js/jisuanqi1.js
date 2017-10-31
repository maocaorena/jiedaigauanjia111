window.onload = Js(1);

function Js(sss) {
	//num1:初始本金  num2：年利率 % num3：贷款期限
	var num1 = $('#x1').val();
	var num2 = $('#x3').val();
	var num3 = $('#x2').val();

	//        console.log(num1, num2, num3);
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
		for(var i = 1; i < Number(num3) + 1; i++) {
			//每期利息
			var lx = (qcye * num2).toFixed(2);
			//还款额
			var hke = (parseFloat(bj) + parseFloat(lx)).toFixed(2);
			//期末余额
			var qmye = (qcye - bj).toFixed(2);
			//循环输出列表
			var addRow = '<li id="ssss"><ul><li class="fl">' + hke + '</li><li class="fl">' + bj + '</li><li class="fl">' + lx + '</li><li class="fl">第' + i + '期</li></ul></li>';
			$("#tab1").append(addRow);
			qcye = qmye;
			lxzj += Number(lx);
		}
	} else if(sss == '2') {
		$('#bx').addClass('active');
		$('#bj').removeClass('active');
		//——————————————等额本息———————————————
		var p1 = Math.pow(1 + num2, num3);
		var p2 = Math.pow(1 + num2, num3) - 1;
		var hke = (qcye * num2 * p1 / p2).toFixed(2); //月还款额不变
		for(var i = 1; i < Number(num3) + 1; i++) {
			//利息
			var lx = (qcye * num2).toFixed(2); //每期利息
			//本金
			var bj = (hke - lx).toFixed(2);
			//期末余额        
			var qmye = (qcye - (hke - lx)).toFixed(2);
			//循环输出列表
			var addRow = '<li id="ssss"><ul><li class="fl">' + hke + '</li><li class="fl">' + bj + '</li><li class="fl">' + lx + '</li><li class="fl">第' + i + '期</li></ul></li>';
			$("#tab1").append(addRow);
			qcye = qmye;
			lxzj += Number(lx);
		}
	}
	document.getElementById("zlx").innerHTML = lxzj.toFixed(2);
}