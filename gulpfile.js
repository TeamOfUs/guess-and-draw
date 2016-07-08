var connect = require('gulp-connect'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    webpack = require('webpack');

gulp.task('webserver', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch('./views/*.html', ['html-reload'])
    gulp.watch('./public/stylesheets/*.css', ['less-reload'])
    gulp.watch('./public/scripts/*.js', ['js-reload'])
});
gulp.task('html-reload', function () {
    gulp.src('./views/*.html')
        .pipe(connect.reload());
});
gulp.task('less-reload', ['less'],function () {
    gulp.src('./public/stylesheets/*.css')
        .pipe(connect.reload());
});
gulp.task('js-reload', ['webpack'],function () {
    gulp.src('./public/scripts/dist/*.js')
        .pipe(connect.reload());
});
gulp.task('less', function () {
    return
    gulp.src('./public/stylesheets/*.less')
    .pipe(less({
        path: './public/stylesheets/'
    }))
    .pipe(gulp.dest('./public/stylesheets/dist'));
});
gulp.task('webpack', function (cb) {
    var config = {
        entry: "./public/scripts/client.js",
        output: {
            path: "./public/scripts/dist",
            filename: "game-script.js"
        }
    };
    webpack(config, function (err, stats) {
        if (err) {
            gutil.log(err);
        } else {
            gutil.log(stats.toString());
            cb();
        }
    });
});
gulp.task('default', [ 'webpack', 'watch','webserver']);
