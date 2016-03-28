import upath from 'upath';
import through2 from 'through2';
import express from 'express';
import livereloadMiddleware from 'connect-livereload';

import mime from 'mime-types';

export default class StreamServer {

    constructor() {
        this.cache = {};
        this.app = express();
    }

    listen(port, liveReloadPort) {

        let that = this;

        return through2.obj(function (file, enc, flush) {
            this.push(file);
            that.cache[`/${upath.toUnix(file.relative)}`] = file.contents;
            flush();
        }, function (flush) {

            if (!that.server) {

                if (liveReloadPort) {
                    that.app.use(livereloadMiddleware({port: liveReloadPort}));
                }

                that.app.use(function (req, res, next) {

                    if (that.cache[req.path]) {

                        res.set('Content-Type', mime.lookup(req.path));
                        res.send(that.cache[req.path]);

                    } else if (that.cache[req.path + 'index.html']) {

                        res.set('Content-Type', mime.lookup(req.path + 'index.html'));
                        res.send(that.cache[req.path + 'index.html']);

                    }

                    next();

                });

                that.server = that.app.listen(port);

            }

            flush();

        });

    }

    update() {

        var that = this;

        that.cache = {};

        return through2.obj(function (file, enc, flush) {
            this.push(file);
            that.cache[`/${upath.toUnix(file.relative)}`] = file.contents;
            flush();
        });

    }

}
