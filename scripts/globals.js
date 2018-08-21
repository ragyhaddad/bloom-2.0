/**
 *	Change to debug mode.
 */
var debug = false;

/**
 *	Stores data about the current user.
 */ 
var g_user = {
	id: null,
	permalink:null,
	username: null,
	image: null,
	followers_count:null,
	followings: [],
	tracks: [],
	likes: []
};

/**
 *	Stores data about the settings.
 */ 
var g_settings = {
	follower_slider: {
		min: null,
		max: null
	}
}

/**
 *	Stores tracks in the current playlist.
 */
var g_playlist = [];