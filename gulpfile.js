import gulp from 'gulp';
import connect from 'gulp-connect';
import fileInclude from 'gulp-file-include';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import dartSass from 'sass';
import uglify from 'gulp-uglify';
import replace from 'gulp-replace';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import newer from 'gulp-newer';
// Configure Sass to use Dart Sass
const sassCompiler = sass(dartSass);

// Task to start a local server
gulp.task('connect', function (done) {
  connect.server({
    root: 'dist',
    livereload: true,
    fallback: 'dist/index.html',
  });
  done();
});

// Task to process HTML includes and reload the server when HTML files change
gulp.task('html', function () {
  return gulp
    .src('./src/html/*.html')
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// Task to process SCSS files, minify CSS, and add versioning
gulp.task('scss', function () {
  return gulp
    .src('src/scss/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Minify CSS
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// Task to minify JavaScript files, replace placeholders, and add versioning
gulp.task('js', function () {
  return gulp
    .src('src/js/**/*.js')
    .pipe(replace('__API_URL__', process.env.API_URL || ''))
    .pipe(replace('__DEBUG__', process.env.DEBUG || 'false'))
    .pipe(uglify())
    .pipe(rev()) // Add versioning
    .pipe(gulp.dest('dist/js'))
    .pipe(rev.manifest('rev-manifest.json', { merge: true })) // Create or update manifest
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// Task to copy public to the dist folder
gulp.task('public', function () {
  return gulp.src('src/public/**/*').pipe(newer('dist/images')).pipe(gulp.dest('dist/public')).pipe(connect.reload());
});

// Task to copy fonts to the dist folder
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts')).pipe(connect.reload());
});

// Task to replace references to versioned files in HTML
gulp.task('revreplace', function () {
  const manifest = gulp.src('dist/rev-manifest.json');

  return gulp
    .src('dist/*.html')
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest('dist'));
});

// Task to watch for changes in HTML, SCSS, JS, public, and font files
gulp.task('watch', function (done) {
  gulp.watch(['./src/html/*.html'], gulp.series('html', 'revreplace'));
  gulp.watch(['./src/scss/*.scss'], gulp.series('scss', 'revreplace'));
  gulp.watch(['./src/js/**/*.js'], gulp.series('js', 'revreplace'));
  gulp.watch(['./src/public/**/*'], gulp.series('public'));
  gulp.watch(['./src/fonts/**/*'], gulp.series('fonts'));
  done();
});

// Build task to run all tasks in sequence
gulp.task('build', gulp.series('html', 'scss', 'js', 'public', 'fonts', 'revreplace'));

// Default task to run when `gulp` command is executed
gulp.task('default', gulp.parallel('connect', 'watch', 'build'));