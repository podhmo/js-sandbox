'use strict';
var path = require('path');

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var gutil = require('gulp-util');
var del = require('del');
var size = require('gulp-size');
var gif = require('gulp-if');
// var debug = require('gulp-debug');

var uglify = require('gulp-uglify');
var uglifySaveLicense = require('uglify-save-license');
var csso = require('gulp-csso');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');

var ngAnnotate = require('gulp-ng-annotate');
var ngTemplateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');

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
  jsEntryPointName: function jsEntryPoint(){
    var env = this.isProduction()? "production" : "dev";
    return "app/app." + env + ".js";
  },
  appFileName: "app.js",
  appModuleName: "App",
  vendorJSName: "vendor.js",
  vendorCSSName: "vendor.css",
  distPath: function distPath(name) {
    return path.join("./dist/", name || "");
  },
  jsPath: function jsPath(name) {
    return path.join("./src/js/",  (name || ""));
  },
  htmlPath: function jsPath(name) {
    return path.join("./src/html/",  (name || ""));
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

gulp.task('vendor:js', function(){
  var b = browserify({
    entries: config.jsPath(config.vendorJSName),
    debug: true,
    transform: []
  });

  return b.bundle()
    .pipe(source(config.vendorJSName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(gif(config.enableMinify(), uglify({preserveComments: uglifySaveLicense})))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distPath("js/")))
    .pipe(size({title: config.distPath("js/"), showFiles: true}))
  ;
});

gulp.task("vendor:css", function(){
  var files = [
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/bootstrap/dist/css/bootstrap-theme.css",
  ];
  // todo:update
  return gulp.src(files)
    .pipe(gif(config.enableMinify(), csso()))
    .pipe(concat(config.vendorCSSName))
    .pipe(gulp.dest(config.distPath("css/")))
    .pipe(size({title: config.distPath("css/"), showFiles: true}))
  ;
});

gulp.task('vendor', ["vendor:css", "vendor:js"]);

gulp.task('browserify', function(){
  var b = browserify({
    entries: config.jsPath(config.jsEntryPointName()),
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
    .pipe(gulp.dest(config.distPath("js/")))
    .pipe(size({title: config.distPath("js/"), showFiles: true}))
  ;
});


gulp.task('html:patch', function(){
  return gulp
    .src(config.jsPath("**/*.html"))
    .pipe(gif(config.enableMinify(), minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    })))
    .pipe(ngTemplateCache(config.ngTemplate.cacheFileName, {
      module: config.ngTemplate.ngModuleName,
      root: config.ngTemplate.root,
      standalone: config.ngTemplate.standalone
    }))
    .pipe(gulp.dest(config.distPath("js/")))
    .pipe(size({title: config.distPath("js/"), showFiles: true}))
  ;
});

gulp.task('html:inject', function(){
  var files = [
    config.distPath("css/*.css"),
    config.distPath(path.join("js", config.vendorJSName)),
    config.distPath(path.join("js", config.appFileName)),
    config.distPath(path.join("js", config.ngTemplate.cacheFileName)),
  ];
  var sources = gulp.src(files, {read: false});
  return gulp
    .src(config.htmlPath("index.html"))
    .pipe(inject(sources, {addPrefix: ".", relative: true}))
    .pipe(gif(config.enableMinify(), minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    })))
    .pipe(gulp.dest(config.distPath("html")))
    .pipe(size({title: config.distPath("html"), showFiles: true}))
  ;
});

gulp.task("html", ['html:patch', "html:inject"]);

gulp.task('build', ['vendor', 'browserify', "html"], function() {
});

gulp.task("clean", function(){
  return del([
    path.join(config.distPath("*"))
  ]);
});
