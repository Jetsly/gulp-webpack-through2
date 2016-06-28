var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');

var statsOptions = {

}

module.exports = function(options, done) {

    var entry = [];

    function transformFunction(file, encoding, callback) {
        console.log(file.history);
        console.log(JSON.stringify(file));
        this.push(file);
        callback();
    }

    function flushFunction(cb) {
        console.log(1);
        // cb();
    }

    return through.obj(transformFunction, flushFunction);
}