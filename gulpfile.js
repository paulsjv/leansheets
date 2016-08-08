let gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('build/tasks');

gulp.task('default', ['test:unit', 'preview']);
