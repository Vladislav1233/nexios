// Iconfont generation
var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');
var iconfont = require('gulp-iconfont');
var consolidate  = require('gulp-consolidate');
var iconfontCss = require('gulp-iconfont-css');

gulp.task('iconfont', config.wrapPipe(function(success, error) {
    return gulp.src(config.svg.src)
        .pipe(iconfontCss(config.iconfontCss.options))
        .pipe(iconfont(config.iconfont.options))
        .pipe(gulp.dest(config.fonts.dest));
}));
