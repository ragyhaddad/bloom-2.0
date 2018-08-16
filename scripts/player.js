let playerOpen = false;

/**
 * 	Plays a track on click.
 * 
 *	@param {int} id - The track id 
 */
function playTrack(id){
	// Create playlist
	g_playlist = g_user.tracks.concat(g_user.likes);

	// Play track
	if(!playerOpen){
		openPlayer();
	}
	$('.player iframe')[0].attributes.src.nodeValue = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
}

$('.player-button').on('click', () => {
	if(playerOpen){
		closePlayer();
	}else{
		openPlayer();
	}
})
function openPlayer(){
	$('.player').css('transform', 'translate3d(0px, 0px, 0px)');
	$('.player').css('opacity', '1');
	playerOpen = true;
}
function closePlayer(){
	$('.player').css('transform', 'translate3d(0px, 240px, 0px)');
	$('.player').css('opacity', '0');
	playerOpen = false;
}