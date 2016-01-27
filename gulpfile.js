var gulp          = require('gulp');
var jade          = require('gulp-jade');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var ngAnnotate    = require('gulp-ng-annotate');
var minifyHTML    = require('gulp-minify-html');
var sourcemaps    = require('gulp-sourcemaps');
var imagemin      = require('gulp-imagemin');
var webserver     = require('gulp-webserver');
var less          = require('gulp-less');
var path          = require('path');
var bowerFiles    = require('gulp-main-bower-files');
var ngConstant    = require('gulp-ng-constant');
var es            = require('event-stream');
var gulpFilter    = require('gulp-filter');
var minifyCss     = require('gulp-minify-css');
var inject        = require('gulp-inject');
var mainBowerFiles= require('main-bower-files');
var jshint        = require('gulp-jshint');

dev_path = {
  index: './src/app/index.jade',
  jade: './src/app/*/**/*.jade',
  images: './src/img/**',
  js: './src/app/**/*.js',
  less: './src/less/styles.less',
  i18n: './src/i18n/*.json',
  config: './src/config/dev.json'
};

pub_path = {
  html: './public/view/',
  images: './public/img/',
  js: './public/js/',
  css: './public/css/',
  assets: './public/assets/',
  i18n: './public/i18n/',
  config: './src/config/prod.json'
};

gulp.task('dev',['watch']);
gulp.task('pub',['less', 'jade', 'images', 'js_pub', 'i18n']);

gulp.task('jade', ['bower_js', 'bower_css'], jadeTask);
gulp.task('jade_dev', ['bower'], jadeDevTask);
gulp.task('bower', bowerTask);
gulp.task('images', imagesTask);
gulp.task('js_dev', jsDevTask);
gulp.task('js_pub', jsPubTask);
gulp.task('bower_js', bowerJsTask);
gulp.task('bower_css', bowerCssTask);
gulp.task('webserver', ['less', 'jade_dev', 'images', 'js_dev', 'i18n'] , webServerTask);
gulp.task('less', lessTask);
gulp.task('i18n', i18nTask);

gulp.task('watch', ['webserver'], function () {
  gulp.watch('./src/img/**', ['images']);
  gulp.watch('./src/**/*.jade', ['jade_dev']);
  gulp.watch('./bower_components/**', ['jade_dev']);
  gulp.watch('./src/js/**', ['js_dev']);
  gulp.watch('./src/config/*.json', ['js_dev']);
  gulp.watch('./src/less/**', ['less']);
  gulp.watch('./src/i18n/**', ['i18n']);
});

function jadeTask () {
  gulp.src(dev_path.index)
      .pipe(jade({pretty: true}))
      .pipe(inject(gulp.src([pub_path.assets + '*.js', pub_path.assets + '*.css'], {read: false}), {
        name: 'bower',
        transform: function (filepath) {
          if (filepath.slice(-3) === '.js') {
            var tmp = filepath.split('/');
            var filename = tmp[tmp.length - 1];
            return '<script src="/assets/' + filename + '"></script>';
          }
          if (filepath.slice(-4) === '.css') {
            var tmp = filepath.split('/');
            var filename = tmp[tmp.length - 1];
            return '<link rel="stylesheet" href="/assets/' + filename + '">';
          }

          // Use the default transform as fallback:
          return inject.transform.apply(inject.transform, arguments);
        }
      }))
      .pipe(minifyHTML())
      .pipe(gulp.dest('./public/'));

  return gulp.src(dev_path.jade)
      .pipe(jade({pretty: true}))
      .pipe(minifyHTML())
      .pipe(gulp.dest(pub_path.html));
}

function jadeDevTask () {
  gulp.src(dev_path.index)
      .pipe(jade({pretty: true}))
      .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {
        name: 'bower',
        transform: function(filepath) {
          if (filepath.slice(-3) === '.js') {
            return '<script src="/assets/'+ filepath.replace('/bower_components/', '') + '"></script>';
          }
          if (filepath.slice(-4) === '.css') {
            return '<link rel="stylesheet" href="/assets/'+ filepath.replace('/bower_components/', '') + '">';
          }

          // Use the default transform as fallback:
          return inject.transform.apply(inject.transform, arguments);
        }
      }))
      .pipe(minifyHTML())
      .pipe(gulp.dest('./public/'));

  return gulp.src(dev_path.jade)
      .pipe(jade({pretty: true}))
      .pipe(minifyHTML())
      .pipe(gulp.dest(pub_path.html));
}

function bowerTask () {
  return gulp.src('./bower.json')
      .pipe(bowerFiles())
      .pipe(gulp.dest(pub_path.assets));
}

function imagesTask () {
  return gulp.src(dev_path.images)
      .pipe(imagemin())
      .pipe(gulp.dest(pub_path.images))
}

function jsDevTask () {
  var config = gulp.src(dev_path.config)
      .pipe(ngConstant({name: 'app.config'}));

  var scripts = gulp.src(dev_path.js);

  scripts.pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));

  return es.merge(config, scripts)
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(pub_path.js))
}

function jsPubTask () {
  var config = gulp.src(pub_path.config)
      .pipe(ngConstant({name: 'app.config'}));

  var scripts = gulp.src(dev_path.js);

  return es.merge(config, scripts)
      .pipe(concat('app.min.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest(pub_path.js))
}

function bowerJsTask () {
  var filterJS = gulpFilter('**/*.js');
  return gulp.src('./bower.json')
      .pipe(bowerFiles())
      .pipe(filterJS)
      .pipe(concat('vendors.min.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest(pub_path.assets));
}

function bowerCssTask () {
  var filterCSS = gulpFilter('**/*.css');
  return gulp.src('./bower.json')
      .pipe(bowerFiles())
      .pipe(filterCSS)
      .pipe(concat('vendors.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest(pub_path.assets));
}

function webServerTask () {
  gulp.src('public')
      .pipe(webserver({
        livereload: true,
        open: true,
        fallback: 'index.html'
      }));
}

function lessTask () {
  return gulp.src(dev_path.less)
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest(pub_path.css));
}

function i18nTask () {
  return gulp.src(dev_path.i18n)
      .pipe(gulp.dest(pub_path.i18n));
}