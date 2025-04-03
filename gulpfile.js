import gulp from 'gulp';
import connect from 'gulp-connect';
import fileInclude from 'gulp-file-include';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import dartSass from 'sass';
import uglify from 'gulp-uglify';

// Configure Sass to use Dart Sass
const sassCompiler = sass(dartSass);

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
  return gulp.src('src/scss/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
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

// Task to copy public to the dist folder
gulp.task('public', function () {
  return gulp.src('src/public/**/*')
    .pipe(gulp.dest('dist/public'))
    .pipe(connect.reload());
});

// Task to copy fonts to the dist folder
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(connect.reload());
});

// Task to watch for changes in HTML, SCSS, JS, public, and font files
gulp.task('watch', function(done) {
  gulp.watch(['./src/html/*.html'], gulp.series('html'));
  gulp.watch(['./src/scss/*.scss'], gulp.series('scss'));
  gulp.watch(['./src/js/**/*.js'], gulp.series('js'));
  gulp.watch(['./src/public/**/*'], gulp.series('public'));
  gulp.watch(['./src/fonts/**/*'], gulp.series('fonts'));
  done();
});

// Build task to run all tasks in sequence
gulp.task('build', gulp.series('html', 'scss', 'js', 'public', 'fonts'));

// Default task to run when `gulp` command is executed
gulp.task('default', gulp.parallel('connect', 'watch', 'build'));