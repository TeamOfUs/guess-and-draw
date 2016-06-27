var connect = require('gulp-connect'), // 本地服务器
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    webpack = require('webpack');

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
    gulp.watch('./public/scripts/*.js', ['reload']) // 监听根目录下所有.html文件
});

gulp.task('reload', function () {
    gulp.src('./public')
        .pipe(connect.reload());
    gulp.src('./view')
        .pipe(connect.reload());
});

//node任务的自动化
gulp.task('start', function () {
    nodemon({
            script: './server.js',
            watch: ['./public/script/', './public/stylesheet/', './views'],
            ext: 'html css js',
            ignore: ['/public/script/main.js'],
            env: {
                'NODE_ENV': 'development'
            }
        })
        .on('restart', 'webpack')
});

//webpack打包js
gulp.task('webpack', function () {
    var config = {
        entry: "./public/script/script.js",
        output: {
            path: "./public/script",
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

gulp.task('node-dev', function () {
    console.log('node devlop');
});
// 默认任务
 gulp.task('default',['webserver','watch']);  //开发前端页面时候的task
//gulp.task('default', ['node-dev', 'webpack', 'start']); //开发node时候的task