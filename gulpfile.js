var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var cleans = require('gulp-clean');
var minImg = require('gulp-imagemin');
var browerSync = require('browser-sync').create();
var reload = browerSync.reload;


var distDir = './dist';
var distJs = distDir+'/js';
var distCss = distDir+'/css';
var distImages = distDir+'/imgs';
var originDir = './public/';

//sass转css 并且刷新浏览器
gulp.task('sassToCss',function () {
	console.log("do compile scss");
	return gulp.src(originDir+"sass/**/*.scss")
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest(originDir+'/css'))
	.pipe(reload({stream:true}));
});

//js代码压缩
gulp.task('minJs',function () {
	return gulp.src(originDir+'js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest(distJs));
});
//css代码压缩
gulp.task('minCss',function () {
	console.log('执行')
	return gulp.src(originDir+'css/**/*.css')
	.pipe(cleanCss())
	.pipe(gulp.dest(distCss));
});
//图片压缩
gulp.task('minImage',function () {
	return gulp.src(originDir+'imgs/**/*')
	.pipe(minImg())
	.pipe(gulp.dest(distImages));
});
//清除dist文件
gulp.task('cleanDist',function (cb) {
	return gulp.src(distDir)
	.pipe(cleans());

});
//移动html文件到dist目录下
gulp.task('moveHtml',function () {
	return gulp.src(originDir+'/**/*.html')
	.pipe(gulp.dest(distDir));
});
//bulid之后启动node服务，预览效果
gulp.task('buildServer',function () {
	browerSync.init({
		server:originDir
	});
});

//dev启动node服务，并且执行相关任务，并且刷新
gulp.task('server',function () {
	browerSync.init({
		proxy: 'http://localhost:8080',
		notify: false,
		port: 8081
	});
	gulp.watch(originDir+'js/**/*.js').on("change",reload);
	gulp.watch(originDir+'sass/**/*.scss',gulp.series('sassToCss'));
	gulp.watch('views/**/*.html').on("change",reload);
	gulp.watch('views/**/*.html').on("change",function () {
		console.log("修改了")
	});

});
gulp.task('dev',gulp.series(['sassToCss','server']));
gulp.task('build',gulp.series(['cleanDist','sassToCss','minCss','minJs','minImage']));

