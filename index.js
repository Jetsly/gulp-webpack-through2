var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');

var statsOptions = {

}

module.exports = function (options, done) {

    var entry = [];

    function transformFunction(file, encoding, callback) {
        entry.push(file.history[0])
        callback();
    }

    function flushFunction(cb) {
        var self=this;
        console.log(entry);
        var wp = webpack(Object.assign(options, {
            entry: entry
        }), function (err, stat) {
            if (err) {
                console.log(err);
            }
            // console.log(stat);
        });
        wp.compiler.plugin('after-emit', function (compilation, callback) {
            Object.keys(compilation.assets).forEach(function (outname) {
                if (compilation.assets[outname].emitted) {

                    // var file = prepareFile(fs, compiler, outname);
                    // self.push(file);
                }
            });
            // callback();
        });
        // cb();
    }

    return through.obj(transformFunction, flushFunction);
}