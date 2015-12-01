import _ from 'lodash';
import path from 'path';
import through2 from 'through2';
import stream from 'readable-stream';

import manifold from 'gulp-manifold';
import webp from 'gulp-webp';
import jspm from 'gulp-jspm';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import RevAll from 'gulp-rev-all';

import StreamReplacer from './StreamReplacer';

import {paths, APP_NAME, entryPoint} from '../../project.conf.js';

let posix = path.posix,

    revAll = new RevAll({
        dontRenameFile: [/^\/index\.html$/, /^\/favicon.ico$/],
        replacer: (fragment, replaceRegExp, newReference) => {
            fragment.contents = fragment.contents.replace(replaceRegExp, '$1' + encodeURI((newReference)) + '$3$4');
        }
    });

export default class StreamCompiler {

    /**
     * Creates a new Stream Compiler with sensible defaults.
     *
     * @param assetTypes Multiple asset types configured by arbitrary key names, valued by an Object containing a filter and
     * a stream handler.
     * @param preCompileHandler a stream handler executed on the unfiltered stream, prior to asset compilation.
     * @param postCompileHandler a stream handler executed on the unfiltered resulting stream, post asset compilation.
     *
     * @constructor
     */
    constructor(assetTypes = {}, preCompileHandler, postCompileHandler) {

        var replacer;

        this.assetTypes = _.defaultsDeep(assetTypes, {

            fonts: {

                filter: [
                    paths.jspm.fontAwesome('fonts/*'),
                    paths.jspm.twitterBootstrap('fonts/*')
                ],

                // through2.obj NOT arrow. (lexical this)
                handler: (opts) => (stream) => stream.pipe(through2.obj(function (file, enc, flush) {

                    file.base = path.join(file.cwd, paths.src());
                    file.path = path.join(file.cwd, paths.src.fonts(), path.basename(file.path));

                    this.push(file);

                    flush();

                }))

            },

            images: {

                filter: paths.src.img('**/*.{png,jpeg,jpg,tiff,webp}'),

                handler: (opts) => (stream) => stream.pipe(webp())

            },

            scripts: {

                filter: paths.src.js(entryPoint.js),

                handler: (opts) => (stream) => stream.pipe(jspm.buildStatic(`js/${APP_NAME}.js`, opts))

            },

            styles: {

                filter: paths.src.sass(entryPoint.sass),

                handler: (opts) => (stream) => {

                    var resultStream = stream;

                    if (opts.sourceMaps) {
                        resultStream = resultStream.pipe(sourcemaps.init())
                    }

                    if (opts.minify) {

                        resultStream = resultStream.pipe(sass({
                            outputStyle: 'compressed'
                        }).on('error', sass.logError));

                    } else {
                        resultStream = resultStream.pipe(sass().on('error', sass.logError));
                    }

                    resultStream = resultStream.pipe(rename((filePath) => {
                        filePath.dirname = 'css';
                        filePath.basename = APP_NAME;
                    }));

                    if (opts.sourceMaps) {

                        resultStream = resultStream.pipe(sourcemaps.write('.', {
                            defaultSourceRoot: '/source/sass/'
                        }));

                    }

                    return resultStream;

                }

            },

            html: {

                filter: paths.src.html('**/*.html'),

                handler: (opts) => (stream) => stream

            }

        });

        this.preCompileHandler = preCompileHandler || ((opts) => {

            replacer = new StreamReplacer();

            return (stream) => {

                return stream
                    .pipe(manifold([

                        // replace references to js/sass entry points with their bundled names
                        manifold.duct(

                            [
                                paths.src.js(entryPoint.js),
                                paths.src.sass(entryPoint.sass)
                            ],

                            (stream) => stream.pipe(replacer.push((file) => {

                                var dir = posix.dirname(posix.relative(paths.src(), file.path)),
                                    ext = posix.extname(file.path);

                                return posix.join((dir == 'sass' ? 'css' : dir), APP_NAME + (ext === '.scss' ? '.css' : `${ext}`));

                            }))

                        ),

                        // replace references to images to use .webp extension
                        manifold.duct(

                            paths.src.img('**/*.{png,jpeg,jpg,tiff}'),

                            (stream) => stream.pipe(replacer.push((file) => {

                                var dir = posix.dirname(posix.relative(paths.src(), file.path)),
                                    ext = posix.extname(file.path),
                                    name = posix.basename(file.path, ext);

                                // replace references to current file with $dir/$name.webp
                                return posix.join(dir, name + '.webp')

                            }))

                        )

                    ]));

            };

        });

        this.postCompileHandler = postCompileHandler || ((opts) => {

            return (stream) => {

                return stream
                    .pipe(manifold([

                        manifold.duct(

                            [
                                paths.src.html('**/*.html'),
                                paths.src.css('**/*.css'),
                                paths.src.js('**/*.js')
                            ],

                            (stream) => stream.pipe(replacer.replace())

                        )

                    ]))
                    .pipe(revAll.revision());

            };

        });

    };

    /**
     * Helper for working with streams.
     *
     * @param handler stream handler
     *
     * @returns {through2}
     * @private
     */
    _withStream(handler) {

        var files = [],
            handlerStream = new stream.Readable({

                objectMode: true,

                read: function () { // NOT arrow function (lexical this)

                    files.forEach((file) => {
                        this.push(file);
                    });

                    this.push(null); // signal end of stream.

                }

            });

        return through2.obj((file, enc, flush) => {
            files.push(file);
            flush();
        }, function (flushStream) { // NOT arrow function (lexical this)

            handler(handlerStream)
                .pipe(through2.obj((file, enc, flush) => {
                        this.push(file);
                        flush();
                    }, (flush) => {
                        flushStream();
                        flush();
                    }
                ));

        });

    };

    _preCompile(opts) {
        return this._withStream((stream) => this.preCompileHandler(opts)(stream));
    };

    _compile(opts) {

        return this._withStream((stream) => {

            return stream.pipe(manifold(
                _.map(this.assetTypes, (assetType) => manifold.duct(assetType.filter, assetType.handler(opts))),
                (bypass) => bypass.pipe(manifold.exhaust()) // ignore unfiltered items (js source, sass, etc).
            ));

        });

    };

    _postCompile(opts) {
        return this._withStream((stream) => this.postCompileHandler(opts)(stream));
    };

    /**
     * Compile the stream assets according to configuration specified in constructor.
     *
     * @param opts Compile opts, ex: {minify: true, sourceMaps: true}
     *
     * @returns {through2}
     */
    compile(opts) {

        return this._withStream((stream) => {

            return stream
                .pipe(this._preCompile(opts))
                .pipe(this._compile(opts))
                .pipe(this._postCompile(opts));

        });

    };

}
