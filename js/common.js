var config = {
//	baseUrl: "http://localhost:8000/proxy/loan.koudaijiaban.com/mobile/",//gulp代理接口地址
	baseUrl: "http://loan.koudaijiaban.com/mobile/",//线上接口地址
	contentType: "application/json",
	dataType: "json",
	timeout: 1800000,
};
var util = {
	goSearch: function(url, obj) {
		var toGo = url;
		for(var i in obj) {
			if(toGo.indexOf('?') > 0) {
				toGo += ('&' + i + '=' + obj[i])
			} else {
				toGo += ('?' + i + '=' + obj[i])
			}
		};
		window.location.href = toGo;
	},
	getSearch: function() {
		var args = {};
		var query = location.search.substring(1); //获取查询串
		var len = query.replace(/(^\s*)|(\s*$)/g, "").length;
		if(len < 1) {
			return args;
		};
		var pairs = query.split("&"); //在逗号处断开
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('='); //查找name=value
			if(pos > 0) {
				var argname = pairs[i].substring(0, pos); //提取name
				var value = pairs[i].substring(pos + 1); //提取value
				args[argname] = decodeURI(value); //存为属性
			} else {
				args[pairs[i]] = '';
			}
		};
		return args;
	},
	commonUrl: function() {
		return config.baseUrl;
	},
	/**
	 * 获取数据ajax-get请求
	 */
	getN: function(dd) {
		$.ajax({
			url: config.baseUrl + dd.url,
			type: "get",
			dataType: config.dataType,
			timeout: config.timeout,
			data: dd.params,
			success: dd.success,
			error: function(xhr, textstatus, thrown) {

			}
		});
	},

	/**
	 * 提交json数据的post请求
	 */
	postN: function(dd) {
		$.ajax({
			url: config.baseUrl + dd.url,
			type: "post",
			dataType: config.dataType,
			data: dd.params,
			timeout: config.timeout,
			success: dd.success,
			error: function(xhr, status, error) {
				if(dd.error) {
					dd.error();
				} else {
					console.log('服务器错误')
				}
			}
		})
	},

	/**
	 * 修改数据的ajax-put请求
	 */
	putN: function(dd) {
		$.ajax({
			url: config.baseUrl + dd.url,
			type: "put",
			contentType: config.contentType,
			dataType: config.dataType,
			data: dd.params,
			timeout: config.timeout,
			success: dd.success,
			error: function(xhr, textstatus, thrown) {

			}
		});
	},
	/**
	 * 删除数据的ajax-delete请求
	 */
	delN: function(dd) {
		$.ajax({
			url: config.baseUrl + dd.url,
			type: "delete",
			contentType: config.contentType,
			dataType: config.dataType,
			timeout: config.timeout,
			data: dd.params,
			success: dd.success,
			error: function(xhr, textstatus, thrown) {

			}
		});
	},
}