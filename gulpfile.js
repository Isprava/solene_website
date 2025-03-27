const gulp = require('gulp');
const connect = require('gulp-connect');
const fileInclude = require('gulp-file-include');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');

// Task to start a local server
gulp.task('connect', function(done) {
  connect.server({
    root: 'dist',
    livereload: true,
    fallback: 'dist/index.html'
  });
  done();
});

// Task to process HTML includes and reload the server when HTML files change
gulp.task('html', function () {
  return gulp.src('./src/html/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// Task to process SCSS files, minify CSS, and reload the server when CSS files change
gulp.task('scss', function () {
  return gulp.src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Minify CSS
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// Task to minify JavaScript files and copy to the dist folder
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// Task to copy assets to the dist folder
gulp.task('assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(connect.reload());
});

// Task to copy fonts to the dist folder
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(connect.reload());
});

// Task to watch for changes in HTML, SCSS, JS, assets, and font files
gulp.task('watch', function(done) {
  gulp.watch(['./src/html/*.html'], gulp.series('html'));
  gulp.watch(['./src/scss/*.scss'], gulp.series('scss'));
  gulp.watch(['./src/js/**/*.js'], gulp.series('js'));
  gulp.watch(['./src/assets/**/*'], gulp.series('assets'));
  gulp.watch(['./src/fonts/**/*'], gulp.series('fonts'));
  done();
});

// Build task to run all tasks in sequence
gulp.task('build', gulp.series('html', 'scss', 'js', 'assets', 'fonts'));

// Default task to run when `gulp` command is executed
gulp.task('default', gulp.parallel('connect', 'watch', 'build'));