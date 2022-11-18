const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


// IMG
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css(done){

    src('src/scss/**/*.scss')  // Identificar archivo SASS
    .pipe(plumber())
    .pipe(sass())   // Compilar
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



function dev(done) {
    watch('src/scss/**/*.scss', css)

    done();
}

exports.css = css;
exports.img = img;
exports.versionWebp = versionWebp;
exports.dev = parallel ( img, versionWebp, dev );