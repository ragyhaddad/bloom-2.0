/**
 * 	Parses a number count to be displayed with followers.
 * 
 *	@param {int} number 
 */
function parseCount(number){
	if(number == 1){
		return number + " Follower";
	}else if(number < 999){
		return number + " Followers";
	}else if(number < 999999){
		return (Math.round((number/1000) * 10) / 10) + "k Followers";
	}else{
		return (Math.round((number/1000000) * 10) / 10) + "m Followers";
	}
}

/**
 * 	Parses a number count to be displayed with just numbers.
 * 
 *	@param {int} number 
 */
function parseCountNum(number){
	if(number < 999){
		return Math.round(number);
	}else if(number < 999999){
		return (Math.round((number/1000) * 10) / 10) + "k";
	}else{
		return (Math.round((number/1000000) * 10) / 10) + "m";
	}
}

/**
 *	Links to the soundcloud page for the user.
 * 
 *	@param {string} permalink - The user's permalink 
 */
function goToSoundcloud(){
	window.open(`https://soundcloud.com/${g_user.permalink}`, '_blank');
}

/**
 *	Takes the user back to the previous profile.
 */
function goBack(){
	g_cache.user_history.pop();
	fetchUser(g_cache.user_history.pop());
}
