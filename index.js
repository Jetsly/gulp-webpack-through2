var gutil = require('gulp-util');
var through = require('through2');
var File = require('vinyl');
var MemoryFileSystem = require("memory-fs");
var webpack = require('webpack');
var path = require('path');


module.exports = function (options, done) {
    var entry = [];

    function transformFunction(file, encoding, callback) {
        entry.push(`./${path.relative(file.cwd, file.path)}`)
        callback();
    }

    function flushFunction(cb) {
        var self = this;
        var compiler = webpack(Object.assign(options, {
            entry: entry
        }));
        //http://webpack.github.io/docs/node.js-api.html#compile-to-memory
        var fs = compiler.outputFileSystem = new MemoryFileSystem();
        compiler.run(function (err, stats) {
            if (err) {
                gutil.log(err);
                return;
            }
            gutil.log(stats.toString({
                colors: gutil.colors.supportsColor
            }));
        });
    }
    return through.obj(transformFunction, flushFunction);
}

            // Object.keys(stats.compilation.assets).forEach(function (outname) {
            //     if (stats.compilation.assets[outname].emitted) {
            //         var _path=path.join(wp.compiler.outputPath, outname);
            //         console.log(_path);
            //         var contents =fs.existsSync(_path);
            //         console.log(contents);
            //         // self.push(new File({
            //         //     base: compiler.outputPath,
            //         //     path: path,
            //         //     contents: contents
            //         // }));
            //     }
            //     // console.log(Object.keys(stats.compilation.assets[outname]));
            // });
            // cb();