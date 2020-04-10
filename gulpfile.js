'use strict';

/* config */


const SRC = {
    FILES: [
        './src/*.*', 
        './src/**/fonts/*.*', 
        './src/**/.htaccess',
        '!./src/**/*.html', 
        '!./src/**/*.pug', 
        // './src/**/*.php', 
        // './src/**/*.settings'
    ],
    PUG: ['./src/**/*.pug'],
    HTML: [
        './src/**/*.html'
    ],
    FONTS: ['./src/fonts/*'],
    IMAGES: './src/img/**/*.+(ico|svg|png|jpg|gif|webp)',
    SCSS: {
        HEADER: ['./src/scss/header/*.scss'],
        VENDOR: {
            HEADER: ['./src/scss/vendor/header/*.scss'],
            FOOTER: ['./src/scss/vendor/footer/*.scss'],
        },
        FOOTER: ['./src/scss/footer/*.scss'],
    },
    JS: {
        HEADER: './src/js/header/*.js',
        FOOTER: './src/js/footer/*.js',
        VENDOR: {
            HEADER: './src/js/vendor/header/*.js',
            FOOTER: './src/js/vendor/footer/*.js',
        },
    },
};


const DEV = {
    ROOT: './dev/',
    FILES: [
        './dev/*.*',
        './dev/**/fonts/*.*',
        './dev/**/img/**/*.*',
        './dev/**/.htaccess',
        './dev/**/*.html',
        // './src/**/*.php',
        // './src/**/*.settings'
    ],
    // HTML: './dev/**/*.html',
    CSS: {
        ROOT: './dev/css/',
        VENDOR: './dev/css/vendor/',
        HEADER: ['./dev/css/vendor/header.min.css', './dev/css/header.min.css'],
        FOOTER: ['./dev/css/vendor/footer.min.css', './dev/css/footer.min.css'],
    },
    JS: {
        ROOT: './dev/js/',
        VENDOR: './dev/js/vendor/',
        HEADER: ['./dev/js/vendor/header.min.js', './dev/js/header.min.js'],
        FOOTER: ['./dev/js/vendor/footer.min.js', './dev/js/footer.min.js'],
    },
    IMAGES: './dev/img/',
    FONTS: ['./dev/fonts/'],
};


const AUTOPREFIXER_BROWSERS = ['last 9 version', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'];
/* end config */

const gulp = require('gulp'),
    // ftp = require('vinyl-ftp'),
    // gutil = require('gulp-util'),
    bs = require('browser-sync'),
    pug = require('gulp-pug'),
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

    // //images
    // responsive = require('gulp-responsive'),//https://www.npmjs.com/package/gulp-responsive
    // //uni
    // $ = require('gulp-load-plugins')();



gulp.task('clean_dev', function () {
    //сначала очистка
    return gulp.src(DEV.ROOT, { read: true, allowEmpty: true })
        .pipe(clean());
});

gulp.task('move_files', function () {
    return gulp.src(SRC.FILES)
        .pipe(gulp.dest(DEV.ROOT));
});


gulp.task('pug', function () {
    return gulp.src(SRC.PUG)
        .pipe(pug({pretty: '\t'}))
        .pipe(gulp.dest(DEV.ROOT))
        .pipe(bs.stream());
});


// Gulp task to minify HTML files
gulp.task('minhtml', function () {
    return gulp.src(SRC.HTML)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(DEV.ROOT));
});

