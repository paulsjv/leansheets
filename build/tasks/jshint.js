import gulp from 'gulp';
import jshint from 'gulp-jshint';

import {paths} from '../project.conf';

gulp.task('jshint', () => {

    gulp.src([
        paths.src.js('**/*.js'),
        paths.spec.unit('**/*.js')
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

    return true;
});
