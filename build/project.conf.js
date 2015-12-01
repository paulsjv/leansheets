import PathCalculator from './support/path/PathCalculator';
import readJSON from './support/util/readJSON';

export const EXPRESS_PORT = 3000;
export const LIVERELOAD_PORT = 35729;

export const APP_NAME = readJSON('package.json').name;

export const entryPoint = { // bundle entry point filenames.
    js: 'main.js',
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
            fonts: 'fonts/'

        }

    },

    work: { // work root (relative to project root)

        root: 'target/',
        folders: {

            html: '',
            js: 'js/',
            css: 'css/',
            img: 'img/',
            fonts: 'fonts/'

        }

    },

    dist: { // dist root (relative to project root)

        root: 'dist/',
        folders: {

            html: '',
            js: 'js/',
            css: 'css/',
            img: 'img/',
            fonts: 'fonts/'

        }

    },

    spec: { // spec root (relative to project root)

        root: 'spec/',
        folders: {

            unit: 'unit/',
            functional: 'functional/'

        }

    },

    nodeModules: { // node_modules directory (relative to project root)
        root: 'node_modules/'
    },

    jspm: { // jspm_packages directory (relative to project root)

        root: 'jspm_packages/',
        folders: {

            fontAwesome: 'npm/font-awesome@4.4.0/',
            twitterBootstrap: 'github/twbs/bootstrap@3.3.5/'

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
