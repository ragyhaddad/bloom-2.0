/**
 *	Change to debug.
 * 	- No load in animation
 */
var debug = true;

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


/**
 * Storing favorites in Globals.js so we can load 5 artists into weekly
 */
let favorites = [
	"ragyhaddad",
	"im-seb",
	"fkj-2",
	"samgellaitry",
	"soulection",
	"stillwoozy",
	"kaytranada",
	"polo-pan",
	"flamingosis",
	"masegomusic",
	"harvey-sutherland",
	"phazzmusic",
	"bobby-analog",
	"kerokerobonito",
	"giraffage",
	"starro",
	"ofwgkta-official",
	"tommisch",
	"noname",
	"mujobeatz",
	"astronautico",
	"phonogramme"
];