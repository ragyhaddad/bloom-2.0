/**
 *	Loads new data into the interface.
 */
function loadInterface(){
	// Load elements
	$('.user-image')[0].src = g_user.image;
	$('.user-name')[0].innerHTML = g_user.username;
	$('.user-followers')[0].innerHTML = parseCount(g_user.follower_count);
	let tracks_html = '';
	g_user.tracks.forEach(track => {
		console.log(track);
		tracks_html += 
			`<li>` +
				`<img src="./images/play-button.svg">` +
				`<p>${track.title}</p>` +
			`</li>`;
	});
	$('.user-tracks')[0].innerHTML = tracks_html;
	// Display elements
	displayInterface();
}

/**
 *	Clears data stored in the interface.
 */
function clearInterface(){
	// Hide elements
	hideInterface();
	// Clear elements
	$('.user-image')[0].innerHTML = '';
	$('.user-name')[0].innerHTML = '';
	$('.user-followers')[0].innerHTML = '';
	$('.user-tracks')[0].innerHTML = '';
}

/**
 *	Hides the user data DOM elements.
 */
function hideInterface(){
	$('.user-info').css('display', 'none');
	$('.user-tracks').css('display', 'none');
	$('.user-info').css('opacity', '0');
	$('.user-tracks').css('opacity', '0');
}

/**
 *	Shows the user data DOM elements.
 */
function displayInterface(){
	$('.user-info').css('display', 'block');
	$('.user-tracks').css('display', 'block');
	setTimeout(() => {
		$('.user-info').css('opacity', '1');
		$('.user-tracks').css('opacity', '1');
	}, 500);
}