const gulp = require('gulp');
const webpack = require('../index.js');

gulp.task('default', () => {
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

gulp.task('test', () => {
    console.log(webpack.webpack);
})