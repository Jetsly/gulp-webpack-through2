const gulp = require('gulp');
const webpack = require('../index.js');

gulp.task('default', function() {
    return gulp.src('src/entry.js')
        .pipe(webpack({
            watch: true,
            output: {
                filename: 'app.js',
            },
        }))
        .pipe(gulp.dest('dist/'));
});