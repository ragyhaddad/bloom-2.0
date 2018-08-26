/**
 * Load 5 featured artists
 */
function loadFeaturedArtists(){
    html = '';
    g_weekly.featured_artists.forEach(artist => {
        fetch(`https://api.soundcloud.com/users/${artist}?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd`)
        .then((response) => {
            return response.json();
        })
        .then((data)=>{
            $('.featured-artists')[0].innerHTML += `<li onclick="fetchUser('${data.permalink}')">` +
			    `<img src="${data.avatar_url}" draggable="false">` +
				`<div class="featured-info">` +
					`<h3>${data.username}</h3>` +
					`<p>${parseCount(data.followers_count)}</p>` +
				`</div>` +
            `</li>`;     
        });
    }); 
}
loadFeaturedArtists();

/**
 * Load 5 featured artists
 */
function loadFeaturedLabels(){
    html = '';
    g_weekly.featured_labels.forEach(label => {
        fetch(`https://api.soundcloud.com/users/${label}?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd`)
        .then((response) => {
            return response.json();
        })
        .then((data)=>{
            $('.featured-labels')[0].innerHTML += `<li onclick="fetchUser('${data.permalink}')">` +
			    `<img src="${data.avatar_url}" draggable="false">` +
				`<div class="featured-info">` +
					`<h3>${data.username}</h3>` +
					`<p>${parseCount(data.followers_count)}</p>` +
				`</div>` +
            `</li>`;     
        });
    }); 
}
loadFeaturedLabels();