gulp.task('scss_header', function () {
    //сначала очистка
    gulp.src(DEV.CSS.ROOT+'header.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.SCSS.HEADER)
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css
        .pipe(concat('header.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV.CSS.ROOT))
        .pipe(bs.stream());
});

gulp.task('scss_footer', function () {
    //сначала очистка
    gulp.src(DEV.CSS.ROOT+'footer.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.SCSS.FOOTER, {allowEmpty: true })
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(concat('footer.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV.CSS.ROOT))
        .pipe(bs.stream());
});

gulp.task('scss_vendor_header', function () {
    //сначала очистка
    gulp.src(DEV.CSS.VENDOR+'header.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.SCSS.VENDOR.HEADER)
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(concat('header.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV.CSS.VENDOR))
        .pipe(bs.stream());
});

gulp.task('scss_vendor_footer', function () {
    //сначала очистка
    gulp.src(DEV.CSS.VENDOR+'footer.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.SCSS.VENDOR.FOOTER, { allowEmpty: true })
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(concat('footer.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV.CSS.VENDOR))
        .pipe(bs.stream());
});

gulp.task('js_vendor_header', function () {
    //сначала очистка
    gulp.src(DEV.JS.VENDOR+'header.min.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.JS.VENDOR.HEADER, { allowEmpty: true })
        .pipe(concat('header.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV.JS.VENDOR));
});

gulp.task('js_vendor_footer', function () {
    //сначала очистка
    gulp.src(DEV.JS.VENDOR+'footer.min.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.JS.VENDOR.FOOTER, { allowEmpty: true })
        .pipe(concat('footer.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV.JS.VENDOR));
});

gulp.task('js_header', function () {
    //сначала очистка
    gulp.src(DEV.JS.ROOT+'header.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.JS.HEADER)
        .pipe(concat('header.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV.JS.ROOT));
});

gulp.task('js_footer', function () {
    //сначала очистка
    gulp.src(DEV.JS.ROOT+'footer.min.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC.JS.FOOTER)
        .pipe(concat('footer.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV.JS.ROOT));
});

//очистка старых изображений
// gulp.task('clean_img', function () {
//     return gulp.src(DEV.IMAGES, { read: false, allowEmpty: true })
//         .pipe(clean());
// });

gulp.task('imagemin', function () {
    return gulp.src(SRC.IMAGES)
        .pipe(imagemin([
            pngquant({ quality: [0.89, 0.91] }),
            mozjpeg({ quality: 81 })
        ]))
        .pipe(gulp.dest(DEV.IMAGES))
});


// export to webp
gulp.task("ewebp", function () {
    return gulp.src(SRC.IMAGES)
        .pipe(
            imagemin([
                webp({
                    quality: 81
                })
            ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(DEV.IMAGES));
});


// Static Server + watching scss/html files
gulp.task('run_server', function (done) {
    bs.init({ // browser sync
        server: DEV.ROOT
    });
    gulp.watch(SRC.PUG, gulp.series('pug'));
    gulp.watch(SRC.SCSS.HEADER, gulp.series('scss_header'));
    gulp.watch(SRC.SCSS.FOOTER, gulp.series('scss_footer'));
    gulp.watch(SRC.SCSS.VENDOR.HEADER, gulp.series('scss_vendor_header'));
    gulp.watch(SRC.SCSS.VENDOR.FOOTER, gulp.series('scss_vendor_footer'));
    gulp.watch(SRC.JS.VENDOR.HEADER, gulp.series('js_vendor_header'));
    gulp.watch(SRC.JS.VENDOR.FOOTER, gulp.series('js_vendor_footer'));
    gulp.watch(SRC.JS.HEADER, gulp.series('js_header'));
    gulp.watch(SRC.JS.FOOTER, gulp.series('js_footer'));
    gulp.watch(SRC.FILES, gulp.series('move_files'));
    done();
});

gulp.task('default', gulp.series('clean_dev', 'pug', 'minhtml', 'move_files', 'scss_vendor_header', 'scss_vendor_footer', 'scss_header', 'scss_footer', 'js_vendor_header', 'js_vendor_footer', 'js_header', 'js_footer', 'imagemin', 'ewebp', 'run_server'));



/* PRODACTION TO DIST */
const DIST = {
    ROOT: './dist/',
    CSS: './dist/css/',
    JS: './dist/js/'
};


gulp.task('clean_dist', function () {
    //сначала очистка
    return gulp.src(DIST.ROOT, { read: true, allowEmpty: true })
        .pipe(clean());
});
// Gulp task to minify HTML files
gulp.task('move_files_dist', function () {
    return gulp.src(DEV.FILES)
        .pipe(gulp.dest(DIST.ROOT));
});


gulp.task('css_header_concat', function () {
    return gulp.src(DEV.CSS.HEADER, { allowEmpty: true })
        .pipe(concat('header.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST.CSS))
        .pipe(bs.stream());
});


gulp.task('css_footer_concat', function () {
    return gulp.src(DEV.CSS.FOOTER, { allowEmpty: true })
        .pipe(concat('footer.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST.CSS))
        .pipe(bs.stream());
});


gulp.task('js_header_concat', function () {
    return gulp.src(DEV.JS.HEADER, { allowEmpty: true })
        .pipe(concat('header.js'))      
        .pipe(rename({ suffix: '.min' }))
        // .pipe(uglify())
        .pipe(gulp.dest(DIST.JS));
});


gulp.task('js_footer_concat', function () {
    return gulp.src(DEV.JS.FOOTER, { allowEmpty: true })
        .pipe(concat('footer.js'))      
        .pipe(rename({ suffix: '.min' }))
        // .pipe(uglify())
        .pipe(gulp.dest(DIST.JS));
});


gulp.task('dist', gulp.series('clean_dist', 'move_files_dist', 'css_header_concat', 'css_footer_concat', 'js_header_concat', 'js_footer_concat'));