/**
 *	Globals for player.
 */
let playerOpen = false;

/**
 * 	Plays a track on click.
 * 
 *	@param {int} id - The track id 
 */
function playTrack(id){
	// Create playlist
	g_cache.playlist = g_user.likes;
	// Play track
	if(!playerOpen){
		openPlayer();
	}
	$('.player iframe')[0].attributes.src.nodeValue = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
}

/**
 *	Handling the player button.
 */
$('.player-button').on('click', () => {
	if(playerOpen){
		closePlayer();
	}else{
		openPlayer();
	}
})

/**
 *	Open the media player.
 */
function openPlayer(){
	if(tracksOpen){
		$('.player').css('transform', 'translate3d(0px, -78px, 0px)');
	}else{
		$('.player').css('transform', 'translate3d(0px, 0px, 0px)');
	}
	$('.player').css('opacity', '1');
	playerOpen = true;
}

/**
 *	Close the media player.
 */
function closePlayer(){
	$('.player').css('transform', 'translate3d(0px, 240px, 0px)');
	$('.player').css('opacity', '0');
	playerOpen = false;
}