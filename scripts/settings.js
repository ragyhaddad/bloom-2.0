/**
 *	Opens the modal for settings
 */
function openSettings(){
	$('.settings').css('display', 'flex');
	setTimeout(() => {
		$('.settings-bg').css('opacity', '1');
	}, 100);
	setTimeout(() => {
		$('.settings-c').css('opacity', '1');
		$('.settings-c').css('transform', 'translate3d(0px, 0px, 0px)');
	}, 250);
}

/**
 *	Closes the modal for settings.
 */
function closeSettings(){
	$('.settings').css('display', 'none');
	$('.settings-bg').css('opacity', '0');
	$('.settings-c').css('opacity', '0');
	$('.settings-c').css('transform', 'translate3d(0px, -15px, 0px)');
	adjustSettings();
}

/*
 *   Adjusting settings on close of settings modal.
 */
function adjustSettings() {
  d3.select('.main-svg').remove();
  d3.select('.tooltip').remove();
  var range = slider.noUiSlider.get();
  g_settings.follower_slider.min = range[0];
  g_settings.follower_slider.max = range[1];
  g_settings.sort = $('.sort-box')[0].checked;
  drawGraph();
}

/*
 *	Slider functions
 */
var slider = document.getElementById('range');
noUiSlider.create(slider, {
  start: [0, 10000000],
  connect: true,
  behaviour: 'drag',
  range: {
    'min': [0],
    '25%': [10000],
    '50%': [100000],
    '75%': [1000000],
    'max': [10000000]
  },
});
slider.noUiSlider.on('update', () => {
  var range = slider.noUiSlider.get();
  $(".settings-count")[0].innerHTML = parseCountNum(range[0]) + " - " + parseCountNum(range[1]) + " Followers";
});