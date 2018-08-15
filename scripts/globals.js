/**
 *	Stores data about the current user.
 */ 
var g_user = {
	id: null,
	permalink:null,
	username: null,
	image:null,
	follower_count:null,
	followings: [],
	tracks: [],
	likes: []
};

/**
 *	Stores data about the settings.
 */ 
var g_settings = {
	follower_slider = {
		min: null,
		max: null
	}
}