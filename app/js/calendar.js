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

	d3.json('balls.json', function(error, root) {
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
						console.log(this);
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
						console.log(this);
				});


			var g = group.append('g')
				.attr('class', 'spin');

				
			// var mobile.g = mobile.group.append('g')
			// 	.attr('class', 'spin');

			$('#balls .group').each(function(i,d){
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

				blueRim.on('hover', function(){

				});
			});

			$('#ballsMobile .group').each(function(i,d){
				var blueRim = hover.clone();
				var r = $('circle', d).attr('r');
				if($('html.firefox').length ){
					TweenMax.set(blueRim, {
						scale: $('circle', d).attr('r') * ratio,
						// x: -258,// + (r - 15) / 1.5,
						// y: -370 + (r - 5) / 2.5,
						// opcity: 0
					});
					// TweenMax.set($(blueRim), {

					// 	'transform-origin': 'center center 0',
					// 	'scale': 10
					// });
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
			});

			TweenMax.to($('#ballsMobile .node'),0,{x:'-=' + $(window).width() * 0.5});

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
};