var math    = require('./math')
var letters = 'acdegilmnoprstuw';

function hash( str ){
	var h = '7';
    var idx = -1;
	for( var x=0,len=letters.length; x<len; x++){
		idx = letters.indexOf( str[x] );
		if( idx >= 0 ){
			h = math.add( math.mul( h, '37' ), idx.toString() )
			//h = ( h.mul( 37 ).add( idx ) );
		}
	}
	return h;
}

function decode( h ){

	// prime the string with the last letter
	var slots = [ letters[ math.mod( h, 37) ] ];
	while( (h = math.div(h, 37 ) ) != 7 ){
		// find the original idx and shift letter at idx
		h < 7 ? null : slots.unshift( letters[ math.mod( h, 37) ] );
	}

	return slots.join('');
}

exports.hash = hash;
exports.decode = decode;
