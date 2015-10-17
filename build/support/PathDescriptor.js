import _ from 'underscore';

// NAME for API Debugging
const NAME = Symbol();

function createPathAPI (descriptor) {

        // concats a folder root with a subdir path, ignoring falsey subdir path values entirely.
    let concat = (root, path) => (path ? (root + path) : root),

        // concats root with given path.
        rootFn = (path, debug) => {

            let result = concat(descriptor.root, path);

            if (debug) {
                console.log(result);
            }

            return result;

        },

        // holds static functions for folders
        staticFns = {};

    // assign NAME Symbol for debug purposes.
    rootFn[NAME] = descriptor.name;

    // for each folder
    Object.keys(descriptor.folders).forEach(function (folder) {

        // assign entry in staticFns that concats root with folder and path
        staticFns[folder] = function (path, debug) {

            let result = concat(descriptor.root, concat(descriptor.folders[folder], path));

            if (debug) {
                console.log(result);
            }

            return result;
        };

    });

    // Assign staticFns to rootFn.
    _.extend(rootFn, staticFns);

    return rootFn;

}

// PathDescriptor
// --------------
// Describes a path configuration for PathCalculator. Has a name, root, and folders.
export default class PathDescriptor {

    constructor (name, descriptor = {}) {

        this.name = name;
        this.root = descriptor.root;
        this.folders = descriptor.folders || {};

        // assures that root ends with a slash (/)
        if (this.root.lastIndexOf('/') !== this.root.length - 1) {
            this.root += '/';
        }

        this.api = createPathAPI(this);

    }

    // Logs debug info for the API
    static debug (api) {

        // Grab the API name
        let name = api[NAME];

        console.log(name + '("path") => ' + api("path"));

        // For each API
        Object.keys(api).forEach(function (key) {
            // Log it
            console.log(name + '.' + key + '("path") => ' + api[key]("path"));
        });

    }

}
