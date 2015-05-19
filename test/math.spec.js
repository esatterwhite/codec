var assert = require('assert');
var hardcodec = require('../hardway')
var easycodec = require('../easyway')
var math = require('../math');

describe('codecs', function(){

	describe('white list chars', function(){
		var whitelist = 'acdegilmnoprstuw';

		it('should only allow white list chars', function(){
			var test1 = 'zilmore';

			assert.equal( 'ilmore', hardcodec.decode( hardcodec.hash( test1 ) ) );
		})
	})
	describe('reference case', function(){
		describe('leepadg', function(){
			var known_hash = '680131659347';
			var known_result = 'leepadg'

			it('should hash leepadg to 680131659347', function(){
				var hash = hardcodec.hash( known_result );
				assert.equal( hash, known_hash );
			});

			it('should decode 680131659347 to leepadg', function(){
				var result = hardcodec.decode( known_hash );
				assert.equal( result, known_result );
			});
		});

		describe('911064701880998', function(){
			var known_hash = '911064701880998';
			it('should encode / decode to same value', function(){
				var result = hardcodec.decode( known_hash );
				assert.equal( hardcodec.hash( result ), known_hash );
			});
		});
	});
});

describe('dirty math',function(){

	describe('operations', function(){
		describe('add', function(){
			it('should do addition correctly', function(){
				assert.equal( math.add('4', '4'), 8);
				assert.equal( math.add('4', '8'), 12);
			});
			it('should keep significant figures in large numbers', function(){
				var sum = math.add('5000000000000000000000', '1')
				assert.equal( sum, '5000000000000000000001');
			});
		});
		describe('multiply', function(){
			it('should keep significant figures in large numbers', function(){
				var product = math.mul('5000000000000000000000', '2')
				assert.equal( product, '10000000000000000000000');
			});
		});
		describe('modulo', function(){
			it('should return the remainder', function(){
				var mod = math.mod('12', '5');

				assert.equal( mod, 2 );
			})	
		});
	});

})
