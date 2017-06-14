$(document).ready(function(){
	var carousel_interval = 10000;

	$('.carousel.carousel-slider').carousel({
		fullWidth: true
	});
	setInterval(function(){
		$('.carousel.carousel-slider').carousel('next');
	}, carousel_interval);

	$('.parallax').parallax();
})