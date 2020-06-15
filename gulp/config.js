var dest = "./build"; // Production dir
var src = "./src"; // Development dir
var stylesprep = "scss"; // css preprocessor

var path = {
    src: {
        css: 'src/main.css'
    },

    watch: {
        styles: ['src/styles/**/*.' + stylesprep, 'src/components/**/*.' + stylesprep, '!src/styles/partials/_sprites.' + stylesprep],
        js: 'src/js/**/*.js',
        img: ['src/img/**/*.*', '!src/img/sprite.png', '!src/img/sprite@2x.png'],
        svg: 'src/img/svg/*.svg',
        pug: 'src/**/*.pug',
        fonts: ['src/fonts/**/*.*']
    },
};

module.exports = {
    browsersync: {
        server: {
            baseDir: dest
        },
        tunnel: false,
        open: "local",
        host: 'localhost',
        port: 5000,
        logPrefix: "webserver"
    },

    html: {
        src: 'src/*.pug',
        dest: dest
    },

    pug: {
        src: ['src/**/*.pug', '!src/components-collection/**/*.pug'],
        dest: dest
    },

    htmlPrettify: {
        'unformatted': [ 'pre', 'code', 'textarea' ],
        'indent_with_tabs': true,
        'preserve_newlines': true,
        'brace_style': 'expand',
        'end_with_newline': true
    },

    styles: {
        src: 'src/styles/main.' + stylesprep,
        dest: dest + '/css'
    },

    stylelint: {
        src: path.src.stylelint
    },

    js: {
        src: {
            vendor: 'src/js/vendor.js',
            app: 'src/js/app.js',
            legacy: 'src/js/legacy.js',
        },
        dest: dest + '/js'
    },

    images: {
        src: ['src/img/**/*.*', '!src/img/sprite/**/*.*', '!src/img/sprite@2x/**/*.*', '!src/img/svg/*.svg'],
        dest: dest + '/img',
    },

    webp: {
        src: ['src/img/*.jpg', 'src/img/*.png', '!src/img/sprite.png', '!src/img/sprite@2x.png'],
        dest: dest + '/img',
    },

    sprites: {
        src: ['src/img/sprite/**/*.png', 'src/img/sprite@2x/**/*.png'],
        dest: {
            css: 'src/styles/base',
            img: 'src/img',
        },
        options: {
            retinaSrcFilter: 'src/img/sprite@2x/*@2x.png',
            imgName: 'sprite.png',
            imgPath: '../img/sprite.png',
            retinaImgName: 'sprite@2x.png',
            retinaImgPath: '../img/sprite@2x.png',
            cssName: '_sprites.' + stylesprep,
            cssTemplate: 'gulp/templates/_sprite-template.' + stylesprep,
            algorithm: 'top-down',
            padding: 10,
            // engine: 'pngsmith'
        }
    },

    svg: {
        src: 'src/img/svg/*.svg'
    },

    iconfont: {
        options: {
            fontName: 'iconfont',
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff'],
            timestamp: Math.round(Date.now() / 1000),
            normalize: true,
            fontHeight: 1024,
        }
    },

    iconfontCss: {
        options: {
            fontName: 'iconfont',
            path: 'gulp/templates/_iconfont.' + stylesprep,
            targetPath: '../../src/styles/base/_iconfont.' + stylesprep,
            fontPath: '../fonts/'
        }
    },

    svgSprite: {
        dest: 'src/js/partials',
    },

    favicons: {
        src: 'src/favicons/*',
        dest: dest + '/favicons'
    },

    fonts: {
        src: ['src/fonts/**/*.*'],
        dest: dest + '/fonts',
    },

    watch: {
        styles: path.watch.styles,
        js: path.watch.js,
        img: path.watch.img,
        svg: path.watch.svg,
        iconfont: path.watch.svg,
        pug: path.watch.pug,
    },

    // Wrap gulp streams into fail-safe function for better error reporting
    wrapPipe: function(taskFn) {
        return function(done) {
            var onSuccess = function() {
                done();
            };
            var onError = function(err) {
                done(err);
            }
            var outStream = taskFn(onSuccess, onError);
            if(outStream && typeof outStream.on === 'function') {
                outStream.on('end', onSuccess);
            }
        }
    }
};
