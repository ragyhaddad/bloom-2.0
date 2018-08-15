/**
 * 	Parses a number count to be displayed.
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