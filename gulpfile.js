const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const hb = require('gulp-hb');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create(); // create a browser sync instance.

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
    .src('src/index.hbs')
    .pipe(hb({
      partials: 'src/partials/**/*.hbs',
    }))
    .pipe(htmlmin())
    .pipe(rename({extname: '.html'}))
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

// ------------------------------- DEV -------------------------------
gulp.task('browser-sync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });

    gulp.watch('docs/**/*', ['reload'])
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
})

// ------------------------------ TASKS ------------------------------
gulp.task('build', ['handlebars', 'sass', 'images']);
gulp.task('watch', ['handlebars:watch', 'sass:watch', 'images:watch']);
gulp.task('default', ['watch', 'browser-sync']);
