import path from 'path';
import through2 from 'through2';

import { SourceMapConsumer, SourceMapGenerator} from 'source-map';

export default class SourceMapUtil {

    static removeSource(sourceMap, source) {

        let consumer = new SourceMapConsumer(sourceMap),
            generator = new SourceMapGenerator({
                file: sourceMap.file,
                sourceRoot: sourceMap.sourceRoot
            });

        consumer.eachMapping((mapping) => {

            if (mapping.source !== source) {

                generator.addMapping({
                    name: mapping.name,
                    source: mapping.source,
                    original: {
                        line: mapping.originalLine,
                        column: mapping.originalColumn
                    },
                    generated: {
                        line: mapping.generatedLine,
                        column: mapping.generatedColumn
                    }
                });

                if (consumer.hasContentsOfAllSources()) {
                    generator.setSourceContent(mapping.source, consumer.sourceContentFor(mapping.source));
                }

            }

        });

        return generator.toJSON();

    }

    static streamRemoveSource(source) {

        let sourceRegex = new RegExp(source);

        return through2.obj(function (file, enc, flush) {

            let isMapFile = path.extname(file.path) === '.map',
                sourceMap;

            if (isMapFile) {
                sourceMap = JSON.parse(file.contents.toString('utf8'))
            } else {
                // support for gulp-sourcemaps
                sourceMap = file.sourceMap;
            }

            if (sourceMap) {

                sourceMap.sources
                    .filter((source) => sourceRegex.test(source))
                    .forEach((source) => {
                        sourceMap = SourceMapUtil.removeSource(sourceMap, source);
                    });

                if (isMapFile) {
                    file.contents = new Buffer(JSON.stringify(sourceMap));
                } else {
                    file.sourceMap = sourceMap;
                }

            }

            this.push(file);
            flush();

        });

    }

}
