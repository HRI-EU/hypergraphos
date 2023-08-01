/**	
	* Template Name: App Landy
	* Version: 1.0	
	* Template Scripts
	* Author: MarkUps
	* Author URI: http://www.markups.io/

	Custom JS
	
	1. MENU SLIDE
	2. MENU SMOOTH SCROLLING
	3. SCREEN SLIDER (SLICK SLIDER)
	4. FANCYBOX
	5. TESTIMONIAL SLIDE (SLICK SLIDER)
	6. PRELOADER
	7. WOW ANIMATION
	8. MOBILE MENU CLOSE 
	9. PRELOADER 
	10. INSTAGRAM SLIDER (SLICK SLIDER)
	11. WOW ANIMATION 	
	
**/

jQuery(function($){

	/* ----------------------------------------------------------- */
	/*  1. MENU SLIDE
	/* ----------------------------------------------------------- */ 

	var menuRight = document.getElementById( 'main-menu' ),
		showRight = document.getElementById( 'menu-btn' ),
		close = document.getElementById( 'close' ),								
		body = document.body;

	window.onload = function() {
		showRight.onclick = function(e) {
			e.preventDefault();
			classie.toggle( this, 'active' );
			classie.toggle( menuRight, 'menu-open' );			
		};

		close.onclick = function() {
			menuRight.hide();						
		};

		menuRight.onclick = function() {
			classie.toggle( this, 'active' );
			classie.toggle( menuRight, 'menu-open' );				
		};
	};
			
	/* ----------------------------------------------------------- */
	/*  2. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */ 

	//MENU SCROLLING WITH ACTIVE ITEM SELECTED

	jQuery(".main-nav a").click(function(event){
		event.preventDefault();
		//calculate destination place
		var dest=0;
		if($(this.hash).offset().top > $(document).height()-$(window).height()){
		  dest=$(document).height()-$(window).height();
		}else{
		  dest=$(this.hash).offset().top;
		}
		//go to destination
		$('html,body').animate({scrollTop:dest}, 1000,'swing');
    });

	

	/* ----------------------------------------------------------- */
	/*  3. SCREEN SLIDER (SLICK SLIDER)
	/* ----------------------------------------------------------- */

	jQuery('.screenshots-slide').slick({
	  dots: true,
	  infinite: true,
	  arrows:true, 
 	  centerMode: true,
  	  centerPadding: '60px',  
	  slidesToShow: 3,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]
	});

	/* ----------------------------------------------------------- */
	/*  4. FANCYBOX 
	/* ----------------------------------------------------------- */

	jQuery(document).ready(function() {
		$(".fancybox").fancybox();
	});	 

	/* ----------------------------------------------------------- */
	/*  5. TESTIMONIAL SLIDE(SLICK SLIDER)
	/* ----------------------------------------------------------- */

	jQuery('.testimonial-slider').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		arrows:false, 
		autoplay: true,     
      	slidesToShow: 1,
		slide: 'div',		
		cssEase: 'linear'
	});
	

	/* ----------------------------------------------------------- */
	/*  6. PRELOADER 
	/* ----------------------------------------------------------- */ 
	
	jQuery(window).load(function() { // makes sure the whole site is loaded
      $('#status').fadeOut(); // will first fade out the loading animation
      $('#preloader').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $('body').delay(100).css({'overflow':'visible'});
    })

   
	/* ----------------------------------------------------------- */
	/*  7. WOW ANIMATION
	/* ----------------------------------------------------------- */ 

	wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    );
    wow.init();
	
});