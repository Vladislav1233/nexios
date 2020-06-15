// Copy favicons from development dir to production dir
var gulp = require('gulp');
var config = require('../config');
var $ = require('gulp-load-plugins')();

gulp.task('favicons', function() {
    gulp.src(config.path.favicons.src)
    .pipe($.newer(config.path.favicons.dest))
    .pipe(gulp.dest(config.path.favicons.dest))
});
