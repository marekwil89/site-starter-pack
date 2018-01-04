var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

var src_sass = './src/assets/scss/**/*.scss';
var dest_css = './src/assets/css';
var src_html = './src/**/*.html';
var src_js = './src/assets/js/*.js';

gulp.task('sass', function(){
    return gulp.src(src_sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix({
            browsers: ['last 3 versions']
        }))
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(dest_css))

        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function(){

    browserSync.init({
        browser: "chrome",
        server: './src/'
    });
    gulp.watch(src_sass, ['sass']);
    gulp.watch(src_html).on('change', browserSync.reload);
    gulp.watch(src_js).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'sass']);