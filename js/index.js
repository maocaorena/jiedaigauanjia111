$(function() {
	$('.nc-tab td').click(function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		var num = $(this).index();
		$('.news-list li').eq(num).removeClass('none').siblings().addClass('none');
	});
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
	var mySwiper = new Swiper('.swiper-container', {
		lazyLoading: true,
		autoplay: 3000,
		lazyLoadingOnTransitionStart: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		pagination: '.swiper-pagination',
		paginationClickable: true
	});

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
	
})