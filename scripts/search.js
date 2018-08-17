/**
 *	Opens the modal for searching
 */
function openSearchModal(){
	$('.search-modal').css('display', 'flex');
	setTimeout(() => {
		$('.search-modal-bg').css('opacity', '1');
	}, 100);
	setTimeout(() => {
		$('.search-modal-c').css('opacity', '1');
		$('.search-modal-c').css('transform', 'translate3d(0px, 0px, 0px)');
	}, 250);
}

/**
 *	Closes the modal for searching
 */
function closeSearchModal(){
	$('.search-modal-c input').val('');
	$('.search-modal').css('display', 'none');
	$('.search-modal-bg').css('opacity', '0');
	$('.search-modal-c').css('opacity', '0');
	$('.search-modal-c').css('transform', 'translate3d(0px, -15px, 0px)');
}