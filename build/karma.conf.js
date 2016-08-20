let paths = require('./project.conf').paths;

module.exports = (karma) => {

    karma.set({

        basePath: '../',
        frameworks: ['jspm', 'jasmine'],

        port: 9876,
        colors: true,
        logLevel: karma.LOG_ERROR, // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG

        files: [
            paths.nodeModules('babel-core/browser-polyfill.js')
        ],

        jspm: {

            loadFiles: [
                paths.spec.unit('**/*.js'),
                paths.spec.mocks('**/*.js')
            ],

            serveFiles: [
                paths.src.js('**/*.js')
            ]

        },

        babelPreprocessor: {

            options: {
                sourceMap: 'inline',
                blacklist: ['useStrict']
            },

            sourceFileName: (file) => {
                return file.originalPath;
            }

        }

    });

};
