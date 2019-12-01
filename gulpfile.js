'use strict';

/* config */
// ! - перед путем позволяет пропустить файлы в дирректории
const SRC_PAGES = ['./src/**/*.html'];
const SRC_IMAGES = './src/img/**/*.+(ico|svg|png|jpg|webp)';
const SRC_SASS_HEADER = [
    './src/sass/header/*.sass',
    '!./src/sass/header/_*.sass'
];
const SRC_SASS_FOOTER = [
    './src/sass/footer/*.sass',
    '!./src/sass/footer/_*.sass'
];
const SRC_JS_HEADER = [
    './src/js/header/**/_*.js',
    './src/js/header/**/*.js'
];
const SRC_JS_FOOTER = [
    './src/js/footer/**/_*.js',
    './src/js/footer/**/*.js'
];
const SRC_JS_LIBS = [
    './src/libs/**/_*.js',
    './src/libs/**/*.js'
];
const DIST = './dist/';
const DIST_CSS = './dist/css/';
const DIST_JS = './dist/js/';
const DIST_IMAGES = './dist/img/';
const AUTOPREFIXER_BROWSERS = ['last 9 version', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'];
/* end config */

const gulp = require('gulp'),
    bs = require('browser-sync'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    //images
    imagemin = require('gulp-imagemin'),
    mozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant'),
    webp = require('imagemin-webp'),
    extReplace = require("gulp-ext-replace"),
    responsive = require('gulp-responsive'),//https://www.npmjs.com/package/gulp-responsive
    //clean
    clean = require('gulp-clean'),
    //uni
    $ = require('gulp-load-plugins')();



gulp.task('default', ['serve']);

// Static Server + watching scss/html files
gulp.task('serve', ['pages', 'sass', 'js', 'transferImg'], function () {
    bs.init({ // browser sync
        server: DIST
    });
    gulp.watch(SRC_SASS_HEADER, ['sass']).on('change', bs.reload);
    gulp.watch(SRC_SASS_FOOTER, ['sass']).on('change', bs.reload);
    // gulp.watch(SRC_JS_LIBS, ['js']).on('change', bs.reload);
    gulp.watch(SRC_JS_HEADER, ['js']).on('change', bs.reload);
    gulp.watch(SRC_JS_FOOTER, ['js']).on('change', bs.reload);
    gulp.watch("./src/**/*.html", ['pages']).on('change', bs.reload);
});

// Gulp task to minify HTML files
gulp.task('pages', function () {
    return gulp.src(SRC_PAGES)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(DIST));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    //сначала очистка
    gulp.src(DIST_CSS, { read: true })
        .pipe(clean());

    gulp.src(SRC_SASS_HEADER)
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(rename({ suffix: '.header.min' }))
        .pipe(gulp.dest(DIST_CSS))
        .pipe(bs.stream());

    gulp.src(SRC_SASS_FOOTER)
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(rename({ suffix: '.footer.min' }))
        .pipe(gulp.dest(DIST_CSS))
        .pipe(bs.stream());
});

gulp.task('js', function () {
    //сначала очистка
    gulp.src(DIST_JS, { read: false })
        .pipe(clean());

    gulp.src(SRC_JS_LIBS)
        .pipe(concat('libs.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_JS));

    gulp.src(SRC_JS_HEADER)
        .pipe(concat('header.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_JS));

    gulp.src(SRC_JS_FOOTER)
        .pipe(concat('footer.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(gulp.dest(DIST_JS))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        // .on('error', function (e) {
        //     console.log(e);
        // })
        .pipe(gulp.dest(DIST_JS));
});

gulp.task('transferImg', ['cleanImg', 'imagemin'], function () {
    gulp.src(SRC_IMAGES)
        .pipe(gulp.dest(DIST_IMAGES));
});

//очистка старых изображений
gulp.task('cleanImg', function () {
    gulp.src(DIST_IMAGES, { read: false })
        .pipe(clean());
});

//https://github.com/mahnunchik/gulp-responsive/blob/HEAD/examples/gulp-responsive-config.md
gulp.task('images', ['cleanImg'], function () {
    // Make configuration from existing HTML and CSS files
    var config = $.responsiveConfig([
        './src/sass/*.sass',
        './src/*.html'
    ]);
    // console.log(config);
    gulp.src(['./src/**/*.jpg'])
        // Use configuration
        .pipe($.responsive(config, {
            stats: true,
            errorOnUnusedImage: false,
            passThroughUnused: false,
            progressive: true,
            quality: 75,
            withMetadata: false,
            compressionLevel: 9,
            format: 'jpg',
            // min: true,
            // max: true,
            resize: { fit: "contain", position: "center" }
        }))
        .pipe(gulp.dest('./dist'));
});

//https://www.npmjs.com/package/gulp-responsive
gulp.task('thumbs', function () {
    gulp.src('./dist/img/**/*.jpg')
        .pipe($.responsive({
            '**/*.jpg': {
                stats: true,
                progressive: true,
                width: '100%',
                quality: 15,
                blur: true,
                compressionLevel: 9,
                format: 'jpg',
                rename: {
                    suffix: '-thumb'
                }
            }
        }, {
            // Global configuration for all images
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
        }))
        .pipe(gulp.dest('./dist/img/'))
});



gulp.task('imagemin', () => {
    gulp.src(SRC_IMAGES)
        .pipe(imagemin([
            pngquant({ quality: [0.90, 0.91] }),
            mozjpeg({ quality: 79 })
        ]))
        .pipe(gulp.dest(DIST_IMAGES))
});

// its working
// export to webp
gulp.task("ewebp", function () {
    let src = ["./src/img/**/*.+(jpg|png|jpeg|webp)"]; // Where your PNGs are coming from.
    let dest = "./src/img/"; // Where your WebPs are going.
    return gulp.src(src)
        .pipe(
            imagemin([
                webp({
                    quality: 75
                })
            ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(dest));
});

gulp.task('deploy', function () {

    var conn = ftp.create({
        host: 'arch',
        user: 'artegm',
        password: 'ghjhghgh',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'src/**/*',
        // 'css/**',
        // 'js/**',
        // 'fonts/**',
        // 'index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src(globs, { base: '.', buffer: false })
        .pipe(conn.newer('/public_html/projects/flowers/')) // only upload newer files
        .pipe(conn.dest('/public_html/projects/flowers/'));

});