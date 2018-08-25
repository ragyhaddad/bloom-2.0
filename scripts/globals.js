/**
 *	Change to debug.
 * 	- No load in animation
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
 * 	Stores some site data for the session.
 */
var g_cache = {
	user_history: [],
	playlist: []
}