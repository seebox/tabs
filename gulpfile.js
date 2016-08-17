var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');

var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  ctrl: ['www/js/controllers/*.js']
};

gulp.task('default', ['concatctrl','watch']);



gulp.task('watch', function() {

  gulp.watch(paths.ctrl, ['concatctrl']);
});

gulp.task('concatctrl', function () {
    gulp.src('./www/js/controllers/*.js')
        .pipe(concat('controllers.js'))//合并后的文件名
        .pipe(gulp.dest('./www/js'));
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
