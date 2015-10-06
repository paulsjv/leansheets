import gulp from 'gulp';
import livereload from 'gulp-livereload';
import open from 'gulp-open';

import express from 'express';
import livereloadMiddleware from 'connect-livereload';

import os from 'os';

import {paths, EXPRESS_PORT, LIVERELOAD_PORT} from '../project.conf';

const BROWSER = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'
    )
);

gulp.task('preview', ['test:unit', 'reports', 'assets:dev', 'bundle:dev', 'replace:dev'], () => {

    let app = express();

    gulp.watch(paths.src.img('**/*.{png,jpeg,jpg,tiff,webp}'), ['preview:dev:reload']);
    gulp.watch(paths.src.js('**/*.js'), ['preview:dev:reload']);
    gulp.watch(paths.src.sass('**/*.scss'), ['preview:dev:reload']);
    gulp.watch(paths.src.html('**/*.html'), ['preview:dev:reload']);

    app.use(livereloadMiddleware({ port: LIVERELOAD_PORT }));
    app.use(express.static(paths.work()));
    app.listen(EXPRESS_PORT);

    livereload.listen();

    gulp.src('')
        .pipe(open({
            uri: `http://localhost:${EXPRESS_PORT}`,
            app: BROWSER
        }));

    console.log(`Server started at http://localhost:${EXPRESS_PORT}. LiveReload enabled.`);

});

gulp.task('preview:dev', ['preview']);

gulp.task('preview:dev:reload', ['test:unit', 'reports', 'assets:dev', 'bundle:dev', 'replace:dev'], () => {

    gulp.src(paths.work())
        .pipe(gulp.dest('.'))
        .pipe(livereload());

});

gulp.task('preview:dist', ['test:unit', 'reports', 'assets', 'bundle', 'replace', 'revision'], () => {

    let app = express();

    gulp.watch(paths.src.img('**/*.{png,jpeg,jpg,tiff,webp}'), ['preview:dist:reload']);
    gulp.watch(paths.src.js('**/*.js'), ['preview:dist:reload']);
    gulp.watch(paths.src.sass('**/*.scss'), ['preview:dist:reload']);
    gulp.watch(paths.src.html('**/*.html'), ['preview:dist:reload']);

    app.use(livereloadMiddleware({ port: LIVERELOAD_PORT }));
    app.use(express.static(paths.dist()));
    app.listen(EXPRESS_PORT);

    livereload.listen();

    gulp.src('')
        .pipe(open({
            uri: `http://localhost:${EXPRESS_PORT}`,
            app: BROWSER
        }));

    console.log(`Server started at http://localhost:${EXPRESS_PORT}. LiveReload enabled.`);

});

gulp.task('preview:dist:reload', ['test:unit', 'reports', 'assets', 'bundle', 'replace', 'revision'], () => {

    gulp.src(paths.dist())
        .pipe(gulp.dest('.'))
        .pipe(livereload());

});
