var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');

module.exports = function(options, done) {
    function transformFunction(file, encoding, callback) {
        console.log(1);
        this.queue(file);
        callback();
    }

    function flushFunction(cb) {
        console.log(2);
        cb();
    }

    return through({

    }, transformFunction, flushFunction);
}