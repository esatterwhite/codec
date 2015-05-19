### String hashing problem

functions to encode and decode a string using a hashing function
using 64 bit integers.

#### Easy way

The easy way uses a C++ extension to expose real 64 bit int functionality
to javascript

```js
var codec = require('codec/easyway');

var hash = codec.hash('leepadg');
codec.decode( hash ) // leepadg
```

#### Hard way

The hard way uses a partial implementation of big number math using strings.

```js
var codec = require('codec/hardway');

var hash = codec.hash('leepadg');
codec.decode( hash ) // leepadg
```

**note** requiring the codec module will expose the easyway if possible falling back to the hard way
if the extension has failed to install
