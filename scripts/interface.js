/**
 *	Loads new data into the interface.
 */
function loadInterface(){
	clearInterface();
	// Load elements
	$('.user-image')[0].src = g_user.image;
	$('.user-name')[0].innerHTML = g_user.username;
	$('.user-followers')[0].innerHTML = parseCount(g_user.follower_count);
	let tracks_html = `<div class="tracks-fade"></div>`;
	g_user.tracks.forEach(track => {
		tracks_html += 
			`<li onclick="playTrack(${track.id})">` +
				`<img src="./images/play-button.svg">` +
				`<p>${track.title}</p>` +
			`</li>`;
	});
	$('.user-tracks')[0].innerHTML = tracks_html;
	$('.current-user')[0].innerHTML = `<p>Showing who <span class="strong">${g_user.username}</span> follows.</p>`;
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
	$('.current-user')[0].innerHTML = '';
	$('.data-display')[0].innerHTML = '';
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
	$('.data-display').css('display', 'none');	
	$('.data-display').css('opacity', '0');
}

/**
 *	Shows the user data DOM elements.
 */
function displayInterface(){
	$('.user-info').css('display', 'block');
	$('.user-tracks').css('display', 'block');
	$('.current-user').css('display', 'block');
	$('.data-display').css('display', 'block');
	setTimeout(() => {
		$('.user-info').css('opacity', '1');
		$('.user-tracks').css('opacity', '1');
		$('.current-user').css('opacity', '1');
		$('.data-display').css('opacity', '1');
	}, 150);
}