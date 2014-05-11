var gulp = require('gulp');
var traceur = require('gulp-traceur');
var bower = require('gulp-bower-files');
var connect = require('gulp-connect');
var clean = require('gulp-clean');

var paths = {
  es6Scripts: ['src/**/*.js', '!src/main.js'],
  copy: ['src/**/*.html', 'src/main.js'],
  build: 'build'
};

gulp.task('connect', function () {
  connect.server({
    root: paths.build,
    port: 5555,
    livereload: true
  });
});

gulp.task('copy', function () {
  return gulp.src(paths.copy).
    pipe(gulp.dest(paths.build)).
    pipe(connect.reload());
});

gulp.task('es6', function() {
  return gulp.src(paths.es6Scripts).pipe(traceur({
    sourceMap: true,
    annotations: true,
    modules: 'amd'
  })).pipe(gulp.dest(paths.build)).
    pipe(connect.reload());
});

gulp.task('bower', function () {
  return bower().pipe(gulp.dest(paths.build + '/lib'));
});

gulp.task('clean', function () {
  return gulp.src(paths.build, {read: false}).
    pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(paths.es6Scripts, ['es6']);
  gulp.watch(paths.copy, ['copy']);
});


gulp.task('compile', ['copy', 'bower', 'es6']);
gulp.task('default', ['compile', 'connect', 'watch']);
