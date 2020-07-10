/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

/** 
 * Base64 Object
 * Encode the String: Base64.encode(string);
 * Decode the String: Base64.decode(encoded);
 */
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}


// Phone Click & Tracking 
function PhoneTracking(phone) {
	// Send phone click
	PhoneClick(phone);

	// Phone tracking
	if (typeof goog_report_conversion === 'function') {
		goog_report_conversion('tel:' + phone);
	}
}
function PhoneClick(phone) {
	if (typeof ga !== 'function') return;
	//console.log('Phone click: ' + phone);

	ga('send', 'event', 'Phone', 'click', phone, {
		nonInteraction: true
	});
	ga('clientTracker.send','event', 'Phone', 'click', phone, {
		nonInteraction: true
	});
	return false;
}

// Random phone & save cookie
$('.autorand').each(function() {
	var $rand = $(this),
		phone = [];
	$rand.find('.smartobj .phone').each(function() {
		phone.push($(this).text());
	});
	//console.log(phone);

	// Key for cookie
	var key = phone.join('').replace(/[ -]/g, '');
	key = Base64.encode(key);

	// Random & save
	var cookie = typeof(Cookies) != 'undefined';
	if (cookie) var save = Cookies.getJSON(key);
	if (!cookie || typeof(save) == 'undefined') {
		save = shuffleArray(phone);
		if (cookie) Cookies.set(key, save);
	}
	//console.log(save);

	// Change order
	$.each(save, function(i, v) {
		var $obj = $rand.find('.smartobj:contains("' + v + '")');
		$obj.appendTo($rand);
	});
});

// Add event tracking
$('.smartobj').each(function() {
	var $obj = $(this),
		label = $obj.text(),
		phone = $obj.find('.phone').text();
	phone = phone.replace(/ /g, '');
	//console.log('Call event: ' + label + ' -> ' + phone);

	var handler = 'PhoneClick';
	if($(window).width()<=600) {
		handler = 'PhoneTracking';
		$obj.attr('href', 'tel:' + phone);
	}
	$obj.attr('onclick', handler + "('" + phone + "')");
});
$('.call4mobi').each(function() {
	var $obj = $(this),
		label = $obj.data('phone');
	phone = label.replace(/ /g, '');
	//console.log('Call 4 Mobile: ' + label + ' -> ' + phone);

	$obj.attr('href', 'tel:' + phone);
	$obj.attr('onclick', "PhoneTracking('" + phone + "')");
});


// Banner Click Event
function BannerClick() {
	if (typeof ga !== 'function') return;

	var link = $(this).attr('href'),
		image = $(this).find('img').attr('src');
	//console.log('Banner click: ' + link + ' [' + image + ']');

	ga('send', 'event', 'Banner', 'click', link, {
		nonInteraction: false
	});
	ga('clientTracker.send', 'event', 'Banner', 'click', link, {
		nonInteraction: false
	});

}
$('.carousel .item a').click(BannerClick);
$('.slider .slides a').click(BannerClick);
$('.jssor [data-u="slides"] a').click(BannerClick);


// Tab Click Event
function TabsClick(ev) {
	ev.preventDefault();
	if (typeof ga !== 'function') return;

	var tid = $(this).attr('href'),
		label = $(this).text();
	//console.log('Tabs click: ' + tid + ' [' + label + ']');

	ga('send', 'event', 'Tabs', 'click', label, {
		nonInteraction: true
	});
	ga('clientTracker.send', 'event', 'Tabs', 'click', label, {
		nonInteraction: true
	});
}
$('#floatbar ul li a').click(TabsClick);
$('#sidebar .menudrop ul li a').click(TabsClick);
$('#tab-info .scroll a').click(TabsClick);


// Popup Click Event
function PopupClick(ev) {
	ev.preventDefault();
	if (typeof ga !== 'function') return;

	var pid = $(this).attr('href'),
		label = $(this).text();
	if (pid == null) pid = $(this).data('target');
	//console.log('Popup click: ' + pid + ' [' + label + ']');

	ga('send', 'event', 'Popup', 'click', label, {
		nonInteraction: true
	});
	ga('clientTracker.send', 'event', 'Popup', 'click', label, {
		nonInteraction: true
	});
}
$('.modal-trigger').click(PopupClick);
$('[data-toggle="modal"]').click(PopupClick);


// PageView Event
$('.modal').on('shown.bs.modal', function() {
	if (typeof ga !== 'function') return;

	var pid = $(this).attr('id'),
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
});
