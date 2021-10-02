const {src, dest, watch, parallel} = require('gulp');

const sass         = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const image        = require('gulp-image');
const browserSync  = require('browser-sync').create();

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true,
            index: "index.html"
        }
    });
};

function styles() {
    return src('app/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*')
    .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true // defaults to false
      }))
	.pipe(dest('dist/images/'))
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.browsersync = browsersync;
exports.watching = watching;

exports.default = parallel(scripts, browsersync, watching, styles);