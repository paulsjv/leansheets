import _ from 'lodash';
import PathDescriptor from './PathDescriptor';

// PathCalculator
// -------------
// Helper class to provide a handy api for calculating folder paths.
export default class PathCalculator {

    constructor (config = {}) {

        var that = this,
            debug = config.debug,

            // Each descriptor defines a root and subdirs. Each key is the api name, each folder are additional api
            // functions.

            // Example Descriptor: { src: { root: 'www/', folders: { js: 'js/' } } } would result in:
            // src()                => 'www/'
            // src('**/*.html')     => 'www/**/*.html'
            // src.js()             => 'www/js/'
            // src.js('**/*.js')    => 'www/js/**/*.js'
            descriptors = _.defaults(_.omit(config, 'debug'), {

                src: {

                    root: 'www/',
                    folders: {

                        html: '',
                        js: 'js/',
                        sass: 'sass/',
                        img: 'img/',
                        fonts: 'fonts/'

                    }

                }

            });

        // ForEach descriptor
        Object.keys(descriptors).forEach(function (key) {
            // Create a new PathDescriptor and assign the api to this PathCalculator instance.
            that[key] = new PathDescriptor(key, descriptors[key]).api;
        });

        // If debug is enabled
        if (debug) {

            // Debug the API
            Object.keys(descriptors).forEach(function (key) {
                PathDescriptor.debug(that[key]);
            });

        }

    }

}
