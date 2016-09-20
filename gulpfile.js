var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var browserSync=require('browser-sync');
var reload=browserSync.reload;
/*1.less编译，压缩，合并没有必要-因为预处理可以导包*/
gulp.task('style', function () {
    gulp.src(['src/css/*.less','!src/css/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
/*2.js合并 压缩 混淆*/
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
gulp.task('scripts', function () {
    gulp.src('src/js/*.js')
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
/*3.img复制*/
gulp.task('images', function () {
    gulp.src('src/img/*.*')
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({
            stream:true
        }))
});
/*4.html压缩*/
var htmlmin=require('gulp-htmlmin');
gulp.task('html', function () {
   gulp.src('src/index.html')
       .pipe(htmlmin({
           collapseWhitespace: true,
           removeComments:true
       }))
       .pipe(gulp.dest('dist/'))
       .pipe(browserSync.reload({
           stream:true
       }))
});
/*5.添加服务器*/

gulp.task('serve', function () {
    browserSync({server: {
        baseDir:['dist']  //改变index的路径
    }}, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/css/*.less',['style']);
    gulp.watch('src/js/*.js',['scripts']);
    gulp.watch('src/img/*.*',['images']);
    gulp.watch('src/index.html',['html']);
});



























