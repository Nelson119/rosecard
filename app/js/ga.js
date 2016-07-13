'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TweenMax */
app.ga = function(){
	// console.log('ga initialized');

	// 上方選單
	$('a').filter(function(){
		return $(this).hasAttr('data-ga');
	}).on('click', function(){
		if($('html.mobile').length){
			ga('send', 'event', {
				eventCategory: 'event',
				eventAction: 'click',
				eventLabel: $(this).attr('data-ga').replace('_p','_m')
			});
		}else{
			ga('send', 'event', {
				eventCategory: 'event',
				eventAction: 'click',
				eventLabel: $(this).attr('data-ga')
			});
		}

	});
};