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
	$('#search-input').focus();
}

/**
 *	Closes the modal for searching
 */
function closeSearch(){
	clearSearch();
	$('.search-modal-c input').val('');
	$('.search-modal').css('display', 'none');
	$('.search-modal-bg').css('opacity', '0');
	$('.search-modal-c').css('opacity', '0');
	$('.search-modal-c').css('transform', 'translate3d(0px, -15px, 0px)');
}

/**
 *	Search a SoundCloud Username.
 *	Note: Search results are stored in SearchResults.collection
 *
 * 	@param {String} - Search Term (Username)
 */
function searchInput(searchTerm){
	clearSearch();
	var proxy = 'https://cors-anywhere.herokuapp.com/';
	var url = 'https://api-v2.soundcloud.com/search/users?q=' + searchTerm + '&sc_a_id=1331a031-e3c8-415e-894d-f1458fcbe40a&variant_ids=1053&facet=place&user_id=851332-319840-3643-205054&client_id=lj8dF0xi5RcKDD1dLa6IOY6orLH3uBJW&limit=10&offset=0&linked_partitioning=1&app_version=1527169554&app_locale=en';
	var fullurl = proxy + url;
	fetch(fullurl)
	  .then((response) => {
			return response.json();
	  })
	  .then((searchResults) => {
			loadSearch(searchTerm, searchResults.collection);
	  })
	  .catch((error) => {
			console.log(error);
	  });
}

/**
 *	Start the searching on click or enter key
 */
function startSearch(){
	if($('#search-input').val()){
		$('.search-results').css('display', 'none').css('opacity', '0');
		searchInput($('#search-input').val());
	}
}
$('#search-input').on('keypress', function(event){
	if (event.which == 13 || event.keyCode == 13) {
		startSearch();
	}
});

/**
 *	Load the search results
 */
function loadSearch(search_term, results){
	html = '';
	if(results.length > 0){
		results.forEach(element => {
			html += `<li onclick="searchEntryClicked('${element.permalink}')" class="search-item">` +
					`<img src="${element.avatar_url}" draggable="false">` +
					`<div class="search-user-info">` +
						`<h3>${element.username}</h3>` +
						`<p>${parseCount(element.followers_count)}</p>` +
					`</div>` +
				`</li>`;
		});
	}
	else{
		html = `<p class="no-result">No results for <strong>${search_term}</strong> could be found.</p>`;
	}
	$('.search-results')[0].innerHTML = html;
	$('.search-results').css('display', 'block');
	setTimeout(() => {
		$('.search-results').css('opacity', '1');
	}, 100);
}

/**
 *	Clear the search results
 */
function clearSearch(){
	$('.search-results')[0].innerHTML = '';
}

/**
 *	Load a clicked user to DOM
 */
function searchEntryClicked(permalink){
	closeSearch();
	fetchUser(permalink);
}