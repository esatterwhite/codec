var bignum = require('bignum');
var letters = 'acdegilmnoprstuw';
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
