const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babelify', () => {
    return gulp.src('src/index.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('**/*.js', ['babelify']);
});

gulp.task('default', ['babelify', 'watch']);