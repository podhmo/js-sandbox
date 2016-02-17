var gulp = require('gulp');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');

gulp.task('pc', function () {
  return gulp.src('pc/*.css')
    .pipe(postcss([
      require('postcss-prefixed')
    ]))
    .pipe(concat('style-pc.css'))
    .pipe(gulp.dest('dest/css'));
});
