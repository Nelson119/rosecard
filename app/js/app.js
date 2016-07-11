'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TweenMax */
var app = {};

var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var calendarContent = "";

var share = {
	facebook: function(href, title){
		href = encodeURIComponent(href || location.href);
		title = encodeURIComponent(title || document.title);
		window.open('https://www.facebook.com/sharer.php?u='+href+'t=<urlencoded title>'+title);
	},
	googleplus: function(href){
		href = encodeURIComponent(href || location.href);
		window.open('https://plus.google.com/share?url=' + href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	},
	email: function(href, title){
		href = encodeURIComponent(href || location.href);
		title = encodeURIComponent(title || document.title);
		var body = encodeURIComponent('<a href=\''+href+'\' target=\'_blank\'>'+title+'</a>')
		window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:'+title+'&body='+body+'&bcc=');
	}
};

var global = {};

global.dayOfMonth = dayOfMonth;

for(var i = 1; i <= 29; i++){

	calendarContent += '<g>'+i+'</g>';
};

if (location.hash) {
  setTimeout(function() {

    window.scrollTo(0, 0);
  }, 1);
}

$(function(){
	$.each(app, function(name, init){
		console.log(name);
		if($('.section.' + name).length) {
			init();
		}
	});

	//單元符合頁面大小
	$(window).on('resize',	function(){
		$('.fullpage')
			.height($(window).height())
			.width($(window).width());
		gotoAnchor();
	});


	//觸發第一次調整頁面尺寸
	$(window).trigger('resize');


	//選單burger
	$('.burger').on('click', function(){
		$('body').toggleClass('overlay');
	});

	//捲動到錨點處
	function gotoAnchor(anchor){
		anchor = anchor || location.hash;

		if(!anchor) return;

	    TweenMax.to('html, body', 0.5, {
	    	scrollTop: $(anchor).offset().top
	    });
	}

	//下錨點的按鈕
	$('a').filter(function(){
		var href = $(this).attr('href');
		return /^[#]/.test(href);
	}).on('click', function(e){
		var href = $(this).attr('href');

		gotoAnchor(href);

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	//分享按鈕

	$('.share .facebook').on('click', function(e){
		share.facebook();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	$('.share .googleplus').on('click', function(e){
		share.facebook();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	$('.share .email').on('click', function(e){
		share.email();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

});