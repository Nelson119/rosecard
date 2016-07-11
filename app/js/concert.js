'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TweenMax */
app.concert = function(){
	// console.log('index initialized');

	$('.phase').each(function(i, d){
		var oneDay = 1000 * 60 * 60 * 24;
		var start = $(this).attr('data-start') ? new Date($(this).attr('data-start')) : new Date();
		var end = $(this).attr('data-end') ? new Date(new Date($(this).attr('data-end')) * 1 + oneDay) : new Date(new Date() * 1 + oneDay);
		var now = new Date();

		if(now >= start && now < end){
			$(this).removeClass('hide');
		}
	});
};