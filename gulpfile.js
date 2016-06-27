var connect = require('gulp-connect'), // 本地服务器
    gulp = require('gulp'),
    less = require('gulp-less'),
    webpack = require('webpack'),
    react = require('gulp-react'),
    path = require('path');
// 注册任务
gulp.task('webserver', function () {
    connect.server({
        root: './',
        livereload: true
    });
});
// 监听任务
gulp.task('watch', function () {
    gulp.watch('./views/*.html', ['reload'])
    gulp.watch('./public/stylesheets/*.css', ['reload'])
    gulp.watch('./public/scripts/*.js', ['reload', 'react', 'webpack'])
});

gulp.task('reload', function () {
    gulp.src('./public')
        .pipe(connect.reload());
    gulp.src('./view')
        .pipe(connect.reload());
});
gulp.task('react', function () {
    return
    gulp.src('./public/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./public/dist'));
});
gulp.task('less', function () {
    return
    gulp.src('./public/stylesheets/*.less')
    .pipe(less({
        path: './public/stylesheets/'
    }))
    .pipe(gulp.dest('./public/stylesheets/dist'))
});
//webpack打包js
gulp.task('webpack', function () {
    var config = {
        entry: "./public/script/index-script.js",
        output: {
            path: "./public/script/dist",
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
gulp.task('default', ['webserver', 'webpack', 'watch']);