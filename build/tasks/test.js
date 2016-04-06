import gulp from 'gulp';
import karma from 'karma';
import isparta from 'isparta';
import express from 'express';

import childProcess from 'child_process';

import {paths} from '../project.conf';

let spawn = childProcess.spawn;

gulp.task('test', ['test:unit']);
gulp.task('test:debug', ['test:unit:debug']);

gulp.task('test:unit', ['jshint'], (done) => {

    let preProcessors = {},
        instrumenter = {};

    preProcessors[paths.src.js('**/*.js')] = ['babel', 'coverage'];
    preProcessors[paths.spec.unit('**/*.js')] = ['babel', 'sourcemap'];
    preProcessors[paths.spec.mocks('**/*.js')] = ['babel', 'sourcemap'];

    instrumenter[paths.src.js('**/*.js')] = 'isparta';
    instrumenter[paths.spec.unit('**/*.js')] = 'isparta';
    instrumenter[paths.spec.mocks('**/*.js')] = 'isparta';

    new karma.Server({

        configFile: paths.build('karma.conf.js'),

        singleRun: true,

        browsers: ['PhantomJS'],
        reporters: ['coverage', 'progress'],

        preprocessors: preProcessors,

        coverageReporter: {

            instrumenters: {
                isparta: isparta
            },

            instrumenter: instrumenter,

            reporters: [

                {
                    type: 'text',
                    dir: paths.reports.coverage(),
                    subdir: './'
                },
                {
                    type: 'html',
                    dir: paths.reports.coverage(),
                    subdir: './'
                }

            ]

        }

    }, done).start();

});

gulp.task('test:unit:debug', ['jshint'], () => {

    let preProcessors = {};

    preProcessors[paths.src.js('**/*.js')] = ['babel', 'sourcemap'];
    preProcessors[paths.spec.unit('**/*.js')] = ['babel', 'sourcemap'];

    new karma.Server({

        configFile: paths.build('karma.conf.js'),

        browsers: ['Chrome'],
        reporters: ['progress', 'html'],

        preprocessors: preProcessors

    }).start();

});

gulp.task('test:functional', ['dist'], (done) => {

    new Promise((resolve) => { // Download/Update webdriver

        spawn('node', [paths.nodeModules('.bin/webdriver-manager'), 'update', '--standalone'], {
            stdio: 'inherit'
        }).on('exit', resolve);

    }).then(() => { // start express using dist

        return new Promise((resolve) => {

            let app = express();
            app.use(express.static(paths.dist()));

            resolve(app.listen(3000));

        });

    }).then((server) => { // execute protractor

        return new Promise((resolve) => {

            spawn('node', [paths.nodeModules('.bin/protractor'), paths.build('protractor.conf.js')], {
                stdio: 'inherit'
            }).on('exit', (code) => {
                server.close();
                resolve(code);
            });

        });

    }).then((exitCode) => { // handle exit

        if (exitCode) {
            throw new Error("Functional Tests Failed");
        } else {
            done();
        }

    });

});
