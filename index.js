try{
	var easy = require('./easyway');
	module.exports = easy;
	module.exports.fallback = require('./hardway');
} catch( e ){
	console.error( e.message, e.stack );
	module.exports = require('./hardway');
}
