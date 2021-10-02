const {src, dest, watch, parallel} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

function styles() {
    return src('app/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(dest('app/css'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js/'))
}




exports.styles = styles;
exports.scripts = scripts;