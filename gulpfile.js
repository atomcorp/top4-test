var gulp = require('/../gulp');
var sass = require('/../gulp-sass');

gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass','watch']);