import gulp from 'gulp';
import StreamCompiler from '../support/stream/StreamCompiler';
import {paths} from '../project.conf';

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
