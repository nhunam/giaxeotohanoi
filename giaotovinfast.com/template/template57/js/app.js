$(window).load(function(){
	// Slideshow
	$slider = $('.slider');
	imgs = $slider.find('img');
	if(imgs.length == 1) {
		sliderh = imgs.height();
	}
	else {
		sliderw = $slider.width();
		sliderh = (sliderw * 1)/3.3777;
	}

	$('.slider').slider({
		full_width: true,
		height: sliderh
	});
});

﻿$(function() {
	// Slideshow
	// $('.slider').slider({
	// 	full_width: true,
	// 	height: 400
	// }).css("height","400px");

	// Date picker
	$('.datepicker').pickadate({
		container: 'body',
		selectMonths: false,
		selectYears: 1
	});

	// Trigger modals
	$('.modal-trigger').leanModal({
		dismissible: true,
		opacity: .5,
		in_duration: 300,
		out_duration: 200,
		ready: function() {
			if(typeof ga !== 'function') return;

			var pid = $('.modal:visible').attr('id'),
				label = 'Tự động báo giá';
			if (pid == 'baogia') label = 'Popup báo giá';
			else if (pid == 'laithu') label = 'Popup lái thử';
			else if (pid == 'tragop') label = 'Popup trả góp';
			//console.log('Visual Pageview: #' + pid + ' [' + label + ']');

			ga('set', {
				'page': '#' + pid,
				'title': label,
				'dimension5': ipadr
			});
			ga('send', 'pageview');
			ga('clientTracker.send', 'pageview');
		}
	});

	// Sidemenu for Mobile
	$('.button-collapse').sideNav();

	// Menu 3 cap
	$('.menu3lv').each(function() {
		var $menu = $(this),
			$bar = $menu.find('.menubar'),
			$sub = $menu.find('.submenu');

		$bar.find('a').on('click mouseenter', function() {
			var id = $(this).attr('id');
			$bar.find('a.active').removeClass('active');
			$(this).addClass('active');

			$sub.find('li[data-menu="' + id + '"]').show();
			$sub.find('li[data-menu!="' + id + '"]').hide();
		});

		// Active menu
		var activ = $bar.find('a.active');
		if (activ.length == 0) $bar.find('a:first').click();
	});
});

$('.material-select').material_select();

// Popup tu dong
var $popup = $('#popup');
if ($popup.length > 0) {
	var cdelay = $popup.data('delay'),
		ctimes = $popup.data('times'),
		cexpire = $popup.data('expire'),
		popup = Cookies.get('popup');

	if (typeof(popup) == 'undefined') {
		popup = ctimes
		Cookies.set('popup', ctimes, {
			expires: cexpire,
			path: '/'
		});
	}
	if (popup > 0) {
		setTimeout(function() {
			$popup.openModal();
			Cookies.set('popup', popup - 1, {
				expires: cexpire,
				path: '/'
			});
		}, cdelay);
	}
}

function ValidEmail(mail) {
	var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return pattern.test(mail);
}

function Register(id) {
	var frm = $('#' + id + ' form'),
		ok = true, err = '';

	if (frm.find('*[name=name]').val() == "") {
		ok = false;
		err += "Bạn chưa nhập họ tên!\n";
	}

	if (frm.find('*[name=car]').val() == "") {
		ok = false;
		err += "Bạn chưa nhập dòng xe!\n";
	}

	if (frm.find('*[name=phone]').val() == "") {
		ok = false;
		err += "Bạn chưa nhập điện thoại!\n";
	}

	if (frm.find('*[name=address]').val() == "") {
		ok = false;
		err += "Bạn chưa nhập khu vực!\n";
	}

	var email = frm.find('*[name=email]').val();
	if (email != '' && !ValidEmail(email)) {
		ok = false;
		err += "Email không hợp lệ!\n";
	}

	if (err != '') alert(err);
	if (ok) {
		// Custom Dimensions
		if(typeof ga === 'function') {
			var param =  {
				'dimension1': frm.find('*[name=name]').val(),
				'dimension2': frm.find('*[name=phone]').val(),
				'dimension3': frm.find('*[name=car]').val(),
				'dimension4': frm.find('*[name=address]').val(),
				'dimension5': frm.find('*[name=email]').val(),
                'dimension6': ipadr
			};
			ga('send', 'pageview', param);
			ga('clientTracker.send', 'pageview', param);
		}

		// Gui yeu cau
		frm.submit();

		// Thong bao dang xu ly
		var $body = $('#' + id + ' .modal-content');
		$body.children().wrapAll('<div class="hide"></div>');
		$body.append('<div class="popup-box-thanks screen-hide-mb"style="margin-left:400px;margin-top:50px;text-align:center" > Chúng tôi đang xử lý yêu cầu của bạn.<br>Vui lòng không bấm nút tắt trình duyệt hay nút tải lại trang.<div class="progress" style="width:50%;margin:20px auto;"><div class="indeterminate"></div></div></div><div class="screen-hide-pc popup-box-thanks"style="margin-top:50px;text-align:center" > Chúng tôi đang xử lý yêu cầu của bạn.<br>Vui lòng không bấm nút tắt trình duyệt hay nút tải lại trang.<div class="progress" style="width:50%;margin:20px auto;"><div class="indeterminate"></div></div></div>');
		$('#' + id + '.modal-footer').hide();
	}
	return false;
}

// Init select2
$(".select2").each(function() {
	var $sel = $(this),
		holder = $sel.data('holder'),
		search = $sel.data('search') ? 0 : -1;
	$sel.select2({
		placeholder: holder,
		allowClear: true,
		minimumResultsForSearch: search
	});
});

// Cascading car
function FilterCar(cmaker, cline) {
	cmaker = $(document.getElementById(cmaker));
	cline = $(document.getElementById(cline));

	// Save all cline data
	var data = cline.data('carline'),
		sel = '';
	if (!data) {
		data = [];
		sel = cline.find('option:selected').val();

		cline.find('option[parent]').each(function() {
			var opt = $(this);
			data.push({
				'name': opt.html(),
				'value': opt.val(),
				'parent': opt.attr('parent')
			});
		});
		//console.log(data);

		cline.data('carline', data);
	}

	// Fill cline by cmaker
	var c = cmaker.val();
	cline.html(''); // Clear data
	$.each(data, function(i, d) {
		if (d.parent == '0' || d.parent == c) {
			var opt = '<option value="' + d.value + '">' + d.name + '</option>';
			cline.append(opt);
		}
	});

	// Select default
	cline.val(sel).trigger('change');

	return false;
}
