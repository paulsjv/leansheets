import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('build/tasks');

gulp.task('default', ['test', 'reports', 'preview']);

gulp.task('dist', ['test', 'reports', 'assets', 'bundle', 'replace', 'revision'], (done) => {
    done();
});
