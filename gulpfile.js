var connect = require('gulp-connect'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    webpack = require('webpack'),
    babel = require('gulp-babel');

gulp.task('webserver', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch('./views/*.html', ['html-reload'])
    gulp.watch('./public/stylesheets/*.css', ['less','less-reload'])
    gulp.watch('./public/scripts/*.js', ['webpack','js-reload'])
    gulp.watch('./public/scripts/*.jsx',['react','webpack','js-reload'])
});
gulp.task('html-reload', function () {
    gulp.src('./views/*.html')
        .pipe(connect.reload());
});
gulp.task('less-reload', function () {
    gulp.src('./public/stylesheets/dist/*.less')
        .pipe(connect.reload());
});
gulp.task('js-reload', function () {
    gulp.src('./public/scripts/dist/*.js')
        .pipe(connect.reload());
});
gulp.task('react', function () {
    gulp.src('./public/scripts/*.jsx')
        .pipe(babel({
            presets: ['es2015','react']
        }))
        .pipe(gulp.dest('./public/scripts/dist/'))
});
gulp.task('less', function () {
    return
    gulp.src('./public/stylesheets/*.less')
    .pipe(less({
        path: './public/stylesheets/'
    }))
    .pipe(gulp.dest('./public/stylesheets/dist'))
});
gulp.task('webpack', function () {
    var config = {
        entry: "./public/scripts/index-script.js",
        output: {
            path: "./public/scripts/dist",
            filename: "main.js"
        }
    };
    webpack(config, function (err, stats) {
        if (!err) {
            console.log("everything good");
        } else {
            console.log(err);
        }
    });
});
gulp.task('default', ['less','react','webpack','watch','webserver']);