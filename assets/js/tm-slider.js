(function($) {
    "use strict";

	// Listen for events.
	window.addEventListener("load", uagbTmFunc);

	// Callback function for all event listeners.
	function uagbTmFunc() {
		
		if( $('.wp-block-uagb-testimonial').length > 0){
			return true;
		}else{
			var testimonial            = $('.uagb-testomonial__outer-wrap');
			testimonial.each(function() {
				var slider_data     = $(this).data("slider"),
					data            = slider_data[0],
					block_id        = data.block_id,
					columns         = data.columns,
					autoplaySpeed   = data.autoplaySpeed,
					autoplay        = data.autoplay,
					infiniteLoop    = data.infiniteLoop,
					pauseOnHover    = data.pauseOnHover,
					transitionSpeed = data.transitionSpeed,
					tcolumns        = data.tcolumns,
					arrowSize       = data.arrowSize,
					arrowColor 	    = data.arrowColor,
					mcolumns        = data.mcolumns;

					var settings = {
						slidesToShow : columns,
						slidesToScroll : 1,
						autoplaySpeed : autoplaySpeed,
						autoplay : autoplay,
						infinite : infiniteLoop,
						pauseOnHover : pauseOnHover,
						speed : transitionSpeed,
						arrows : true,
						dots : true,
						rtl : false,
						nextArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button" style="border-color: '+arrowColor+'"><span class="dashicons-arrow-left-alt2 dashicons" style= "font-size:'+arrowSize+';color: '+arrowColor+'"></span></button>',
						prevArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button" style="border-color: '+arrowColor+'"><span class="dashicons-arrow-right-alt2 dashicons" style= "font-size:'+arrowSize+';color: '+arrowColor+'" ></span></button>',
						responsive : [
							{
								breakpoint : 1024,
								settings : {
									slidesToShow : tcolumns,
									slidesToScroll : 1,
								}
							},
							{
								breakpoint : 767,
								settings : {
									slidesToShow : mcolumns,
									slidesToScroll : 1,
								}
							}
						]
					}
				$( '#uagb-testimonial-'+block_id ).find( '.is-carousel' ).slick( settings );
			})
		}
	}

 })(jQuery);

