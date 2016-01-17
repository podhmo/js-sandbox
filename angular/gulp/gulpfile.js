'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('vendor', function(){
  var b = browserify({
    entries: './src/js/vendor.js',
    debug: false,
    transform: []
  });

  return b.bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('browserify', function(){
  var b = browserify({
    entries: './src/js/app/index.js',
    debug: true,
    standalone: "App",
    transform: ["browserify-shim"]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('inject', function(){
  gulp.src('./dist/');
});

gulp.task('build', ['browserify'], function () {
});
