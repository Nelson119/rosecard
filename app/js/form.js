'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TweenMax, Waypoint, FB */
app.form = function(){
	// console.log('index initialized');
	// console.log($('#participant-form'))
	var status;

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1569869039984242',
			xfbml      : true,
			version    : 'v2.6'
		});

		FB.getLoginStatus(function(r){
			status = r.status;
		});
	};


	function send(){

		var sMonth = $("#sMonth").val();
		var sDay = $("#sDay").val();


		var postObject = {
			sFBUID: $("#sFBUID").val(),
			sFBDisplayName: $("#sFBDisplayName").val(),
			sDay: (sMonth < 10 ? '0' : '') + sMonth + "/" + (sDay < 10 ? '0' : '') + sDay,
			sDayType: $("#sDayType").val(),
			sDayName: $("#sDayName").val(),
			sDayContent:$("#sDayContent").val(),
			sAD: $("#sAD").val()
		};


		$.ajax({
			url: 'SaveData.ashx',
			type: 'json',
			method: 'post',
			data: postObject,
			success: function(r){
				r = $.parseJSON(r);
				if(r.Success === 1){
					var id = r.Msg;
					$('.form .go-button').on('click', function(){
						// share.facebook('http://www.roseanniversary.com.tw/rose/?sid=' + id);
						FB.ui({
							method: 'feed',
							link: 'http://www.roseanniversary.com.tw/rose?sid=5',
							caption: 'hello',
							picture: 'http://www.roseanniversary.com.tw/getimage.ashx?sid=5'
						}, function(response){
							//console.log('https://www.facebook.com/' + response.post_id)
						});

					});
					$('.form .thankyou').removeClass('hide').fadeIn(250);
				}else{
					alert(r.Msg)
				}
			}
		});

	}

	$('#participant-form').on('submit', function(e){

		if(!$('#agree-term').is(':checked')){
			alert('請先同意使用規範')
			return false;
		}

		if(status === 'connected'){
			send();
			FB.api('/me', function(me){
				$('#sFBUID').val(me.id);
				$('#sFBDisplayName').val(me.name);
				$('.form .thankyou').show();
				send();
			});
		}else{
			FB.login(function(r){
				if(r.status ==='connected'){
					FB.api('/me', function(me){
						$('#sFBUID').val(me.id);
						$('#sFBDisplayName').val(me.name);
						$('.form .thankyou').show();
						send();
					});
				}else{
					alert('請先同意存取你的基本資料');
				}
			},{});
		}


		e.stopPropagation();

		e.preventDefault();

		return false;
	});


	// selectfx.js classie 客製 下拉選單套件
	
	(function() {
		[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
			el.labels = $('<i></i>');
			new SelectFx(el);
		} );
	})();

	

};
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));