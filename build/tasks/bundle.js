import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

import jspm from 'jspm';

import {APP_NAME, entryPoint, paths} from '../project.conf';

gulp.task('bundle', ['bundle:js', 'bundle:sass'], (done) => {
    done();
});

gulp.task('bundle:js', ['clean:work'], (done) => {

    jspm.bundleSFX(paths.src.js(entryPoint.js), paths.work.js(`${APP_NAME}.js`), {
        minify: true
    })
    .then(done)
    .catch(done);

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

gulp.task('bundle:dev:js', ['clean:work'], (done) => {

    jspm.bundleSFX(paths.src.js(entryPoint.js), paths.work.js(`${APP_NAME}.js`), {
        mangle: false,
        sourceMaps: "inline",
        lowResSourceMaps: false,
        sourceMapContents: true,
        config: {
            sourceMapContents: true
        }
    })
    .then(done)
    .catch(done);

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
