var gutil = require('gulp-util');
var through = require('through2');
var MemoryFileSystem = require("memory-fs");
var webpack = require('webpack');

var path = require('path');
var readline = require('readline');
var defaultOptions = {
    entry: [],
    plugins: []
}

var defaultStatsOptions = {
    colors: gutil.colors.supportsColor,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
}

module.exports = function (options, statsOptions, done) {

    function transformFunction(file, encoding, callback) {
        defaultOptions.entry.push(`./${path.relative(file.cwd, file.path)}`)
        callback();
    }

    function flushFunction(cb) {
        var self = this;
        var _option = Object.assign(defaultOptions, options);
        var _statsOption = Object.assign(defaultStatsOptions, statsOptions);

        _option.output.path = _option.output.path || process.cwd();

        if (_option.progress) {
            _option.plugins.push(new webpack.ProgressPlugin(function (percentage, msg) {
                if (percentage > 0) {
                    readline.moveCursor(process.stdout, 0, -1);
                    readline.clearLine(process.stdout, 0)
                } 
                var msg = Math.floor(percentage * 100) + '%  ' + msg;
                gutil.log(`Progress: ${gutil.colors.blue(msg)}`);
            }));
        }

        var compiler = webpack(_option, (err, stats) => {
            if (options.verbose) {
                gutil.log(stats.toString({
                    colors: gutil.colors.supportsColor
                }));
            } else {
                gutil.log(stats.toString(_statsOption));
            }
            (done || (() => { }))(stats);
        });

        //if is watch  compiler is compiler.compiler;
        if (_option.watch && compiler.compiler) {
            compiler = compiler.compiler;
        }

        var fs = compiler.outputFileSystem = new MemoryFileSystem(); //must set output.path
        compiler.plugin("done", stats => {
            Object.keys(stats.compilation.assets).forEach(outname => {
                if (stats.compilation.assets[outname].emitted) {
                    var contents = fs.readFileSync(fs.join(_option.output.path, outname));
                    self.push(new gutil.File({
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