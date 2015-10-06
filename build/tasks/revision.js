import gulp from 'gulp';
import RevAll from 'gulp-rev-all';

import {paths} from '../project.conf';

gulp.task('revision', ['clean:dist', 'replace'], () => {

    let revAll = new RevAll({
        dontRenameFile: [/^\/index\.html$/, /^\/favicon.ico$/],
        replacer: (fragment, replaceRegExp, newReference) => {
            fragment.contents =
                fragment.contents.replace(replaceRegExp, '$1' + encodeURI((newReference)) + '$3$4');
        }
    });

    return gulp.src([paths.work('**/*')])
        .pipe(revAll.revision())
        .pipe(gulp.dest(paths.dist()));

});
