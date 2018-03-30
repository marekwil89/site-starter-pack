const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const src_sass = './src/assets/scss/**/*.scss';
const src_js = './src/assets/js/*.js';
const dest_css = './src/dist/css';
const dest_js = './src/dist/js';
const src_html = './src/**/*.html';

// gulp.task('js', function(){
//     return gulp.src(src_js)
//         .pipe(babel({
//             presets: ['env']
//         })
//         .pipe(concat('all.js')
//         .pipe(gulp.dest(dest_js))
//         .pipe(browserSync.reload({stream: true}))
// });

gulp.task('js', function(){
    return gulp.src(src_js)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('bundle.js'))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest_js))
        .pipe(browserSync.reload({stream: true}))
});

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
    gulp.watch(src_js, ['js']);
    // gulp.watch(src_html).on('change', browserSync.reload);
    // gulp.watch(src_js).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);