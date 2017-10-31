var gulp = require('gulp');
var Proxy = require('gulp-connect-proxy');
var connect = require('gulp-connect');

gulp.task('js', function () {
    gulp.src('*/*.js')
        .pipe(connect.reload())
});

gulp.task('html', function () {
    gulp.src('*/*.html')
        .pipe(connect.reload())
});

gulp.task('css', function () {
    gulp.src('*/*.css')
        .pipe(connect.reload())
});

gulp.task("server", function () {
    connect.server({
        root: "./",
        port: 8000,
        livereload: true,
        middleware: function (connect, opt) {
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    });
});

//定义看守任务
gulp.task('watch', function () {

    gulp.watch('*/*.html', ['html']);

    gulp.watch('*/*.js', ['js']);
    
    gulp.watch('*/*.css', ['css']);

});

gulp.task('default', ['js', 'html','css','watch','server']);