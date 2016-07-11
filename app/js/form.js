'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TweenMax, Waypoint */
app.index = function(){
	// console.log('index initialized');
	// console.log($('#participant-form'))
	$('#participant-form').on('submit', function(e){

		var postObject = {};
		$($(this).serializeArray()).each(function(index, field){
			postObject[field.name] = field.value;
		});

		$.ajax({
			url: 'http://localhost:60671/SaveData.ashx',
			// type: 'json',
			method: 'post',
			data: postObject,
			success: function(r){
				console.log(r);
			}
		});

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	// selectfx.js classie 客製 下拉選單套件
	
	(function() {
		[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
			new SelectFx(el);
		} );
	})();

	

};