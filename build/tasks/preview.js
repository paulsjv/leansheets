let gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),

    project = require('../project.conf'),
    paths = project.paths,
    EXPRESS_PORT = project.EXPRESS_PORT,
    LIVERELOAD_PORT = project.LIVERELOAD_PORT,
    BROWSER = project.BROWSER,

    StreamCompiler = require('../support/stream/StreamCompiler'),
    StreamServer = require('../support/stream/StreamServer'),

    streamCompiler = new StreamCompiler(),
    streamServer = new StreamServer(),

    compilerOpts = {
        sourceMaps: 'inline',
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
    .pipe(streamServer.listen(EXPRESS_PORT, LIVERELOAD_PORT))
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
    .pipe(streamServer.listen(EXPRESS_PORT))
    .pipe(open({
        uri: `http://localhost:${EXPRESS_PORT}`,
        app: BROWSER
    }));

});
