let os = require('os'),
    PathCalculator = require('./support/path/PathCalculator'),
    FileUtil = require('./support/util/FileUtil'),

    pkg = FileUtil.readJSON('package.json');

exports.BROWSER = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? '/Applications/Google\ Chrome.app' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'
    )
);

exports.EXPRESS_PORT = 3000;
exports.LIVERELOAD_PORT = 35729;

exports.APP_NAME = pkg.name;
exports.TEMPLATES_MODULE_NAME = 'ls.templates';

exports.entryPoint = { // bundle entry point filenames.
    js: 'modules/main/main.js',
    sass: 'main.scss'
};

exports.paths = new PathCalculator({

    src: { // source root (relative to project root)

        root: 'www/',
        folders: {

            html: '',
            js: 'js/',
            sass: 'sass/',
            css: 'css/',
            img: 'img/',
            fonts: 'fonts/',
            json: '',
            templates: 'templates/'

        }

    },

    dist: { // dist root (relative to project root)

        root: 'dist/',
        folders: {

            html: '',
            js: 'js/',
            css: 'css/',
            img: 'img/',
            fonts: 'fonts/',
            json: ''

        }

    },

    spec: { // spec root (relative to project root)

        root: 'spec/',
        folders: {

            unit: 'unit/',
            functional: 'functional/',
            mocks: 'mocks/'

        }

    },

    nodeModules: { // node_modules directory (relative to project root)
        root: 'node_modules/'
    },

    jspm: { // jspm_packages directory (relative to project root)

        root: 'jspm_packages/',
        folders: {
            fontAwesome: pkg.jspm.dependencies['font-awesome'].replace(/:/, '/') + '/',
            twitterBootstrap: pkg.jspm.dependencies.bootstrap.replace(/:/, '/') + '/'
        }

    },

    build: { // build root (relative to project root)
        root: __dirname
    },

    reports: { // reports root (relative to project root)

        root: 'build/reports/',
        folders: {
            coverage: 'coverage/',
            complexity: 'complexity/'
        }

    }

});
