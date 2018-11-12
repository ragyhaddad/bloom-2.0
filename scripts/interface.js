/**
 *	Loads new data into the interface.
 */
function loadInterface(){
	// Load elements
	$('.user-image')[0].src = g_user.image;
	$('.user-name')[0].innerHTML = g_user.username;
	$('.user-followers')[0].innerHTML = parseCount(g_user.followers_count);
	let tracks_html = `<div class="tracks-fade"></div>`;
	if(g_user.tracks.length != 0){
		g_user.tracks.forEach(track => {
			tracks_html += 
				`<li onclick="playTrack(${track.id})">` +
					`<img src="./images/play-button.svg">` +
					`<p>${track.title}</p>` +
				`</li>`;
		});
	}else{
		tracks_html += `<p class="no-tracks">No sounds<br>uploaded</p>`
	}
	$('.user-tracks')[0].innerHTML = tracks_html;
	$('.current-user')[0].innerHTML = `<p>Showing who <span class="strong">${g_user.username}</span> follows.</p>`;
	// Display elements
	displayInterface();
}

/**
 *	Clears data stored in the interface.
 */
function clearInterface(){
	d3.select('.main-svg').remove();
	d3.select('.tooltip').remove();
	$('.click-blocker').css('display', 'block');
	// Hide elements
	hideInterface();
	// Clear elements
	$('.user-image')[0].innerHTML = '';
	$('.user-name')[0].innerHTML = '';
	$('.user-followers')[0].innerHTML = '';
	$('.user-tracks')[0].innerHTML = '';
	$('.current-user')[0].innerHTML = '';
}

/**
 *	Hides the user data DOM elements.
 */
function hideInterface(){
	$('.user-info').css('display', 'none');
	$('.user-info').css('opacity', '0');
	$('.user-tracks').css('display', 'none');
	$('.user-tracks').css('opacity', '0');
	$('.current-user').css('display', 'none');	
	$('.current-user').css('opacity', '0');
	$('.data-display').css('visibility', 'hidden');
	$('.data-display').css('opacity', '0');
}

/**
 *	Shows the user data DOM elements.
 */
function displayInterface(){
	$('.user-info').css('display', 'block');
	$('.user-tracks').css('display', 'block');
	$('.current-user').css('display', 'block');
	$('.data-display').css('visibility', 'visible');
	setTimeout(() => {
		$('.user-info').css('opacity', '1');
		$('.user-tracks').css('opacity', '1');
		$('.current-user').css('opacity', '1');
		$('.data-display').css('opacity', '1');
		if(g_cache.user_history.length > 1){
			$('.back-button').css('transform', 'translate3d(0px, 0px, 0px)');
			$('.back-button').css('opacity', '1');
		}else{
			$('.back-button').css('transform', 'translate3d(-50px, 0px, 0px)');
			$('.back-button').css('opacity', '0');
		}
	}, 100);
}

/**
 *	Anime animations for load-in
 */
var lineDrawing = anime({
  targets: '.title-screen .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 150 + 500 },
  direction: 'forwards'
});
setTimeout(() => {
	$('.user').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.user').css('opacity', '1');
}, 3000);
setTimeout(() => {
	$('.search-buttons').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.search-buttons').css('opacity', '1');
}, 3250);
setTimeout(() => {
	$('.player-buttons').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.player-buttons').css('opacity', '1');
	$('.weekly').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.weekly').css('opacity', '1');
}, 3500);
setTimeout(() => {
	$('.current-user-c').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.current-user-c').css('opacity', '1');
}, 3750);
setTimeout(() => {
	$('.extra-buttons').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.extra-buttons').css('opacity', '1');
	$('.title-screen svg').css('opacity', '0');
}, 4000);
setTimeout(() => {
	$('.logo-watermark').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.logo-watermark').css('opacity', '0.15');
}, 4250);
setTimeout(() => {
	$('.title-screen').css('opacity', '0');
}, 4500);
setTimeout(() => {
	$('.title-screen').css('display', 'none');
}, 5500);

/*
 *	Debug for interface.
 */
if(debug){
	$('.title-screen').css('display', 'none');
	$('.user').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.user').css('opacity', '1');
	$('.search-buttons').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.search-buttons').css('opacity', '1');
	$('.player-buttons').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.player-buttons').css('opacity', '1');
	$('.extra-buttons').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.extra-buttons').css('opacity', '1');
	$('.current-user-c').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.current-user-c').css('opacity', '1');
	$('.logo-watermark').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.logo-watermark').css('opacity', '0.15');
	$('.weekly').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.weekly').css('opacity', '1');
}

let tracksOpen = false;
function openTracks(){
	if(tracksOpen){
		$('.open-track-button').css('transform', 'rotate(0deg)');
		$('.user').css('max-height', '85px');
		if(playerOpen){
			$('.player').css('transform', 'translate3d(0px, 0px, 0px)');
		}else{
			$('.player').css('transform', 'translate3d(0px, 240px, 0px)');
		}
		tracksOpen = false;
	}else{
		$('.open-track-button').css('transform', 'rotate(-180deg)');
		$('.user').css('max-height', '210px');
		if(playerOpen){
			$('.player').css('transform', 'translate3d(0px, -78px, 0px)');
		}
		tracksOpen = true;
	}
}
