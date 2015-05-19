try{
	module.exports = require('./easyway');
} catch( e ){
	console.error( e.message, e.stack );
	module.exports = require('./hardway');
}
