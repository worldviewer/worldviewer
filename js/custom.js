var infographic = {
	init: function() {
		var $numbers = $('.num-div').children();
		var $references = $('.slide-div');
		var $zooms = $('.zoom');
		var $narratives = $('.narrative');
		var $labels = $('.thelabel');
		var $nodes = $('.node');
		var $flowtags = $('.flow');

		// Hook the elevateZoom plugin up to the 2 zoomable images
		$.each($zooms, function(index, graphic) {
			$(graphic).elevateZoom({
			zoomType: 'inner',
			cursor: 'crosshair'});
		});

		// I spent some time trying to figure out how to load SVG graphics into the DOM,
		// so that I could modify the SVG text on-the-fly.  This was unsuccessful, but
		// here is the code which I ended up with:
		//
		// $('#flow-a').svg();
		// var svg = $('#flow-a').svg('get'); 
		// svg.load('svg/num-icon.svg', {addTo: true, 
		//         changeSize: false, onLoad: loadDone} ); 
		 
        //    function loadDone(svg, error) { 
	    //    	svg.text(10, 20, error || "A");
	    //    }
	    //
		// console.log(svg);

		// Hide the references to their compact number form on startup
		$.each($references, function(index, slideout) {
			$(slideout).hide();
		});

		// Slide out the references when the corresponding number is clicked
		$.each($numbers, function(index, num) {
			$(num).on('mouseenter', function() {
				$(num).parent().parent().find('.slide-div').animate({'opacity': '1', width: 'toggle'});
			});

			$(num).on('mouseleave', function() {
				$(num).parent().parent().find('.slide-div').animate({'opacity': '0.25', width: 'toggle'});
			});
		});

		// Zoom into the laboratory-generated crater chain in response to mouseover
		$('#EDM-img').on('mouseenter', function() {
			$(this).attr('src','img/EDM-laboratory-crater-chain-zoom.png');
		});

		$('#EDM-img').on('mouseleave', function() {
			$(this).attr('src','img/EDM-laboratory-crater-chain-large.jpg');
		});	

		// Enlarge each node by 4x it's normal size on click.  The easing function comes from jQuery UI
		$.each($nodes, function(index, node) {
			var height = parseInt($(node).css('height'));
			var heightBig = height*4;
			var width = parseInt($(node).css('width'));
			var widthBig = width*4;
			var marginTop = (height - heightBig)/2;
			var marginLeft = (width - widthBig)/2;
			var zIndex = parseInt($(node).css('z-index'));
			var active = false;
			// var link = $(node).data('link');

			$(node).on('click', function() {
				active = ($(node).hasClass('active')) ? true : false;
				if (!active) {
					$(node).addClass('active');
					$(node).css('z-index', '10');
					$(node).animate({'height': heightBig+'px', 'width': widthBig+'px',
						'margin': marginTop+'px '+marginLeft+'px', 'padding': '20px',
						'border-radius': '50px'}, {
						duration: 800,
						specialEasing: {
							height: "easeOutBounce",
							width: "easeOutBounce",
							margin: "easeOutBounce",
							padding: "easeOutBounce",
							"border-radius": "easeOutBounce" }
					});

					// In order to accommodate the opening of links from another click while active,
					// I'll have to create an annotation close icon, eg. "X" at top right
					// $(node).wrap('<a href=' + $(node).data('link') + ' target="_blank"></a>');
				} else {
					$(node).removeClass('active');
					// $(node).unwrap();
					$(node).css('z-index', zIndex);
					$(node).animate({'height': height+'px', 'width': width+'px',
						'margin': '0px 0px', 'padding': '4px',
						'border-radius': '15px'}, {
						duration: 800,
						specialEasing: {
							height: "easeOutBounce",
							width: "easeOutBounce",
							margin: "easeOutBounce",
							padding: "easeOutBounce",
							"border-radius": "easeOutBounce" }
						});
				}

			});

		}); 

		// Experiment: Create a node, and allow its name to be changed w/ double-click
		// This is currently disabled in custom.css.
        $('#node-div').draggable();

	   	$('#node-button').on('dblclick', function(event){ 
	        console.log("clicked: " + event.target.id); 

	        $('#node-input').animate({'opacity': '1', width: 'toggle'});
	        $('#node-button').addClass('editing');
	    });

	    $('#node-input').on('blur', function() {
	    	if ($('#node-input').val() && $('#node-button').hasClass('editing')) {
	    		$('#node-button').removeClass('editing');
	    		$("#node-button").text($('#node-input').val());
	    		$('#node-input').animate({'opacity': '0.25', width: 'toggle'});
	        }
	    });

	    $('#node-input').on('keyup', function(event) {
	    	if ((event.keyCode === 13) && $('#node-input').val() && $('#node-button').hasClass('editing')) {
	    		$('#node-button').removeClass('editing');
	    		$("#node-button").text($('#node-input').val());
	    		$('#node-input').animate({'opacity': '0.25', width: 'toggle'});
	        }
	    });

	    // Experiment: Create the Snap canvas, which by default is 100% window
	    // Currently disabled
	    var s = Snap('#svg');

	    // Experiment: Try to draw a line on the Snap canvas
	    // Currently disabled
	    s.line(0, 0, 60, 600).attr({stroke: "#000000", strokeWidth:3});

		// Problem: elevateZoom appears to break mousenter & mouseleave, which makes
		// it difficult to move the node elements out of the way while zooming

		// $('#Mars-zoom').on('mouseenter', function() {
		// 	$('.obscures-mars-left').animate({'left': '-=100px', 'top': '-=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});

		// 	$('.obscures-mars-right').animate({'left': '+=100px', 'top': '+=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});
		// });	

		// $('#Mars-zoom').on('mouseleave', function() {
		// 	$('.obscures-mars-left').animate({'left': '+=100px', 'top': '+=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});

		// 	$('.obscures-mars-right').animate({'left': '-=100px', 'top': '-=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});
		// });	

		// $('#Phobos-zoom').on('mouseenter', function() {
		// 	$('.obscures-phobos-left').animate({'left': '-=100px', 'top': '-=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});

		// 	$('.obscures-phobos-right').animate({'left': '+=100px', 'top': '-=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});
		// });	

		// $('#Phobos-zoom').on('mouseleave', function() {
		// 	$('.obscures-phobos-left').animate({'left': '+=100px', 'top': '+=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});

		// 	$('.obscures-phobos-right').animate({'left': '-=100px', 'top': '+=100px'}, {
		// 		duration: 800,
		// 		specialEasing: {
		// 			left: "easeOutBounce",
		// 			top: "easeOutBounce" }
		// 		});
		// });	

	} // end init()
} // end infographic

$(document).ready(function() {
	infographic.init();
});