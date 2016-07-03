const gulp = require('gulp');
const webpack = require('../index.js');

gulp.task('default', () => {
    return gulp.src('src/entry.js')
        .pipe(webpack({
            compressEntry: {
                vendor: ['src/a.js', 'src/b.js']
            },
            output: {
                filename: '[name].bundle.js'
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