var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');

module.export = function(options, done) {
    function transformFunction(chunk, encoding, callback) {

    }

    function flushFunction(cb) {

    }

    return through({

    }, transformFunction, flushFunction)
}