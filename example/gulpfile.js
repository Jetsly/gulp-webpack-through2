const gulp = require('gulp');
const webpack = require('../');
const package = require('../package.json');

gulp.task('default', function() {
    return gulp.src('src/entry.js')
        .pipe(webpack({
            watch: true,
            output: {
                filename: 'app.js',
            },
        })).on('error', () => {
            this.emit('end');
        })
        .pipe(gulp.dest('dist/'));
});