/*eslint-disable */

var static = require('node-static');
var open = require('opener');
var file = new static.Server('.');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);

open('http://localhost:8080/');
