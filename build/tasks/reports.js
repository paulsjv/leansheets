let gulp = require('gulp'),
    plato = require('plato'),

    FileUtil = require('../support/util/FileUtil'),
    paths = require('../project.conf').paths;

gulp.task('reports', ['test:unit', 'reports:complexity']);

gulp.task('reports:complexity', ['clean:reports'], (done) => {

    let jshintrc = FileUtil.readJSON('.jshintrc', true),
        options = {
            jshint: {
                options: jshintrc,
                globals: jshintrc.globals
            }
        };

    delete options.jshint.options.globals;

    plato.inspect([
        paths.src.js('**/*.js'),
        paths.spec.unit('**/*.js')
    ], paths.reports.complexity(), options, () => {});

    done();

});
