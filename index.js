/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * module for encoding and decoding string values
 * @module codec
 * @author Eric satterwhite
 * @since 0.0.1
 * @requires codec/easyway
 * @requires codec/hardway
 */
try{
	var easy = require('./easyway');
	module.exports = easy;
	module.exports.fallback = require('./hardway');
} catch( e ){
	console.error( e.message, e.stack );
	module.exports = require('./hardway');
}
