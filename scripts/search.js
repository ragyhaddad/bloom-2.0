/**
 *	Opens the modal for searching
 */
function openSearch(){
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
function closeSearch(){
	$('.search-modal-c input').val('');
	$('.search-modal').css('display', 'none');
	$('.search-modal-bg').css('opacity', '0');
	$('.search-modal-c').css('opacity', '0');
	$('.search-modal-c').css('transform', 'translate3d(0px, -15px, 0px)');
}

/**
 * Search a SoundCloud Username.   Note: Search results are stored in SearchResults.collection
 * @param {String} - Search Term (Username)
 */
function searchInput(searchTerm){
	var proxy = 'https://cors-anywhere.herokuapp.com/';
	var url = 'https://api-v2.soundcloud.com/search/users?q=' + searchTerm + '&sc_a_id=1331a031-e3c8-415e-894d-f1458fcbe40a&variant_ids=1053&facet=place&user_id=851332-319840-3643-205054&client_id=lj8dF0xi5RcKDD1dLa6IOY6orLH3uBJW&limit=10&offset=0&linked_partitioning=1&app_version=1527169554&app_locale=en';
	var fullurl = proxy + url;
	fetch(fullurl)
	  .then((response) => {
		return response.json();
	  })
	  .then((searchResults) => {
		console.log(searchResults.collection);
	  })
	  .catch((error) => {
		console.log(error);
	  });
}

/**
 * Load the search results
 * @param {None}
 */
function loadSearch(){

}

/**
 *  Load a clicked user to DOM
 *  @param {None}
 */
function searchEntryClicked(){


}