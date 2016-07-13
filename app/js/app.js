'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TweenMax */
var app = {};

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var month = {
	JAN: {
		days: 31,
		zh: '1月',
		numberic: 1
	},
	FEB: {
		days: 29,
		zh: '2月',
		numberic: 2
	},
	MAR: {
		days: 31,
		zh: '3月',
		numberic: 3
	},
	APR: {
		days: 30,
		zh: '4月',
		numberic: 4
	},
	MAY: {
		days: 31,
		zh: '5月',
		numberic: 5
	},
	JUN: {
		days: 30,
		zh: '6月',
		numberic: 6
	},
	JUL: {
		days: 31,
		zh: '7月',
		numberic: 7
	},
	AUG: {
		days: 31,
		zh: '8月',
		numberic: 8
	},
	SEP: {
		days: 30,
		zh: '9月',
		numberic: 9
	},
	OCT: {
		days: 31,
		zh: '10月',
		numberic: 10
	},
	NOV: {
		days: 30,
		zh: '11月',
		numberic: 11
	},
	DEC: {
		days: 31,
		zh: '12月',
		numberic: 12
	}
}


var calendarContent = "";

var share = {
	facebook: function(href, title){
		href = encodeURIComponent(href || location.href);
		title = encodeURIComponent(title || document.title);
		window.open('https://www.facebook.com/sharer.php?u='+href+'&amp;t='+title);
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

global.month = month;

for(var i = 1; i <= 29; i++){

	calendarContent += '<g>'+i+'</g>';
};

if (location.hash) {
  setTimeout(function() {

    window.scrollTo(0, 0);
  }, 1);
}

$(function(){
    // 定義每個section
	$.each(app, function(name, init){
		// console.log(name);
		if($('.section.' + name).length) {
			init();
		}
		if(name === 'ga'){
			init();
		}
		var id = $('.section.' + name).attr('id');
		range[id] = {};

		if(!$('.section.' + name).length){
			return;
		}
		range[id].top = function(){
			return $('.section.' + name).offset().top;
		};
		range[id].butt = function(){
			return $('.section.' + name).offset().top + $('.section.' + name).outerHeight();
		};
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

		$('body').removeClass('overlay');

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
		share.googleplus();

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


//判斷是否具有屬性
$.fn.hasAttr = function(attributeName){
	var attr = $(this).attr(attributeName);
	if (typeof attr !== typeof undefined && attr !== false) {
		return true;
	}else{
		return false;
	}
};



var scrollTop = 0;

var activeSection = '';

var range = {};


// 捲動至錨點時網址轉換
$(window).on('scroll resize', function(){
	var currentTop = $(window).scrollTop();
	var currentButt = $(window).scrollTop() + $(window).height();
	$.each(app, function(name, init){
		if(name === 'global'){
			return;
		}
		if(!$('.section.' + name).hasAttr('id')){
			return;
		}
		var id = $('.section.' + name).attr('id');
		if(scrollTop < currentTop){
			if(range[id].top() < currentButt && range[id].butt() > currentButt){
				if(activeSection != id){
					activeSection = id;
					console.log('id', id)
					console.log('range[id].top()', range[id].top())
					console.log('range[id].butt()', range[id].butt())
					console.log('activeSection', activeSection)
					history.pushState('#' + activeSection, document.title, '#' + activeSection);
					scrollTop = currentTop;
					var pagename = activeSection + ($('html').hasClass('mobile') ? '_m' : '_p'); 
					ga('send', 'pageview', pagename);
				}
			} 
		}else{
			if(range[id].top() < currentTop && range[id].butt() > currentTop){
				if(activeSection != id){
					activeSection = id;
					history.pushState('#' + activeSection, document.title, '#' + activeSection);
					scrollTop = currentTop;
					ga('send', 'pageview');
				}
			} 
		}
	});
});

