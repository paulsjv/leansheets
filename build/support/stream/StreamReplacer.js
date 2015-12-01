import path from 'path';
import through2 from 'through2';

import manifold from 'gulp-manifold';

import {paths} from '../../project.conf.js';
import regExcape from '../util/regExcape';

let posix = path.posix;

export default class Replacer {

    constructor(replacements = {}) {
        this.replacements = replacements;
    }

    push(replaceWithFn) {

        var that = this;

        return through2.obj(function (file, enc, flush) {

            var dir = posix.dirname(posix.relative(paths.src(), file.path)),
                ext = posix.extname(file.path),
                name = posix.basename(file.path, ext);

            that.replacements[replaceWithFn(file)] =
                new RegExp(regExcape(posix.join(dir, name + ext)).replace(/ /g, '(?: |%20)'), 'g');

            this.push(file);

            flush();

        });

    }

    replace() {

        var that = this;

        return through2.obj(function (file, enc, flush) {

            Object.keys(that.replacements).forEach((replacement) => {
                file.contents = new Buffer(String(file.contents).replace(that.replacements[replacement], replacement));
            });

            this.push(file);
            flush();

        });

    }

}
