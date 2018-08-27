/**
 *  Load 3 featured artists.
 */
function loadFeaturedArtists(){
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
 *  Load 3 featured labels.
 */
function loadFeaturedLabels(){
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

function loadTrackOfWeek(){
    $('.track-of-week')[0].innerHTML = `<iframe width="260" height="180" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${g_weekly.track_of_week}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`;
}
loadTrackOfWeek();