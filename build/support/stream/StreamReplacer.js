import path from 'path';
import through2 from 'through2';

import manifold from 'gulp-manifold';

import {paths} from '../../project.conf.js';
import regExcape from '../util/regExcape';

let posix = path.posix;

export default class StreamReplacer {

    constructor(replacements = {}) {
        this.replacements = replacements;
    }

    /**
     * Add a transform to the replacer. A transform is a function that takes a vinyl file from the stream as a
     * parameter and returns the path to be used as a replacement for that file.
     *
     * This function is called for each file present in the stream.
     *
     * @param transformFn(file)
     *
     * @returns {through2}
     */
    push(transformFn) {

        let that = this;

        return through2.obj(function (file, enc, flush) {

            let dir = posix.dirname(posix.relative(paths.src(), file.path)),
                ext = posix.extname(file.path),
                name = posix.basename(file.path, ext);

            that.replacements[transformFn(file)] =
                new RegExp(regExcape(posix.join(dir, name + ext)).replace(/ /g, '(?: |%20)'), 'g');

            this.push(file);

            flush();

        });

    }

    /**
     * Search and replace all files in the stream with values according to the transforms configured via `push()`.
     *
     * @returns {through2}
     */
    replace() {

        let that = this;

        return through2.obj(function (file, enc, flush) {

            Object.keys(that.replacements).forEach((replacement) => {
                file.contents = new Buffer(String(file.contents).replace(that.replacements[replacement], replacement));
            });

            this.push(file);
            flush();

        });

    }

}
