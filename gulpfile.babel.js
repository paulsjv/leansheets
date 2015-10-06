import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('build/tasks');

gulp.task('default', ['test', 'reports', 'preview']);

gulp.task('work', ['test', 'reports', 'assets:dev', 'bundle:dev', 'replace:dev']);
gulp.task('dist', ['test', 'reports', 'assets', 'bundle', 'replace', 'revision'], (done) => {
    done();
    process.exit(0); // prevents task from occasionally hanging for ~60s
});
