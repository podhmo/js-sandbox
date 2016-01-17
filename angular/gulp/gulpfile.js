'use strict';
var path = require('path');

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var gutil = require('gulp-util');
var size = require('gulp-size');
var gif = require('gulp-if');
// var debug = require('gulp-debug');

var uglify = require('gulp-uglify');
var uglifySaveLicense = require('uglify-save-license');

var ngAnnotate = require('gulp-ng-annotate');
var ngTemplateCache = require('gulp-angular-templatecache');

// NODE_ENV=production gulp build
// MINIFY=1 gulp build

var config = {
  ngModuleName: "app",
  ngTemplate: {
    cacheFileName: "app.htmlcache.js",
    ngModuleName: "app-template",
    root: "/",
    standalone: true
  },
  appFileName: "app.js",
  appModuleName: "App",
  vendorFileName: "vendor.js",
  distPath: function distPath(name) {
    return path.join("./dist/", name || "");
  },
  jsPath: function jsPath(name) {
    return path.join("./src/js/",  (name || ""));
  },
  isProduction: function(){
    return (process.env.NODE_ENV || 'dev').toLowerCase() === 'production';
  },
  isDebug: function(){
    return !this.isProduction();
  },
  enableMinify: function(){
    return this.isProduction() || !!process.env.MINIFY;
  }
};

gulp.task('vendor', function(){
  var b = browserify({
    entries: config.jsPath(config.vendorFileName),
    debug: true,
    transform: []
  });

  return b.bundle()
    .pipe(source(config.vendorFileName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(gif(config.enableMinify(), uglify({preserveComments: uglifySaveLicense})))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distPath()))
    .pipe(size({title: config.distPath(), showFiles: true}))
  ;
});

gulp.task('browserify', function(){
  var b = browserify({
    entries: config.jsPath("app/index.js"),
    debug: true,
    standalone: config.appModuleName,
    transform: ["browserify-shim"]
  });

  return b.bundle()
    .pipe(source(config.appFileName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
	  .pipe(ngAnnotate())
    .pipe(gif(config.enableMinify(), uglify({preserveComments: uglifySaveLicense})))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distPath()))
    .pipe(size({title: config.distPath(), showFiles: true}))
  ;
});


gulp.task('template-cache', function(){
  return gulp
    .src(config.jsPath("**/*.html"))
    .pipe(ngTemplateCache(config.ngTemplate.cacheFileName, {
      module: config.ngTemplate.ngModuleName,
      root: config.ngTemplate.root,
      standalone: config.ngTemplate.standalone
    }))
    .pipe(gulp.dest('dist'))
    .pipe(size({title: config.distPath(), showFiles: true}))
  ;
});

gulp.task('build', ['vendor', 'browserify', 'template-cache'], function () {
});
