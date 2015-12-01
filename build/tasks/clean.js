import gulp from 'gulp';
import del from 'del';

import {paths} from '../project.conf';

gulp.task('clean', ['clean:reports', 'clean:dist'], (done) => {
    done();
});

gulp.task('clean:reports', (done) => {

    // only cleans coverage report because complexity report contains historical data
    del([
        paths.reports.coverage()
    ]).then(() => {
        done();
    });

});

gulp.task('clean:dist', (done) => {

    del([
        paths.dist()
    ]).then(() => {
        done();
    });

});
