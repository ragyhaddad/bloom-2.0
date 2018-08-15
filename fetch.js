//Use strict;
/**
 * Global Current user variable
 */ 
var g_user = {
    id: null,
    username: null,
    permalink:null,
    image:null,
    follower_count:null,
    followings: [],
    tracks: [],
    likes: []
};

/*
* Class: Fetch - class containing methods for fetching current user data
*/
class Fetch {
    /**
     * No Constructor needed
     */
    constructor(){

    }
    /**
     * 
     * @param {String} username - Calls fetchFollowings() and fetTracks()
     */
    fetchUser(username){
        fetch('https://api.soundcloud.com/users/' + username + '?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd')
        .then((response) => {
            return response.json();
        })
        .then((userData) =>{
            console.log(userData);
            g_user.id = userData.id; 
            g_user.permalink = userData.permalink;
            g_user.username = userData.username;
            g_user.follower_count = userData.follower_count;
            this.fetchFollowings('https://api.soundcloud.com/users/' + userData.id + '/followings?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd&limit=200');
            this.fetchTracks(userData.id);
        });       
    }
    /**
     * 
     * @param {String} url - Fetches all user followings.
     */
    fetchFollowings(url){
        var self = this;
        fetch(url)
        .then((response)=>{
            return response.json();
        })
        .then((followingData)=>{
            for (var i = 0; i < followingData.collection.length; i++) {
                g_user.followings.push(followingData.collection[i]);
            }
            if (followingData.next_href != null){
                self.fetchFollowings(followingData.next_href);
            }    
        });
        
    }
    /**
     * 
     * @param {int} user_id - Get top 3 tracks for current user 
     */
    fetchTracks(user_id){
        var userTracksUrl = 'https://api.soundcloud.com/users/' + user_id + '/tracks?client_id=3Goi9X5NOF7g1ofGbmYEkpveejwvlqjd';
        fetch(userTracksUrl)
            .then((response) => {
            return response.json();
            })
            .then((userTracks)=>{
                for (var x = 0; x < userTracks.length; x++){
                    g_user.tracks.push(userTracks[x].id);
                }
            });

    }
    /**
     * 
     * @param {int} user_id - Fetch current user likes.
     */
    fetchLikes(user_id){
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var userURL = 'https://api-v2.soundcloud.com/users/' + user_id + '/likes?client_id=eiY2lrXv0r5RR6UXfyjrfdwxzmgKqreK&limit=20&offset=0&linked_partitioning=1&app_version=1528191385&app_locale=en';
        var fullURL = proxy + userURL;
        fetch(fullURL)
        .then((response)=>{
            return response.json();
        })
        .then((likedTracks)=>{
            for(var x = 0; x < likedTracks.length; x++){
                g_user.likes.push(likedTracks[x].id);
            }
        });
    }

}