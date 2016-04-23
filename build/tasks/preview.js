import gulp from 'gulp';
import livereload from 'gulp-livereload';
import open from 'gulp-open';

import {APP_NAME, paths, EXPRESS_PORT, LIVERELOAD_PORT, BROWSER} from '../project.conf';

import StreamCompiler from '../support/stream/StreamCompiler';
import StreamServer from '../support/stream/StreamServer';

let streamCompiler = new StreamCompiler(),
    streamServer = new StreamServer(),
    
    compilerOpts = {
        sourceMaps: true,
        lowResSourceMaps: true
    };

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

    gulp.src([
        paths.jspm.fontAwesome('fonts/*'),
        paths.jspm.twitterBootstrap('fonts/*'),
        paths.src('**/*')
    ])
    .pipe(streamCompiler.compile(compilerOpts))
    .pipe(streamServer.listen(EXPRESS_PORT, LIVERELOAD_PORT)
        .on('StreamServer.listening', () => {
            done();
        })
    )
    .pipe(open({
        uri: `http://localhost:${EXPRESS_PORT}`,
        app: BROWSER
    }));

});

gulp.task('preview:watch', (done) => {

    gulp.src([
        paths.jspm.fontAwesome('fonts/*'),
        paths.jspm.twitterBootstrap('fonts/*'),
        paths.src('**/*')
    ])
    .pipe(streamCompiler.compile(compilerOpts))
    .pipe(streamServer.update())
    .pipe(livereload({quiet: true}))
    .on('end', () => {
        done();
    });

});

gulp.task('preview:dist', ['dist'], (done) => {

    gulp.src([
        paths.dist('**/*')
    ])
    .pipe(streamServer.listen(EXPRESS_PORT)
        .on('StreamServer.listening', () => {
            done();
        })
    )
    .pipe(open({
        uri: `http://localhost:${EXPRESS_PORT}`,
        app: BROWSER
    }));

});
