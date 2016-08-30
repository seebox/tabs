var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  ctrl: ['www/js/controllers/*.js'],
  libs:['www/lib/ionic/js/ionic.min.js',
  'www/lib/ionic/js/angular/angular.min.js',
  'www/lib/ionic/js/angular/angular-animate.min.js',
  'www/lib/ionic/js/angular/angular-sanitize.min.js',
  'www/lib/ionic/js/angular-ui/angular-ui-router.min.js',
  'www/lib/ionic/js/ionic-angular.min.js']
};
/*!
 * ionic.bundle.js is a concatenation of:
 * ionic.js, angular.js, angular-animate.js,
 * angular-sanitize.js, angular-ui-router.js,
 * and ionic-angular.js
 */
gulp.task('default', ['concatctrl','watch']);



gulp.task('watch', function() {
  gulp.watch(paths.libs, ['concatlibs']);
  gulp.watch(paths.ctrl, ['concatctrl']);
});
gulp.task('concatlibs', function () {
    gulp.src(paths.libs)
        .pipe(concat('ionic.bundle.min.js'))
        .pipe(gulp.dest('./www/lib/js'));
});


gulp.task('concatctrl', function () {
    gulp.src('./www/js/controllers/*.js')
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('./www/js'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(rename('ionic.css'))
    .pipe(gulp.dest('./www/lib/ionic/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename('ionic.min.css'))
    .pipe(gulp.dest('./www/lib/ionic/css/'))
    .on('end', done);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
