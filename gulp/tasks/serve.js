var gulp = require('gulp');
var config = require('../config');
var browsersync = require('browser-sync');

gulp.task('serve', function() {
    browsersync(config.browsersync);
});
