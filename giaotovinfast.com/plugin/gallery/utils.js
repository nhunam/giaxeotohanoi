// Always load jQuery
window.jQuery || document.write('<script src="//code.jquery.com/jquery-2.1.4.min.js"><\/script>');

// Prevent load same file
var loaded = [];

function LoadStyle(path){
    // Did we load the stylesheet already?
    if(loaded[path]) return;
    loaded[path] = true;
	
    // Actually load the stylesheet
    $('<link>')
		.appendTo('head')
		.attr({type : 'text/css', rel : 'stylesheet'})
      	.attr('href', path);
}

function LoadScript(path){
    // Did we load the the JavaScript file already?
    if(loaded[path]) return;
    loaded[path] = true;
	
    // Actually load the javascript
	document.write('<script src="'+path+'"><\/script>');
}


function ScaleSlider() {
	$('.jssorslider').each(function(){
		var jssor = $(this).data('jssor');
		if(jssor!=null) {
			var parentWidth = jssor.$Elmt.parentNode.clientWidth;
			if (parentWidth) jssor.$ScaleWidth(parentWidth);
			else window.setTimeout(ScaleSlider, 30);
		}
	});
}

window.onload = function(){
	ScaleSlider();
	$(window).resize(ScaleSlider);
}