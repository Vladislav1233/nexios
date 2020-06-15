// Copy images from development dir to production dir
var gulp = require('gulp');
var config = require('../config');
var $ = require('gulp-load-plugins')();
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngquant = require('imagemin-pngquant');
var imageminGifsicle = require('imagemin-gifsicle');
var imageminSvgo = require('imagemin-svgo');

gulp.task('webp', function () {
    return gulp.src(config.webp.src)
        .pipe($.plumber())
        .pipe($.cached('src/img'))
        .pipe($.newer(config.images.dest))
        .pipe($.webp())
        .pipe(gulp.dest(config.images.dest))
});

gulp.task('images', ['sprites'], config.wrapPipe(function(success, error) {
    return gulp.src(config.images.src)
        .pipe($.plumber())
        .pipe($.newer(config.images.dest))
        .pipe($.imagemin([
            imageminGifsicle({
                interlaced: true,
                optimizationLevel: 3
            }),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            imageminPngquant({
                speed: 1,
                quality: 98
            }),
            imageminSvgo({
                plugins: [
                    { removeViewBox: false }
                ]
            })
        ]))
        .pipe(gulp.dest(config.images.dest))
}));
