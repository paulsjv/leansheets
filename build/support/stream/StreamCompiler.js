let _ = require('lodash'),
    path = require('path'),
    upath = require('upath'),
    through2 = require('through2'),
    stream = require('readable-stream'),

    manifold = require('gulp-manifold'),
    webp = require('gulp-webp'),
    jspm = require('gulp-jspm'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    RevAll = require('gulp-rev-all'),
    uglify = require('gulp-uglify'),
    sourceMaps = require('gulp-sourcemaps'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),

    StreamReplacer = require('./StreamReplacer'),
    SourceMapUtil = require('../util/SourceMapUtil'),

    project = require('../../project.conf'),
    paths = project.paths,
    APP_NAME = project.APP_NAME,
    TEMPLATES_MODULE_NAME = project.TEMPLATES_MODULE_NAME,
    entryPoint = project.entryPoint;

let revAll = new RevAll({
        dontRenameFile: [/^\/index\.html$/, /^\/sink\.html$/, /^\/favicon.ico$/],
        replacer: (fragment, replaceRegExp, newReference) => {
            fragment.contents = fragment.contents.replace(replaceRegExp, '$1' + encodeURI((newReference)) + '$3$4');
        }
    });

module.exports = class StreamCompiler {

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

        let replacer;

        this.assetTypes = _.defaultsDeep(assetTypes, {

            fonts: {

                filter: [
                    paths.jspm.fontAwesome('fonts/*'),
                    paths.jspm.twitterBootstrap('fonts/*'),
                    paths.src.fonts('**/*')
                ],

                handler: (opts) => (stream) => stream.pipe(manifold([

                    manifold.duct(

                        [
                            paths.jspm.fontAwesome('fonts/*'),
                            paths.jspm.twitterBootstrap('fonts/*')
                        ],

                        // through2.obj NOT arrow. (lexical this)
                        (stream) => stream.pipe(through2.obj(function (file, enc, flush) {

                            file.base = upath.join(file.cwd, paths.src());
                            file.path = upath.join(file.cwd, paths.src.fonts(), upath.basename(file.path));

                            this.push(file);

                            flush();

                        }))

                    )

                ]))

            },

            images: {

                filter: paths.src.img('**/*'),
                handler: (opts) => (stream) => stream.pipe(manifold([

                    manifold.duct(
                        paths.src.img('**/*.{png,jpeg,jpg,tiff}'),
                        (stream) => stream.pipe(webp())
                    )

                ]))

            },

            scripts: {

                filter: [
                    paths.src.js('**/*.js'),
                    paths.src.templates('**/*.html'),
                    `!${paths.src.js('modules/templates')}`, // excludes templates dir itself
                    `!${paths.src.js('modules/templates/**/*.js')}` // excludes templates dir contents
                ],

                handler: (opts) => (stream) => {

                    // special handling for minify: true since ngAnnotate requires unminified babel output from jspm.
                    let jspmOpts = _.extend({}, opts);
                    delete jspmOpts.minify;

                    let resultStream = stream
                        .pipe(manifold([

                            manifold.duct(

                                paths.src.templates('**/*.html'),

                                (stream) => {

                                    return stream
                                        .pipe(htmlmin({
                                            removeComments: true,
                                            collapseWhitespace: true
                                        }))
                                        .pipe(angularTemplateCache({
                                            moduleSystem: 'ES6',
                                            filename: path.relative(paths.src(), paths.src.js('modules/templates/templates.js')),
                                            module: TEMPLATES_MODULE_NAME,
                                            standalone: true
                                        }));

                                }

                            )

                        ]))
                        .pipe(jspm.buildStatic(paths.src.js(entryPoint.js), `js/${APP_NAME}.js`, jspmOpts));

                    if (opts.sourceMaps) {

                        resultStream = resultStream
                            .pipe(sourceMaps.init({ loadMaps: true }))
                            .pipe(ngAnnotate())
                            // remove the bundle from the sourcemap (improves browser debugger)
                            .pipe(SourceMapUtil.streamRemoveSource(new RegExp(APP_NAME)))
                            .pipe(sourceMaps.write('.', {
                                mapSources: (sourcePath) => {
                                    if (!new RegExp(paths.jspm()).test(sourcePath)) {
                                        return upath.relative(paths.src.js(), sourcePath);
                                    } else {
                                        return upath.relative(paths.src(), sourcePath);
                                    }
                                }
                            }));

                    } else {
                        resultStream = resultStream.pipe(ngAnnotate());
                    }

                    if (opts.minify) {
                        resultStream = resultStream.pipe(uglify());
                    }

                    return resultStream;

                }

            },

            styles: {

                filter: paths.src.sass(entryPoint.sass),

                handler: (opts) => (stream) => {

                    let sassOpts = {
                        precision: 10 // for bootstrap
                    };

                    if (opts.minify) {
                        sassOpts.outputStyle = 'compressed';
                    }

                    return stream
                        .pipe(sass(sassOpts).on('error', sass.logError))
                        .pipe(rename((filePath) => {
                            filePath.dirname = 'css';
                            filePath.basename = APP_NAME;
                        }));

                }

            },

            html: {

                filter: [
                    paths.src.html('**/*.html'),
                    `!${paths.src.templates()}`, // excludes templates dir itself
                    `!${paths.src.templates('**')}` // excludes templates dir contents
                ],

                handler: (opts) => (stream) => {

                    return stream
                        .pipe(htmlmin({
                            removeComments: true,
                            collapseWhitespace: true
                        }));

                }

            },

            json: {

                filter: paths.src.json('**/*.json'),

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

                            (stream) => {

                                return stream.pipe(replacer.push((file) => {

                                    let dir = upath.dirname(upath.relative(paths.src(), file.path)).split('/')[0],
                                        ext = upath.extname(file.path);

                                    return upath.join((dir == 'sass' ? 'css' : dir), APP_NAME + (ext === '.scss' ? '.css' : `${ext}`));

                                }));

                            }

                        ),

                        // replace references to images to use .webp extension
                        manifold.duct(

                            paths.src.img('**/*.{png,jpeg,jpg,tiff}'),

                            (stream) => stream.pipe(replacer.push((file) => {

                                let dir = upath.dirname(upath.relative(paths.src(), file.path)),
                                    ext = upath.extname(file.path),
                                    name = upath.basename(file.path, ext);

                                // replace references to current file with $dir/$name.webp
                                return upath.join(dir, name + '.webp')

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

        let files = [],
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
                _.map(this.assetTypes, (assetType) => manifold.duct(assetType.filter, assetType.handler(opts))), // [ manifold.duct(filter, handler), ... ]
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

};
