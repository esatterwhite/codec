/**
 * Dirty Math lib for dealing with "64 bit" integers.
 * Actually tries to deal with number of an arbitrary length
 * @module codec/math
 * @author Eric Satterwhite
 * @requires debug
 **/
var debugadd = require('debug')('math:add')
  , debugdiv = require('debug')('math:div')
  , debugmul = require('debug')('math:mul')
  ;

/**
 * Performs addition on large numbers using string values
 * @static
 * @method add
 * @param {String} left The left hand side of the addition 
 * @param {String} right The right hand side of the addition
 * @return {String} The sume of the parts
 **/
function add( a, b ){
	a = a.toString();
	b = b.toString();
	debugadd('adding', a,b)
	var carry   = 0;
	var idx     = 0;
	var sums    = [] 
	var digit_a
	var digit_b
	
	a = a.split('').reverse();
	b = b.split('').reverse();

	while( idx < a.length || idx < b.length || carry != 0 ){
		digit_a = ~~a[idx];
		digit_b = ~~b[idx]

		sum = digit_a + digit_b + carry;

		sums.push( (sum % 10).toString() )
		carry = Math.floor( sum / 10 );
		idx++;
	}
	
	return sums.reverse().join('');	
}

/**
 * Performs division of large numbers using string values
 * @static
 * @method divide
 * @param {String} dividend The number to be divided 
 * @param {String} divisor  The number to divide by
 * @param {Boolean} [remainder=false] if true, function will return the remainder rather than the quotient 
 * @return {String} The quotient of the parts
 **/
function divide( a, b, remainder ){
	a = String(a);
	b = String(b);
	debugdiv("%s / %s", a, b );
	var pos = b.length
	var num = ~~a.substring( 0, pos );
	var r = 0;
	var next;

	b = ~~b;
	while( true ) {
		if( b <= num ){
			num -= b;
			r++;
		} else {
			next = ( a.substring(pos, ++pos ));
			if( next ){
				num = ~~( num.toString() + next );
				r *= 10
			} else {
				debugdiv("returning remainder: %s", !!remainder);
				return remainder === true ? num : r
			}
		}
	}
}

/**
 * Performs modulo of large numbers using string values. Same as divide( a, b, true )
 * @static
 * @method mod
 * @param {String} dividend The number to be divided 
 * @param {String} divisor  The number to divide by
 * @param {Boolean} [remainder=false] if true, function will return the remainder rather than the quotient 
 * @return {String} the remaining value of the division operation
 **/
function mod( a, b ){
	return divide( a,b, true );
}


/**
 * Performs modulo of large numbers using string values. Same as divide( a, b, true )
 * @static
 * @method mod
 * @param {String} left left hand side of the multipliation
 * @param {String} right the right hand side of the multiplication
 * @return {String} product
 **/
function multiply( a, b ){

	var carry    = 0;
	var products = [];
	var places = '';
	var digit_a;
	var digit_b;
	var product;

	debugmul(a,b);
	a = a.split('').reverse();
	b = b.split('').reverse();

	while( b.length ){
		digit_b = ~~b.shift()
		product = places;
		for( var idx = 0; idx < a.length; idx++ ){
			digit_a = ~~a[idx];
			var tmp = ( digit_b * digit_a + carry )	
			carry = Math.floor( tmp/ 10 );
			product = ( tmp % 10) + product;
		}
		products.push( ( carry || "" ).toString() + ( product ).toString() )
		places += '0'
		carry = 0;
	}
	return products.reduce( add );
}

exports.add = add;
exports.mul = multiply;
exports.div = divide;
exports.mod = mod;
