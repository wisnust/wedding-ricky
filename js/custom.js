(function () {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	/*----------------------------------------
		Carousel
	----------------------------------------*/
	var owlCarousel = function () {

		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
				"<i class='icon-keyboard_arrow_left owl-direction'></i>",
				"<i class='icon-keyboard_arrow_right owl-direction'></i>"
			],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});

		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			autoplay: true,
			navText: [
				"<i class='icon-keyboard_arrow_left owl-direction'></i>",
				"<i class='icon-keyboard_arrow_right owl-direction'></i>"
			]
		});

		var owl = $('.owl-work');
		owl.owlCarousel({
			stagePadding: 150,
			loop: true,
			margin: 20,
			nav: true,
			dots: false,
			mouseDrag: false,
			autoWidth: true,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout: 2000,
			autoplayHoverPause: true,
			navText: [
				"<i class='icon-chevron-thin-left'></i>",
				"<i class='icon-chevron-thin-right'></i>"
			],
			responsive: {
				0: {
					items: 1,
					stagePadding: 10
				},
				500: {
					items: 2,
					stagePadding: 20
				},
				600: {
					items: 2,
					stagePadding: 40
				},
				800: {
					items: 2,
					stagePadding: 100
				},
				1100: {
					items: 3
				},
				1400: {
					items: 4
				},
			}
		});
	};

	/*----------------------------------------
		Slider
	----------------------------------------*/
	var flexSlider = function () {
		$('.flexslider').flexslider({
			animation: "fade",
			prevText: "",
			nextText: "",
			animationSpeed: 1000,
			slideshow: true,
			controlNav: false,
			animationLoop: true,
			directionNav: false,
			slideshowSpeed: 4000
		});
	}

	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function () {
		var i = 0;
		$('.wedding-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('wedding-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .wedding-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn wedding-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft wedding-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight wedding-animated');
							} else {
								el.addClass('fadeInUp wedding-animated');
							}
							el.removeClass('item-animate');
						}, k * 30, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};

	var navbarState = function () {

		var lastScrollTop = 0;
		$(window).scroll(function () {

			var $this = $(this),
				st = $this.scrollTop(),
				navbar = $('.wedding-navbar');

			if (st > 400) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled');
			}

			if (st > lastScrollTop) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('awake');
				}
			} else {
				if (navbar.hasClass('scrolled')) {
					navbar.addClass('awake');
				}
			}
			lastScrollTop = st;

		});
	};




	var stellarInit = function () {
		if (!isMobile.any()) {
			$(window).stellar();
		}
	};



	// Page Nav
	var clickMenu = function () {

		$('.navbar-nav a:not([class="external"])').click(function (event) {

			var section = $(this).data('nav-section'),
				navbar = $('.navbar-nav');
			if (isMobile.any()) {
				$('.navbar-toggle').click();
			}
			if ($('[data-section="' + section + '"]').length) {
				$('html, body').animate({
					scrollTop: $('[data-section="' + section + '"]').offset().top
				}, 500, 'easeInOutExpo');
			}

			event.preventDefault();
			return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function (section) {

		var $el = $('.navbar-nav');
		$el.find('li').removeClass('active');
		$el.each(function () {
			$(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function () {

		var $section = $('section[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: '150px'
		});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () { return -$(this.element).height() - 155; }
		});

	};

	var dateCountDown = function () {
		$('.date-countdown').simplyCountdown({
			year: 2021, // year
			month: 3, // month
			day: 28, // day
			hours: 22, // Default is 0 [0-23] integer
			minutes: 0, // Default is 0 [0-59] integer
			seconds: 0, // Default is 0 [0-59] integer
		});
	};

	var magnificPopupControl = function () {


		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function (openerElement) {
					// openerElement is the element on which popup was initialized, in this case its <a> tag
					// you don't need to add "opener" option if this code matches your needs, it's defailt one.
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function (item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	};



	$(function () {
		contentWayPoint();
		navbarState();
		stellarInit();
		clickMenu();
		navigationSection();
		dateCountDown();
		magnificPopupControl();
	});

	$(window).load(function () {
		flexSlider();
	});

	// Send data to firebase
	var invitation = function () {

		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyAm05fI_oYuaknsHRZ-V5XprwansegNbvs",
			authDomain: "wedding-lili-c6cb7.firebaseapp.com",
			databaseURL: "https://wedding-lili-c6cb7.firebaseio.com",
			projectId: "wedding-lili-c6cb7",
			storageBucket: "wedding-lili-c6cb7.appspot.com",
			messagingSenderId: "408146927393"
		};
		firebase.initializeApp(config);

		// Initialize Cloud Firestore through Firebase
		var db = firebase.firestore();
		var settings = { timestampsInSnapshots: true };
		db.settings(settings);


		// Listen for #invitation-form submitted
		$('#invitation-form').on('submit', function (e) {
			e.preventDefault();
			var buttonSubmit = $(this).find('button')  // Submit button
			buttonSubmit.attr("disabled", true)
			$("#name").attr("disabled", true)
			$("#email").attr("disabled", true)
			$("#phone").attr("disabled", true)
			$("#pesan").attr("disabled", true)

			// Add a new document with a generated id.
			db.collection("invitations").add({
				name: $("#name").val(),
				email: $("#email").val(),
				phone: $("#phone").val(),
				message: $("#pesan").val(),
				createdAt: new Date(),
			})
				.then(function (docRef) {
					$("#name").val("")
					$("#email").val("")
					$("#phone").val("")
					$("#pesan").val("")

					buttonSubmit.attr("disabled", false) // Submit button
					$("#name").attr("disabled", false)
					$("#email").attr("disabled", false)
					$("#phone").attr("disabled", false)
					$("#pesan").attr("disabled", false)
					alert("Terima kasih!")
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(function (error) {
					buttonSubmit.attr("disabled", false) // Submit button
					$("#name").attr("disabled", false)
					$("#email").attr("disabled", false)
					$("#phone").attr("disabled", false)
					$("#pesan").attr("disabled", false)
					alert("Opps gagal!")
					console.error("Error adding document: ", error);
				});

		})
	}
	invitation();

})();

$(document).ready(function () {

	var typed = new Typed('#typed-one', {
		strings: ["Kami mengadakan acara resepsi", " tanggal <span class='date-hero'>28 Maret 2021</span>. Save the date!"],
		typeSpeed: 80,
	});

});