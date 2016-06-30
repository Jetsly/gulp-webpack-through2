var gutil = require('gulp-util');
var through = require('through2');
var File = require('vinyl');
var MemoryFileSystem = require("memory-fs");
var webpack = require('webpack');
var path = require('path');


module.exports = function(options, done) {
    var defaultOptions = {
        entry: []
    }

    function transformFunction(file, encoding, callback) {
        defaultOptions.entry.push(`./${path.relative(file.cwd, file.path)}`)
        callback();
    }

    function flushFunction(cb) {
        var self = this;
        var _option = Object.assign(options, defaultOptions);
        _option.output.path = _option.output.path || process.cwd();
        console.log(_option);
        var compiler = webpack(_option,
            function(err, stats) {
                if (err) {
                    gutil.log(err);
                    return;
                }
                gutil.log(stats.toString({
                    colors: gutil.colors.supportsColor
                }));
                Object.keys(stats.compilation.assets).forEach(function(outname) {
                    if (stats.compilation.assets[outname].emitted) {
                        var _path = _option.watch ? fs.join(compiler.compiler.outputPath, outname) : fs.join(compiler.outputPath, outname);
                        console.log(_path);
                        var contents = fs.readFileSync(_path);
                        self.push(new File({
                            base: '',
                            path: outname,
                            contents: contents
                        }));
                    }
                });
                cb();
            });
        var fs = compiler.outputFileSystem = new MemoryFileSystem(); //must set output.path
    }
    return through.obj(transformFunction, flushFunction);
}