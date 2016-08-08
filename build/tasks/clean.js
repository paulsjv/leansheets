let gulp = require('gulp'),
    del = require('del'),
    paths = require('../project.conf').paths;

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
