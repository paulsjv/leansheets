import gulp from 'gulp';
import plato from 'plato';

import readJSON from '../support/util/readJSON';
import {paths} from '../project.conf';

gulp.task('reports', ['test:unit', 'reports:complexity']);

gulp.task('reports:complexity', ['clean:reports'], (done) => {

    let jshintrc = readJSON('.jshintrc', true),
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
