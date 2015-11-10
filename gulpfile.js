var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

gulp.task('default', function(){
	gulp.watch('js/app/**/*.js', ['js_app']);
	gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('js_app', function(){
	
	return gulp.src('js/app/**/*.js')
		.pipe(concat("app.js"))
		.pipe(gulp.dest('js/dist/'));
		
});

gulp.task('sass', function(){
	return gulp.src('sass/**/*.scss')
			.pipe(sass({
				indentedSyntax : false
			}))
			.pipe(gulp.dest('css/'))
});