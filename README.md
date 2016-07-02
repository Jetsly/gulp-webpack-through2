# gulp-webpack-through2

  Run WebPack with through2 for [gulp](http://gulpjs.com/).

## Usage

```js
var gulp = require('gulp');
var webpack = require('gulp-webpack-through2');

gulp.task('default', function() {
    return gulp.src('src/entry.js')
        .pipe(webpack({
            watch: true,
            output: {
                filename: 'app.js'
            }
        }, {
                timings: true,
                errorDetails: true
        }))
        .pipe(gulp.dest('build/'));
});
```

## webpack(webpackConfig,statOptions)

 webpackConfig: http://webpack.github.io/docs/configuration.html


`statsOptions.context` (string) context directory for request shortening

`statsOptions.hash` add the hash of the compilation

`statsOptions.version` add webpack version information

`statsOptions.timings` add timing information

`statsOptions.assets` add assets information

`statsOptions.chunks` add chunk information (setting this to false allows for a less verbose output)

`statsOptions.chunkModules` add built modules information to chunk information

`statsOptions.modules` add built modules information

`statsOptions.children` add children information

`statsOptions.cached` add also information about cached (not built) modules

`statsOptions.reasons` add information about the reasons why modules are included

`statsOptions.source` add the source code of modules

`statsOptions.errorDetails` add details to errors (like resolving log)

`statsOptions.chunkOrigins` add the origins of chunks and chunk merging info

`statsOptions.modulesSort` (string) sort the modules by that field

`statsOptions.chunksSort` (string) sort the chunks by that field

`statsOptions.assetsSort` (string) sort the assets by that field

## Installation

```bash
$ npm install gulp-webpack-through2
```

## Features

  * run webpack with webpackConfig for gulp
  * exports webpack
  * add Progress 


## Examples

  To run the examples, clone the gulp-webpack-through2 repo and install the dependencies:

```bash
$ git clone git://github.com/Jetsly/gulp-webpack-through2
$ npm install gulp -g
$ npm install
$ gulp --gulpfile=example/gulpfile.js
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```
