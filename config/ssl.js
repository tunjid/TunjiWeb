var fs = require('fs');
var path = require('path');

var key = fs.readFileSync(path.join(__dirname, '../', 'domain.key'));
var cert = fs.readFileSync(path.join(__dirname, '../', 'domain.crt'));

exports.options = {key: key, cert: cert};