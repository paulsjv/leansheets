import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('build/tasks');

gulp.task('default', ['test', 'reports', 'preview']);
