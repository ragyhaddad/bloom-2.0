
/**
 * Load 5 featured artists
 */
function loadFeaturedArtists(){
    html = '';
    for(x in favorites){
        fetch(`https://api.soundcloud.com/users/${favorites[x]}?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd`)
        .then((response) => {
            return response.json();
        })
        .then((data)=>{
            html += `<li onclick="searchEntryClicked('${data.permalink}')" class="search-item">` +
					`<img src="${data.avatar_url}" draggable="false">` +
					`<div class="search-user-info">` +
						`<h3>${data.username}</h3>` +
						`<p>${parseCount(data.followers_count)}</p>` +
					`</div>` +
                `</li>`;
        $('.featured-list')[0].innerHTML = html;       
        })
    }  
    
}

loadFeaturedArtists()