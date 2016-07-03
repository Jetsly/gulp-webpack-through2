var gutil = require('gulp-util');
var through = require('through2');
var webpack = require('webpack');

var MemoryFileSystem = require("memory-fs");
var ugjs = require("uglifyjs");

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

    function compressFile(options) {
        var self = this;
        if (options.compress) {
            _ugConfig = Object.assign({}, options.compress);
            delete _ugConfig.entry;
            Object.keys(options.compress.entry).forEach(name => {
                gutil.log(`Compress start: ${gutil.colors.green.bold(name)}`);
                var result = ugjs.minify(options.compress.entry[name], _ugConfig);
                var crypto = require("crypto").createHash(options.output.hashFunction);
                crypto.update(result.code);
                hash = crypto.digest(options.output.hashDigest).substr(0, options.output.hashDigestLength);
                var outname = options.output.filename
                    .replace('[name]', name).replace('[id]', name)
                    .replace('[hash]', hash).replace('[chunkhash]', hash);
                var _path = path.join(options.output.path, outname);
                var _buf = new Buffer(result.code);
                var _size = '';
                if (_buf.length < 1024) {
                    _size = `${_buf.length} bytes`
                }
                else if (_buf.length > 1048576) {
                    _size = `${(_buf.length / 1048576).toFixed(2)} MB`
                }
                else {
                    _size = `${(_buf.length / 1024).toFixed(2)} KB`
                }
                self.push(new gutil.File({
                    base: '',
                    path: _path,
                    contents: _buf
                }));
                // gutil.log(`Compress: \u001b[1m\u001b[33m =>\u001b[39m`);
                gutil.log(`Compress success: => ${gutil.colors.green.bold(outname)} ${_size}`);
            })
        }
    }

    function addProgress(_option) {
        if (_option.progress) {
            _option.plugins.push(new webpack.ProgressPlugin(function (percentage, msg) {
                var msg = Math.floor(percentage * 100) + '%  ' + msg;
                gutil.log(`Progress: ${gutil.colors.green.bold(msg)}`);
            }));
        }
        return _option;
    }

    function compilerDone(compiler, cb) {
        var self = this;
        var fs = compiler.outputFileSystem = new MemoryFileSystem(); //must set output.path
        compiler.plugin("done", stats => {
            Object.keys(stats.compilation.assets).forEach(outname => {
                if (stats.compilation.assets[outname].emitted) {
                    var contents = fs.readFileSync(fs.join(compiler.options.output.path, outname));
                    self.push(new gutil.File({
                        base: '',
                        path: outname,
                        contents: contents
                    }));
                }
            });
            (compiler.options.watch ? (() => { }) : cb)();
        })

    }

    function transformFunction(file, encoding, callback) {
        defaultOptions.entry.push(`./${path.relative(file.cwd, file.path)}`)
        callback();
    }

    function flushFunction(cb) {
        var self = this;

        var _option = Object.assign(defaultOptions, options);
        var _statsOption = Object.assign(defaultStatsOptions, statsOptions);

        if (!_option.output) {
            _option.output.filename = 'bundle.js';
        }

        _option.output.path = _option.output.path || process.cwd();

        _option = addProgress(_option);

        var compiler = webpack(_option, (err, stats) => {
            if (options.verbose) {
                gutil.log(stats.toString({
                    colors: gutil.colors.supportsColor
                }));
            } else {
                gutil.log(stats.toString(defaultStatsOptions));
            }
            (done || (() => { }))(stats);
        });
        //if is watch  compiler is compiler.compiler;
        if (_option.watch && compiler.compiler) {
            compiler = compiler.compiler;
        }

        compilerDone.bind(self)(compiler, cb);

        compressFile.bind(self)(compiler.options);
    }

    return through.obj(transformFunction, flushFunction);
}
//exports 
module.exports.webpack = webpack;