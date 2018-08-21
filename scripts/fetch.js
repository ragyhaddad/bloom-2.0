// Testing 
fetchUser('flume');

/**
 *  Gets all data for a user.
 * 
 *  @param {String} username 
 */
function fetchUser(username){
    clearInterface();
    fetch(`https://api.soundcloud.com/users/${username}?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd`)
    .then((response) => {
        return response.json();
    })
    .then((user) =>{
        g_user.id = user.id; 
        g_user.permalink = user.permalink;
        g_user.username = user.username;
        g_user.image = user.avatar_url;
        g_user.followers_count = user.followers_count;
        g_user.followings = [];
	    g_user.tracks = [];
	    g_user.likes = [];
        fetchTracks(user.id);
        fetchFollowings(`https://api.soundcloud.com/users/${user.id}/followings?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd&limit=200`);
        fetchLikes(user.id);
    });       
}

/**
 *  Fetches all user followings.
 * 
 *  @param {String} url
 */
function fetchFollowings(url){
    fetch(url)
        .then((response)=>{
            return response.json();
        })
        .then((followings)=>{
            for (var i = 0; i < followings.collection.length; i++) {
                g_user.followings.push(followings.collection[i]);
            }
            if (followings.next_href != null){
                fetchFollowings(followings.next_href);
            }
            else{
                drawGraph();
            }   
        }); 
}

/**
 *  Get top 3 tracks for current user.
 * 
 *  @param {int} user_id
 */
function fetchTracks(user_id){
    let url = `https://api.soundcloud.com/users/${user_id}/tracks?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((tracks)=>{
            for (let i = 0; i < tracks.length && i < 3; i++){
                g_user.tracks.push(tracks[i]);
            }
            loadInterface();
        });
}
/**
 *  Fetch current user likes.
 * 
 *  @param {int} user_id
 */
function fetchLikes(user_id){
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let url = `https://api-v2.soundcloud.com/users/${user_id}/likes?client_id=eiY2lrXv0r5RR6UXfyjrfdwxzmgKqreK&limit=20&offset=0&linked_partitioning=1&app_version=1528191385&app_locale=en`;
    var full_url = proxy + url;
    fetch(full_url)
        .then((response)=>{
            return response.json();
        })
        .then((tracks)=>{
            for(var x = 0; x < tracks.collection.length; x++){
                if(tracks.collection[x].track){
                    g_user.likes.push(tracks.collection[x].track);
                }
            }
        });
}

/**
 *  Handles the random button and loads a random user.
 */
function getRandom(){
    let random = (Math.floor(Math.random() * 9999) + 1);
    fetch(`https://api.soundcloud.com/users/${random}?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    getRandom();
                }else{
                    return response.json();
                }
              }
        )
        .then((user) => {
            fetchUser(user.permalink);
        });
}