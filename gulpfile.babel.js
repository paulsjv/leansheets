import gulp from 'gulp';
import requireDir from 'require-dir';
import StreamCompiler from './build/support/stream/StreamCompiler';

import {paths} from './build/project.conf';

requireDir('build/tasks');

gulp.task('default', ['test', 'reports', 'preview']);

gulp.task('dist', ['test', 'reports'], () => {

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
