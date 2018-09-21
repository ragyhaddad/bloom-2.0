/**
 *	Change to debug.
 * 	- No load in animation
 */
var debug = 0;

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
 *	Stores data about the graph.
 */ 
var g_graph = {
	nodes: [],
	links: [],
	nodes_sorted: []
}

/**
 *	Stores data about the settings.
 */ 
var g_settings = {
	follower_slider: {
		min: 0,
		max: 10000000
	},
	sort: false
}

/**
 * 	Stores some site data for the session.
 */
var g_cache = {
	user_history: [],
	playlist: []
}

/**
 * 	Stores data used in the weekly sidebar.
 */
var g_weekly = {
	featured_artists: [
		'kazdotmoon',
		'officialmedasin',
		'jinsangbeats'
	],
	featured_labels: [
		'owslaofficial',
		'soulection',
		'lobster-theremin'
	],
	track_of_week: '279989691'
}

