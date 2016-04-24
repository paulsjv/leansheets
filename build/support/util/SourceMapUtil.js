import upath from 'upath';
import through2 from 'through2';

import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

export default class SourceMapUtil {

    static removeSource(inMap, sourceToRemove) {

        let consumer = new SourceMapConsumer(inMap),
            generator = new SourceMapGenerator({
                file: inMap.file
            });

        consumer.eachMapping((mapping) => {

            if (mapping.source !== sourceToRemove) {

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

            }

        });

        inMap.sources.forEach((source) => {
            if (source !== sourceToRemove) {
                generator.setSourceContent(source, consumer.sourceContentFor(source));
            }
        });

        return generator.toJSON();

    }

    static streamRemoveSource(sourceRegex) {

        return through2.obj(function (file, enc, flush) {

            let isMapFile = upath.extname(file.path) === '.map',
                isJsFile = upath.extname(file.path) === '.js',
                sourceMap = file.sourceMap;

            if (!sourceMap) {

                if (isMapFile) {
                    sourceMap = JSON.parse(file.contents.toString('utf8'))
                } else if (isJsFile) {

                    let sourceMappingUrlRegex = /\/\/# sourceMappingURL=(.+)$/,
                        sourceMappingUrlMatches = sourceMappingUrlRegex.exec(file.contents.toString('utf8')),
                        sourceMappingUrl = sourceMappingUrlMatches ? sourceMappingUrlMatches[1] : null,

                        dataRegex = /^data:(.+);(.+),(.+)$/,
                        dataMatches = sourceMappingUrl ? dataRegex.exec(sourceMappingUrl) : null,

                        isDataUri = dataMatches && dataMatches.length === 4,

                        contentType = isDataUri ? dataMatches[1] : null,
                        encoding = isDataUri ? dataMatches[2] : null,
                        data = isDataUri ? dataMatches[3] : null;

                    if (isDataUri && contentType === 'application/json') {
                        sourceMap = JSON.parse(new Buffer(data, encoding).toString('utf8'));
                    }

                }

            }

            if (sourceMap) {

                sourceMap.sources
                    .filter((source) => {
                        return sourceRegex.test(source);
                    })
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
