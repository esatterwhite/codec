/*jshint laxcomma: true, smarttabs: true, node: true*/
'use strict';
/**
 * Implements the hashing algorithm using bignum addon
 * @module codec/easyway
 * @author Eric Satterwhite
 * @since 0.0.1
 * @requires bignum
 */

var bignum = require('bignum')
  , letters = 'acdegilmnoprstuw'
  ;

/**
 * Given a string will generate a numeric hash
 * @static
 * @function hash
 * @param {String} input
 * @return {BigNum}
 **/
function hash( str ){
	var h = bignum(7);
    var idx = -1;

	for( var x=0,len=letters.length; x<len; x++){
		idx = letters.indexOf( str[x] );
		if( idx >= 0 ){
			h = ( h.mul( 37 ).add( idx ) );
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
	h = bignum( h );
	// prime the string with the last letter
	var slots = [ letters[ h.mod( 37 ).toNumber() ] ];

	while( (h = h.div( 37 ) )!= 7 ){
	   // find the original idx and shift letter at idx
	   h < 7 ? null : slots.unshift( letters[ h.mod( 37 ).toNumber() ] );
	}

	return slots.join('');
}

exports.decode = decode;
exports.hash   = hash;
