'use strict';

/* config */
const SRC_PAGES = ['./src/**/*.html'];

const DIST = './dist/';

const SRC_IMAGES = './src/img/**/*.+(ico|svg|png|jpg|gif|webp)';
const DIST_IMAGES = './dist/img/';

const SRC_SCSS_HEADER = [
    './src/scss/header/*.scss'
];
const DIST_CSS_HEADER = './dist/css/header/';
const SRC_SCSS_FOOTER = [
    './src/scss/footer/*.scss'
];
const DIST_CSS_FOOTER = './dist/css/footer/';

const SRC_SCSS_VENDOR_HEADER = [
    './src/scss/vendor/header/*.scss'
];
const DIST_CSS_VENDOR_HEADER = './dist/css/vendor/header/';
const SRC_SCSS_VENDOR_FOOTER = [
    './src/scss/vendor/footer/*.scss'
];
const DIST_CSS_VENDOR_FOOTER = './dist/css/vendor/footer/';

const SRC_JS_VENDOR_HEADER = './src/js/vendor/header/';
const SRC_JS_VENDOR_FOOTER = './src/js/vendor/footer/';
const DIST_JS_VENDOR_HEADER = './dist/js/vendor/header/';
const DIST_JS_VENDOR_FOOTER = './dist/js/vendor/footer/';
const SRC_JS_HEADER = './src/js/header/';
const SRC_JS_FOOTER = './src/js/footer/';
const DIST_JS_HEADER = './dist/js/header/';
const DIST_JS_FOOTER = './dist/js/footer/';

const AUTOPREFIXER_BROWSERS = ['last 9 version', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'];
/* end config */

const gulp = require('gulp'),
    bs = require('browser-sync'),
    htmlmin = require('gulp-htmlmin'),
    //clean
    clean = require('gulp-clean'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg'),
    webp = require('imagemin-webp'),
    extReplace = require("gulp-ext-replace"),
    uglify = require('gulp-uglify-es').default;

    // gutil = require('gulp-util'),
    // ftp = require('vinyl-ftp'),
    // //images
    // responsive = require('gulp-responsive'),//https://www.npmjs.com/package/gulp-responsive
    // //uni
    // $ = require('gulp-load-plugins')();



// Gulp task to minify HTML files
gulp.task('pages', function () {
    return gulp.src(SRC_PAGES)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(DIST));
});

gulp.task('scss_header', function () {
    //сначала очистка
    gulp.src(DIST_CSS_HEADER, { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_HEADER)
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(rename({ suffix: '.header.min' }))
        .pipe(gulp.dest(DIST_CSS_HEADER))
        .pipe(bs.stream());
});

gulp.task('scss_footer', function () {
    //сначала очистка
    gulp.src(DIST_CSS_FOOTER, { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_FOOTER, {allowEmpty: true })
    .pipe(scss())
    .pipe(autoprefixer({
        overrideBrowserslist: AUTOPREFIXER_BROWSERS,
        cascade: false,
        grid: 'autoplace',
        remove: false
    }))
    .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
    .pipe(rename({ suffix: '.footer.min' }))
    .pipe(gulp.dest(DIST_CSS_FOOTER))
    .pipe(bs.stream());
});

gulp.task('scss_vendor_header', function () {
    //сначала очистка
    gulp.src(DIST_CSS_VENDOR_HEADER, { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_VENDOR_HEADER)
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(rename({ suffix: '.header.min' }))
        .pipe(gulp.dest(DIST_CSS_VENDOR_HEADER))
        .pipe(bs.stream());
});

gulp.task('scss_vendor_footer', function () {
    //сначала очистка
    gulp.src(DIST_CSS_VENDOR_FOOTER, { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_VENDOR_FOOTER, {allowEmpty: true })
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(rename({ suffix: '.footer.min' }))
        .pipe(gulp.dest(DIST_CSS_VENDOR_FOOTER))
        .pipe(bs.stream());
});

gulp.task('js_vendor_header', function () {
    //сначала очистка
    gulp.src(DIST_JS_VENDOR_HEADER, { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_JS_VENDOR_HEADER, {allowEmpty: true})
        .pipe(concat('libs.header.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_JS_VENDOR_HEADER));
});

gulp.task('js_vendor_footer', function () {
    //сначала очистка
    gulp.src(DIST_JS_VENDOR_FOOTER, { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_JS_VENDOR_FOOTER, {allowEmpty: true})
        .pipe(concat('libs.footer.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_JS_VENDOR_FOOTER));
});

gulp.task('js_header', function () {
    return gulp.src(SRC_JS_HEADER)
        .pipe(concat('header.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_JS_HEADER));
});

gulp.task('js_footer', function () {
    return gulp.src(SRC_JS_FOOTER)
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
    .pipe(gulp.dest(DIST_JS_FOOTER));
});

//очистка старых изображений
gulp.task('cleanImg', function () {
    return gulp.src(DIST_IMAGES, { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('imagemin', function () {
    return gulp.src(SRC_IMAGES)
        .pipe(imagemin([
            pngquant({ quality: [0.89, 0.91] }),
            mozjpeg({ quality: 81 })
        ]))
        .pipe(gulp.dest(DIST_IMAGES))
});

gulp.task('transferImg', function () {
    return gulp.src(SRC_IMAGES)
        .pipe(gulp.dest(DIST_IMAGES));
});

// export to webp
gulp.task("ewebp", function () {
    return gulp.src(SRC_IMAGES)
        .pipe(
            imagemin([
                webp({
                    quality: 75
                })
            ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(DIST_IMAGES));
});


// Static Server + watching scss/html files
gulp.task('run_server', function (done) {
    bs.init({ // browser sync
        server: DIST
    });
    gulp.watch(SRC_SCSS_HEADER, gulp.series('scss_header'));
    gulp.watch(SRC_SCSS_FOOTER, gulp.series('scss_footer'));
    gulp.watch(SRC_SCSS_VENDOR_HEADER, gulp.series('scss_vendor_header'));
    gulp.watch(SRC_SCSS_VENDOR_FOOTER, gulp.series('scss_vendor_footer'));
    gulp.watch(SRC_JS_VENDOR_HEADER, gulp.series('js_vendor_header'));
    gulp.watch(SRC_JS_VENDOR_FOOTER, gulp.series('js_vendor_footer'));
    gulp.watch(SRC_JS_HEADER, gulp.series('js_header'));
    gulp.watch(SRC_JS_FOOTER, gulp.series('js_footer'));
    gulp.watch(SRC_PAGES, gulp.series('pages'));
    done();
});


gulp.task('default', gulp.series('pages', 'scss_vendor_header', 'scss_vendor_footer', 'scss_header', 'scss_footer', 'js_vendor_header', 'js_vendor_footer', 'js_header', 'js_footer', 'cleanImg', 'imagemin', 'transferImg', 'ewebp', 'run_server'));









//https://github.com/mahnunchik/gulp-responsive/blob/HEAD/examples/gulp-responsive-config.md
gulp.task('images', function () {
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