import gulp from 'gulp';
import jspm from 'gulp-jspm';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

import {APP_NAME, entryPoint, paths} from '../project.conf';

gulp.task('bundle', ['bundle:js', 'bundle:sass'], (done) => {
    done();
});

gulp.task('bundle:js', ['clean:work'], () => {

    return gulp.src(paths.src.js(entryPoint.js))
        .pipe(jspm({
            selfExecutingBundle: true
        }))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename(`${APP_NAME}.js`))
        .pipe(gulp.dest(paths.work.js()));

});

gulp.task('bundle:sass', ['clean:work'], () => {

    return gulp.src(paths.src.sass(entryPoint.sass))
        .pipe(rename(`${APP_NAME}.css`))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.work.css()));

});

gulp.task('bundle:dev', ['bundle:dev:js', 'bundle:dev:sass']);

gulp.task('bundle:dev:js', ['clean:work'], () => {

    return gulp.src(paths.src.js(entryPoint.js))
        .pipe(sourcemaps.init())
        .pipe(jspm({
            selfExecutingBundle: true
        }))
        .pipe(rename(`${APP_NAME}.js`))
        .pipe(sourcemaps.write('.', {
            defaultSourceRoot: '/source/js/'
        }))
        .pipe(gulp.dest(paths.work.js()));


});

gulp.task('bundle:dev:sass', ['clean:work'], () => {

    return gulp.src(paths.src.sass(entryPoint.sass))
        .pipe(rename(`${APP_NAME}.css`))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.', {
            defaultSourceRoot: '/source/sass/'
        }))
        .pipe(gulp.dest(paths.work.css()));

});
