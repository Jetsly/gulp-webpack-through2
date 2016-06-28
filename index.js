var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');

module.export = function(options, done) {
    function transformFunction(file, encoding, callback) {
        this.queue(file);
        callback();
    }

    function flushFunction(cb) {
        cb();
    }

    return through({

    }, transformFunction, flushFunction)
}