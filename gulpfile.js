const gulp = require('gulp');
const clean = require('gulp-clean');
const hb = require('gulp-hb');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');

// ------------------------------ CLEAN ------------------------------
gulp.task('clean:handlebars', function() {
  return gulp.src('docs/**/*.html', {read: false})
    .pipe(clean());
});
gulp.task('clean:sass', function() {
  return gulp.src('docs/css/**/*', {read: false})
    .pipe(clean());
});
gulp.task('clean:images', function() {
  return gulp.src('docs/images/**/*', {read: false})
    .pipe(clean());
});

// ------------------------------ BUILD ------------------------------
gulp.task('handlebars', ['clean:handlebars'], function() {
  return gulp
    .src('src/*.html')
    .pipe(hb({
      partials: 'src/partials/**/*.hbs',
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest('docs'));
});

gulp.task('sass', ['clean:sass'], function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('images', ['clean:images'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('docs/images'));
});

// ------------------------------ WATCH ------------------------------
gulp.task('handlebars:watch', ['handlebars'], function () {
  gulp.watch(['src/*.html', 'src/partials/**/*.hbs'], ['handlebars']);
});
gulp.task('sass:watch', ['sass'], function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
});
gulp.task('images:watch', ['images'], function () {
  gulp.watch('src/images/**/*', ['images']);
});

// ------------------------------ TASKS ------------------------------
gulp.task('build', ['handlebars', 'sass', 'images']);
gulp.task('watch', ['handlebars:watch', 'sass:watch', 'images:watch']);
gulp.task('default', ['watch']);
