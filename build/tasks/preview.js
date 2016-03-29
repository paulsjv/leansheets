import gulp from 'gulp';
import manifold from 'gulp-manifold';
import livereload from 'gulp-livereload';
import open from 'gulp-open';

import os from 'os';

import {paths, EXPRESS_PORT, LIVERELOAD_PORT} from '../project.conf';
import StreamCompiler from '../support/stream/StreamCompiler';
import StreamServer from '../support/stream/StreamServer';

let streamCompiler = new StreamCompiler(),
    streamServer = new StreamServer(),

    compilerOpts = {
        sourceMaps: 'inline',
        lowResSourceMaps: true
    },

    browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'
        )
    );

gulp.task('preview', (done) => {

    livereload.listen();

    gulp.watch(
        [
            paths.jspm.fontAwesome('fonts/*'),
            paths.jspm.twitterBootstrap('fonts/*'),
            paths.src('**/*')
        ],
        ['preview:watch']
    );

    return gulp.src([
            paths.jspm.fontAwesome('fonts/*'),
            paths.jspm.twitterBootstrap('fonts/*'),
            paths.src('**/*')
        ])
        .pipe(streamCompiler.compile(compilerOpts))
        .pipe(streamServer.listen(EXPRESS_PORT, LIVERELOAD_PORT))
        .pipe(open({
            uri: `http://localhost:${EXPRESS_PORT}`,
            app: browser
        }));

});

gulp.task('preview:watch', () => {

    return gulp.src([
            paths.jspm.fontAwesome('fonts/*'),
            paths.jspm.twitterBootstrap('fonts/*'),
            paths.src('**/*')
        ])
        .pipe(streamCompiler.compile(compilerOpts))
        .pipe(streamServer.update())
        .pipe(livereload({quiet: true}));

});

gulp.task('preview:dist', ['dist'], (done) => {

    return gulp.src([
            paths.dist('**/*')
        ])
        .pipe(streamServer.listen(EXPRESS_PORT))
        .pipe(open({
            uri: `http://localhost:${EXPRESS_PORT}`,
            app: browser
        }));

});
