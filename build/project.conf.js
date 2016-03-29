import PathCalculator from './support/path/PathCalculator';
import readJSON from './support/util/readJSON';

let pkg = readJSON('package.json');

export const EXPRESS_PORT = 3000;
export const LIVERELOAD_PORT = 35729;

export const APP_NAME = pkg.name;

export const entryPoint = { // bundle entry point filenames.
    js: 'modules/main/main.js',
    sass: 'main.scss'
};

export const paths = new PathCalculator({

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
