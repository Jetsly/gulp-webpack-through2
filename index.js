var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');

var statsOptions = {

}

module.exports = function(options, done) {

    var entry = [];

    function transformFunction(file, encoding, callback) {
        console.log(file);
        this.push(file);
    }

    function flushFunction(cb) {
        console.log(2);
    }

    return through({
        objectMode: true
    }, transformFunction, flushFunction);
}