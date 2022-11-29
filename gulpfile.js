const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// IMG
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// Javascript
const terser = require('gulp-terser-js');

function css(done){
    src('src/scss/**/*.scss')  // Identificar archivo SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())   // Compilar
    .pipe( postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe( dest('build/css') );  // Almacenar en disco duro


    done(); //Callback que avisa cuando finaliza
}

function img(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(  cache( imagemin (opciones)) )
    .pipe( dest('build/img') )


    done();
}

function versionWebp(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) )
    .pipe( dest('build/img'))

    done();
}

function js(done) {
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));


    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);

    done();
}

exports.css = css;
exports.js = js;
exports.img = img;
exports.versionWebp = versionWebp;
exports.dev = parallel ( js, img, versionWebp, dev );