/*jshint laxcomma: true, smarttabs: true, node: true*/
'use strict';
/**
 * Implements the hashing algorithm using string based arithmetic
 * @module codec/hardway
 * @author Eric Satterwhite
 * @since 0.0.1
 * @requires codec/math
 */
var math    = require('./math')
   , letters = 'acdegilmnoprstuw'
   ;

/**
 * Given a string will generate a numeric hash
 * @static
 * @function hash
 * @param {String} input
 * @return {String}
 **/
function hash( str ){
	var h = '7';
    var idx = -1;
	for( var x=0,len=letters.length; x<len; x++){
		idx = letters.indexOf( str[x] );
		if( idx >= 0 ){
			h = math.add( math.mul( h, '37' ), idx.toString() )
		}
	}
	return h;
}

/**
 * Given a hash value, will return the decoded string
 * @static
 * @function hash
 * @param {String|Number|BigNum} input
 * @return {String} decoded string value
 **/
function decode( h ){

	// prime the string with the last letter
	var slots = [ letters[ math.mod( h, 37) ] ];
	while( ( h = math.div( h, 37 ) ) != 7 ){
		// find the original idx and shift letter at idx
		h < 7 ? null : slots.unshift( letters[ math.mod( h, 37 ) ] );
	}

	return slots.join('');
}

exports.hash = hash;
exports.decode = decode;
