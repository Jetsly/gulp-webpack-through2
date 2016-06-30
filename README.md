# gulp-webpack-through2


  Run WebPack with through2 for [gulp](http://gulpjs.com/).

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

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
        }))
        .pipe(gulp.dest('build/'));
});
```

## Installation

```bash
$ npm install gulp-webpack-through2
```

## Features

  * watch files to compiler


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
