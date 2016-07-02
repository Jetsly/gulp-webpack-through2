var gutil = require('gulp-util');
var through = require('through2');
var File = require('vinyl');
var MemoryFileSystem = require("memory-fs");
var webpack = require('webpack');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var path = require('path');


module.exports = function (options, done) {
    var defaultOptions = {
        entry: []
    }
    var statsOptions = {
        colors: gutil.colors.supportsColor
    }

    function transformFunction(file, encoding, callback) {
        defaultOptions.entry.push(`./${path.relative(file.cwd, file.path)}`)
        callback();
    }

    function flushFunction(cb) {
        var self = this;
        var _option = Object.assign(defaultOptions, options);
        _option.output.path = _option.output.path || process.cwd();
        var compiler = webpack(_option, (err, stats) => {
            gutil.log(stats.toString(statsOptions));
        });
        //if is watch  compiler is compiler.compiler;
        if (_option.watch && compiler.compiler) {
            compiler = compiler.compiler;
        }
        var fs = compiler.outputFileSystem = new MemoryFileSystem(); //must set output.path
        if (_option.progress) {
            compiler.apply(new ProgressPlugin(function (percentage, msg) {
                gutil.log('webpack', ` ${Math.floor(percentage * 100)}% ${msg}`);
            }));
        }
        compiler.plugin("done", stats => {
            Object.keys(stats.compilation.assets).forEach(outname => {
                if (stats.compilation.assets[outname].emitted) {
                    var contents = fs.readFileSync(fs.join(_option.output.path, outname));
                    self.push(new File({
                        base: '',
                        path: outname,
                        contents: contents
                    }));
                }
            });
            (_option.watch ? (() => { }) : cb)();
        })
    }
    return through.obj(transformFunction, flushFunction);
}
//exports 
module.exports.webpack = webpack;