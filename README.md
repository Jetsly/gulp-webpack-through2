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
                filename: '[name].bundle.js'
            }
        }, {
                timings: true,
                errorDetails: true
        }))
        .pipe(gulp.dest('build/'));
});
```

## webpack(webpackConfig,statOptions)

 *  `webpackConfig` include [webpackConfig](http://webpack.github.io/docs/configuration.html)
 
 > *  `progress` show webpack progress
 
 > *  `verbose` show all stats information

 > *  `compress` 配置不转换直接压缩的js文件,包含[uglifyjs](https://github.com/mishoo/UglifyJS2#api-reference)的配置

        compress: {
          entry: {
             vendor: ['src/a.js', 'src/b.js']
          },
          compress:false //不压缩只合并
        },
        output: {
           filename: '[name].bundle.js'
        }
        //压缩合并`a.js`+ `b.js` => `wendor.bundle.js` 


 *  `statsOptions`

 > * `context` (string) context directory for request shortening

 > * `hash` add the hash of the compilation

 > * `version` add webpack version information

 > * `timings` add timing information

 > * `assets` add assets information

 > * `chunks` add chunk information (setting this to false allows for a less verbose output)

 > * `chunkModules` add built modules information to chunk information

 > * `modules` add built modules information

 > * `children` add children information

 > * `cached` add also information about cached (not built) modules

 > * `reasons` add information about the reasons why modules are included

 > * `source` add the source code of modules

 > * `errorDetails` add details to errors (like resolving log)

 > * `chunkOrigins` add the origins of chunks and chunk merging info

 > * `modulesSort` (string) sort the modules by that field

 > * `chunksSort` (string) sort the chunks by that field

 > * `assetsSort` (string) sort the assets by that field

## Installation

```bash
$ npm install gulp-webpack-through2
```

## Features

  * 通过`gulp`运行`webpack`
  * 配置`js`文件直接压缩不处理
|

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
