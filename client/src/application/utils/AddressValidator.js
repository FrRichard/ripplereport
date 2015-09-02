var int = require('intZ');

// prep position lookup table
var vals = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';
var positions = {};
for (var i=0 ; i < vals.length ; ++i) {
    positions[vals[i]] = i;
}

/// decode a base58 string payload into a hex representation
function decode(payload) {
    var base = 58;

    var length = payload.length;
    var num = int(0);
    var leading_zero = 0;
    var seen_other = false;
    for (var i=0; i<length ; ++i) {
        var char = payload[i];
        var p = positions[char];

        // if we encounter an invalid character, decoding fails
        if (p === undefined) {
            return false;
        }

        num = num.mul(base).add(p);

        if (char == '1' && !seen_other) {
            ++leading_zero;
        }
        else {
            seen_other = true;
        }
    }

    var hex = num.toString(16);

    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }

    // strings starting with only ones need to be adjusted
    // e.g. '1' should map to '00' and not '0000'
    if (leading_zero && !seen_other) {
      --leading_zero;
    }

    while (leading_zero-- > 0) {
        hex = '00' + hex;
    }

    if(payload.length > 54) {
        console.log('invalid address format');
        return false;
    }

    return hex;
}

module.exports.decode = decode;