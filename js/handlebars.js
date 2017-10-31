Handlebars.registerHelper("ifExpress1", function(a, b, options) {
	if(a == b) {
		//a 和b满足一定的关系
		return options.fn(this); //这个就相当于满足这个条件，执行ifExpress下面的一段代码
		//options.fn(this)表示选择这个
	} else {
		return options.inverse(this); //表示不选择这个，选择else
	}
});
Handlebars.registerHelper("ifExpress", function(a, options) {
	if(a) {
		//a 和b满足一定的关系
		return options.fn(this); //这个就相当于满足这个条件，执行ifExpress下面的一段代码
		//options.fn(this)表示选择这个
	} else {
		return options.inverse(this); //表示不选择这个，选择else
	}
});