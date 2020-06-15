// Pug -> HTML
// npm i gulpjs/gulp#4.0 gulp-if gulp-pug emitty
var gulp = require('gulp');
var gulpif = require('gulp-if');
var pug = require('gulp-pug');
var emitty = require('emitty').setup('src', 'pug');

// Your "watch" task
gulp.task('watch-pug', () => {
    // Shows that run "watch" mode
    global.watch = true;

    gulp.watch('src/**/*.pug', ['pug'])
        .on('all', (event, filepath) => {
            global.emittyChangedFile = filepath;
        });
});

gulp.task('pug', () =>
    new Promise((resolve, reject) => {
        emitty.scan(global.emittyChangedFile).then(() => {
            gulp.src('src/*.pug')
                .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
                .pipe(pug({ pretty: true }))
                .pipe(gulp.dest('build'))
                .on('end', resolve)
                .on('error', reject);
        });
    })
);
