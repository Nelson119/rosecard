'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TweenMax */
app.calendar = function(){
	// console.log('index initialized');


	//月份文字向量圖
	$('.calendar nav a').each(function(index, element){
		var month = $(element).html().toLowerCase();
		$.get('img/calendar/'+ month + '.svg', function(svgDoc){
			var svg = $('svg', svgDoc);
			$(element).html(svg);
		});
	});

 
	var width = 960,
		height = 485,
	    format = d3.format(',d'),
	    color = d3.scale.category20c();

	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([width, height])
	    .padding(50);

	var svg = d3.select('#balls')
	    .attr('width', width)
	    .attr('height', height)
	    .attr('class', 'bubble');

    var mobile = {
		width: $('#ballsMobile').width(),
		height:  $('#ballsMobile').height(),
		format: d3.format(',d'),
		color: d3.scale.category20c()
	};

	mobile.bubble = d3.layout.pack()
		.sort(null)
		.size([mobile.width, mobile.height])
		.padding(5);

	mobile.svg = d3.select('#ballsMobile')
		.attr('width', mobile.width)
		.attr('height', mobile.height)
		.attr('class', 'bubble');

	var dayOfMonth = [];


	d3.json('http://www.roseanniversary.com.tw/GetMonthCount.ashx', function(error, root) {
		if (error) throw error;

		$.get('img/common/ball-rim.svg',function(rim){

			var hover = $('svg >g >g', rim);

			var ratio = 0.31 / 74.17043433322955;



			var node = svg.selectAll('.node')
				.data(bubble.nodes(classes(root))
				.filter(function(d) { return !d.children; }))
				.enter().append('g')
				.attr('class', 'node')
				.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

			mobile.node = mobile.svg.selectAll('.node')
				.data(bubble.nodes(classes(root))
				.filter(function(d) { return !d.children; }))
				.enter().append('g')
				.attr('class', 'node')
				.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

			var group = node.append('g')
				.attr('class', 'group');

			mobile.group = mobile.node.append('g')
				.attr('class', 'group');

			group.append('circle')
				.attr('r', function(d) { return d.r * 1.2; })
				.style('fill', 'url("#img1")');

			group.append('text')
				.attr('dy', '-0.8em')
				.attr('fill', '#ffffff')
				.attr('font-size', function(d) { return d.r *0.4; })
				.style('text-anchor', 'middle')
				.text(function(d) { return d.className; });

			group.append('g')
				.attr('dy', '-0.8em')
				.attr('fill', '#333')
				.attr('font-size', function(d) { return d.r *0.05; })
				.style('text-anchor', 'middle')
				.text(function(d, index) {
					for(var i = 1; i <= dayOfMonth[index]; i++){
						$(this).append('<g></g>');
					}
						// console.log(this);
				});
			

			mobile.group.append('circle')
				.attr('r', function(d) { return d.r * 1.2; })
				.style('fill', 'url("#img2")');

			mobile.group.append('text')
				.attr('dy', '-0.8em')
				.attr('fill', '#ffffff')
				.attr('font-size', function(d) { return d.r *0.4; })
				.style('text-anchor', 'middle')
				.text(function(d) { return d.className; });

			mobile.group.append('g')
				.attr('dy', '-0.8em')
				.attr('fill', '#333')
				.attr('font-size', function(d) { return d.r *0.05; })
				.style('text-anchor', 'middle')
				.text(function(d, index) {
					for(var i = 1; i <= dayOfMonth[index]; i++){
						$(this).append('<g></g>');
					}
						// console.log(this);
				});


			var g = group.append('g')
				.attr('class', 'spin');

				
			// var mobile.g = mobile.group.append('g')
			// 	.attr('class', 'spin');

			$('#balls .group').each(function(i, d){
				var blueRim = hover.clone();
				var r = $('circle', d).attr('r');
				if($('html.firefox').length ){
					TweenMax.set(blueRim, {
						scale: $('circle', d).attr('r') * ratio,
						x: -450 + (r - 15) / 1.43,
						y: -244,
						opcity: 0
					});
				}else{
					TweenMax.set(blueRim, {
						scale: $('circle', d).attr('r') * ratio,
						x: -20 + 18 - r * 1.1 ,
						y: -20 + 18 - r * 1.1 ,
						opcity: 0
					});
				}
				$(this).append(blueRim);

				$(this).attr('onclick', 'alert(1)');
				this.onclick = function(){
					$('.slick-info .show-detail ').slick('slickGoTo', i);
					TweenMax.to('.slick-info', 0.5, {height: 'auto'});
				};
			});

			$('#ballsMobile .group').each(function(i,d){
				var blueRim = hover.clone();
				var r = $('circle', d).attr('r');
				console.log(-175/r)
				if($('html.firefox').length ){
					TweenMax.set(blueRim, {
						x: r*-175,// + (r - 15) / 1.5,
						y: -240, //+ (r - 5) / 2.5,
						 opcity: 1
					});
					TweenMax.set($(blueRim), {
						scale: r / 541 * 2
					});
					// TweenMax.set($('>g', blueRim), {

					// 	'transform-origin': 'left top 0',
					// 	'scale': 0.01
					// });
				}else{
					TweenMax.set(blueRim, {
						scale: $('circle', d).attr('r') * ratio,
						x: -20 + 18 - r * 1.1 ,
						y: -20 + 18 - r * 1.1 ,
						opcity: 0
					});
				}
				$(this).append(blueRim);

				blueRim.on('hover', function(){

				});
				this.onclick = function(){
					$('.slick-info .show-detail ').slick('slickGoTo', i);
					TweenMax.to('.slick-info', 0.5, {height: 'auto'});
				};

			});


			$(window).unbind('resize').on('resize',function(){
				TweenMax.to('#ballsMobile',0.1,{
					x:-130000 / $(window).width() + 0.18 * $(window).width()
				});
			}).trigger('resize');

		});


	});

	// Returns a flattened hierarchy containing all leaf nodes under the root.
	function classes(root) {
		var classes = [];

		function recurse(name, node) {
			if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
			else classes.push({packageName: name, className: node.name, value: node.size});
		}

		recurse(null, root);
		return {children: classes};
	}

	d3.select(self.frameElement).style('height', height + 'px');

	var fakeMonthDay = [];

	for(var i=0;i<31;i++){
		fakeMonthDay.push({
			Day: i,
			Count: Math.floor(Math.random() * 20)
		});
	}

	function fakeDayData(mon){
		var fakeDay = [];
		for(var i=0;i<Math.floor(Math.random() * 20);i++){
			fakeDay.push({
				sFBDisplayName: '石愛玲',
				sDayName: 'FIRE老闆紀念日',
				sDayContent: '從心發現新加坡」超值旅遊行程台新銀行、旅遊局、旅行社... 台新銀行東京分行日本政府核發營業執照 · 暑假瘋電影台新銀行推刷卡購票最低66折又免簽單 · 台新銀行 ...從心發..'
			});
		}
		return fakeDay;
	}


	var monthIndex = 1;
	$.each(global.month, function(name, mon){
		var container = $('.slick-info .template li').clone();
		$('.month-name-zh', container).html(mon.zh);
		$('.month-name', container).html(name);
		$('figure', container).addClass('calendar-'+mon.days);

		var post = $('.slick-info .template .post').clone();
		$('.post-list', container).html('');
		addDayButton($('figure', container), mon);

		// $(fakeDay).each(function(i, day){
		// 	var dayElement = post.clone();
		// 	$('.date', dayElement).html((monthIndex<10?'0':'') +monthIndex + '/' + (i<10?'0':'') + (i + 1));
		// 	$('.title', dayElement).html(day.sDayName);
		// 	$('.summary', dayElement).html(day.sDayContent);
		// 	$('.post-list', container).append(dayElement);
		// });
		container.appendTo($('.slick-info .show-detail'));
		monthIndex++;
	});
	$('.slick-info .show-detail').slick({
		dots: false,
		fade: true
	});
	$('.slick-info .close').on('click', function(){
		TweenMax.to('.slick-info', 0.5, {
			height: 0
		});
	});
	// $('.post-list').jScrollPane();


	//每一天按鈕
	function addDayButton(ele, month){
		var nav = $('<section></section>')
			.addClass('row');

		$.ajax({
			url: 'http://www.roseanniversary.com.tw/GetMonth.ashx',
			type: 'json',
			method: 'post',
			data: {sMonth: month.numberic < 10 ? '0' : '' + month.numberic},
			success: function(r){
				var r = $.parseJSON(r);
				$.each(r,function(i,d){

					var link = $('<a></a>')
						.html(i)
						.attr('data-day', i)
						.addClass('day himalaya fontsize-17 col-lg-1 col-md-1 col-sm-1 col-xs-1')
						.attr('href', 'javascript:');
					link.on('click', clickDay);
				});
			}
		});
		for(var i=1;i<=month.days;i++){

			var link = $('<a></a>')
				.html(i)
				.attr('data-day', i)
				.addClass('day himalaya fontsize-17 col-lg-1 col-md-1 col-sm-1 col-xs-1')
				.attr('href', 'javascript:');



			nav.append(link);
			ele.append(nav);

			if(i == 2 || i == 9 || i == 16 || i == 23 || i == 30 || i == 31){
				nav.append('<div class=\'visible-sm visible-xs col-sm-12 col-xs-12 gap\'></div>')
			}

		}

	}

	//展開一天
	function clickDay(e){
		var btn = this;
		var day = $(btn).attr('data-day') * 1;
		$.ajax({
			url: 'http://www.roseanniversary.com.tw/GetDay.ashx',
			type: 'json',
			method: 'post',
			data: {sDay: (day < 10 ? '0' : '') + day},
			success: function(r){
				var container = $(btn).parents('.slick-slide').find('.post-list');
				var content = container;
				if($('.jspPane', container).length){
					content = $('.jspPane', container);
				}
				content.html('');
				var singluar = $('.slick-info .template .post-list .post').clone();
				$.each(dayContent, function(idx, post){
					var s = singluar.clone();
					$('.date', s).html(
						(month.numberic < 10 ? '0' : '') + month.numberic 
						+ '/' + 
						(day < 10 ? '0' : '') + day
					);
					$('.title', s).html(post.sDayName + idx);
					$('.summary', s).html(post.sDayContent);
					console.log($('.date', s).html());
					content.append(s);

				});
				if(container.data('jsp')){
					container.data('jsp').reinitialise();
				}else{
					container.jScrollPane();
				}
			}
		});
	}
};