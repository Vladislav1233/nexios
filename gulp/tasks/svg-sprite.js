// SVG sprite generation
var gulp = require('gulp');
var config = require('../config');
var $ = require('gulp-load-plugins')();
var path = require('path');

gulp.task('svg-sprite', function () {
  return gulp
    .src(config.svg.src)
    .pipe($.svgmin())
    .pipe($.svgstore({inlineSvg: true}))
    .pipe($.svg2string())
    .pipe(gulp.dest(config.svgSprite.dest));
});
