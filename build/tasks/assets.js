import gulp from 'gulp';
import webp from 'gulp-webp';
import merge from 'merge-stream';

import {paths} from '../project.conf';

gulp.task('assets', ['clean:work'], () => {

        // copy fonts to work dir
    let fonts = gulp.src([
            paths.jspm.fontAwesome('fonts/*'),
            paths.jspm.twitterBootstrap('fonts/*')
        ])
        .pipe(gulp.dest(paths.work.fonts())),

        // encode images as webp, then copy to work dir
        // Note: since img files are renamed with a .webp extension, we'll have to update references.
        // This is handled by the replace task.
        img = gulp.src([
            paths.src.img('**/*.{png,jpeg,jpg,tiff,webp}')
        ])
        .pipe(webp())
        .pipe(gulp.dest(paths.work.img())),

        // copy html to work dir
        html = gulp.src([
            paths.src.html('**/*.html')
        ])
        .pipe(gulp.dest(paths.work.html()));


    return merge(fonts, img, html);

});

gulp.task('assets:dev', ['assets']);
