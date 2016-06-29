var gutil = require('gulp-util');
var through = require('through2');
var File = require('vinyl');
var webpack = require('webpack');
var path = require('path');

module.exports = function(options, done) {

    var entry = [];

    function transformFunction(file, encoding, callback) {
        entry.push(`./${path.relative(file.cwd, file.path)}`)
        callback();
    }

    function flushFunction(cb) {
        var self = this;
        var wp = webpack(Object.assign(options, {
            entry: entry
        }), function(err, stat) {
            if (err) {
                gutil.log(err);
            }
            gutil.log(stat.toString({
                colors: gutil.colors.supportsColor
            }));
        });
        // wp.compiler.plugin('after-emit', function(compilation, callback) {
        //     Object.keys(compilation.assets).forEach(function(outname) {
        //         if (compilation.assets[outname].emitted) {

        //             // var file = prepareFile(fs, compiler, outname);
        //             // self.push(file);
        //         }
        //     });
        //     // callback();
        // });
        // cb();
        // console.log(1);
    }

    return through.obj(transformFunction, flushFunction);
}