'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

var ngAnnotate = require('gulp-ng-annotate');
var ngTemplateCache = require('gulp-angular-templatecache');

var config = {
  ngModuleName: "app",
  ngTemplate: {
    cacheFileName: "app.htmlcache.js",
    ngModuleName: "app-template",
    root: "/",
    standalone: true
  },
  appFileName: "app.js",
  vendorFileName: "vendor.js",
  distPath: function distPath(name) {
    return "./dist/" + (name || "");
  },
  jsPath: function jsPath(name) {
    return "./src/js/" + (name || "");
  }
};

gulp.task('vendor', function(){
  var b = browserify({
    entries: config.jsPath(config.vendorFileName),
    debug: false,
    transform: []
  });

  return b.bundle()
    .pipe(source(config.vendorFileName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distPath()));
});

gulp.task('browserify', function(){
  var b = browserify({
    entries: config.jsPath("app/index.js"),
    debug: true,
    standalone: "App",
    transform: ["browserify-shim"]
  });

  return b.bundle()
    .pipe(source(config.appFileName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
	  .pipe(ngAnnotate())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distPath()));
});


gulp.task('template-cache', function(){
  return gulp
    .src(config.jsPath("**/*.html"))
    .pipe(ngTemplateCache(config.ngTemplate.cacheFileName, {
      module: config.ngTemplate.ngModuleName,
      root: config.ngTemplate.root,
      standalone: config.ngTemplate.standalone
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['vendor', 'browserify'], function () {
});
