let gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    paths = require('../project.conf').paths;

gulp.task('jshint', () => {

    return gulp.src([
        paths.src.js('**/*.js'),
        paths.spec.unit('**/*.js')
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

});
