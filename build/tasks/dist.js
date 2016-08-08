let gulp = require('gulp'),
    StreamCompiler = require('../support/stream/StreamCompiler'),
    paths = require('../project.conf').paths;

gulp.task('dist', ['clean:dist', 'test', 'reports'], () => {

    return gulp.src([
        paths.jspm.fontAwesome('fonts/*'),
        paths.jspm.twitterBootstrap('fonts/*'),
        paths.src('**/*')
    ])
    .pipe(new StreamCompiler().compile({
        minify: true,
        sourceMaps: false
    }))
    .pipe(gulp.dest(paths.dist()));

});
