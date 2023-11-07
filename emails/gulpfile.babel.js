import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browser from 'browser-sync';
import rimraf from 'rimraf';
import panini from 'panini';
import yargs from 'yargs';
import lazypipe from 'lazypipe';
import inky from 'inky';
import fs from 'fs';
import siphon from 'siphon-media-query';
import path from 'path';
import merge from 'merge-stream';
import beep from 'beepbeep';

const $ = plugins();

var dartSass = require('gulp-sass')(require('sass'));

// Look for the --production flag
const PRODUCTION = !!yargs.argv.production;
const EMAIL = yargs.argv.to;
const DIST_FOLDER = PRODUCTION ? 'final' : 'dist';

// Declar var so that both AWS and Litmus task can use it.
var CONFIG;

// Build the "DIST_FOLDER" folder by running all of the below tasks
gulp.task('build', gulp.series(clean, pages, sass, images, inline));

// Build emails, run the server, and watch for file changes
gulp.task('default', gulp.series('build', server, watch));

// Build emails, then zip
gulp.task('zip', gulp.series('build', zip));

// Delete the "DIST_FOLDER" folder
// This happens every time a build starts
function clean(done) {
  rimraf(DIST_FOLDER, done);
}

// Compile layouts, pages, and partials into flat HTML files
// Then parse using Inky templates
function pages() {
  return gulp
    .src(['src/pages/**/*.html', '!src/pages/archive/**/*.html'])
    .pipe(
      panini({
        root: 'src/pages',
        layouts: 'src/layouts',
        partials: 'src/partials',
        helpers: 'src/helpers',
      }),
    )
    .pipe(inky())
    .pipe(gulp.dest(DIST_FOLDER));
}

// Reset Panini's cache of layouts and partials
function resetPages(done) {
  panini.refresh();
  done();
}

// Compile Sass into CSS
function sass() {
  return gulp
    .src('src/assets/scss/app.scss')
    .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
    .pipe(
      dartSass
        .sync({
          includePaths: ['node_modules/foundation-emails/scss'],
        })
        .on('error', dartSass.logError),
    )
    .pipe(
      $.if(
        PRODUCTION,
        $.uncss({
          html: [`${DIST_FOLDER}/**/*.html`],
        }),
      ),
    )
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(`${DIST_FOLDER}/css`));
}

// Copy and compress images
function images() {
  return gulp
    .src(['src/assets/img/**/*', '!src/assets/img/archive/**/*'])
    .pipe($.imagemin())
    .pipe(gulp.dest(`./${DIST_FOLDER}/assets/img`));
}

// Inline CSS and minify HTML
function inline() {
  return gulp
    .src(`${DIST_FOLDER}/**/*.html`)
    .pipe($.if(PRODUCTION, inliner(`${DIST_FOLDER}/css/app.css`)))
    .pipe(gulp.dest(DIST_FOLDER));
}

// Start a server with LiveReload to preview the site in
function server(done) {
  browser.init({
    server: DIST_FOLDER,
    port: 3001,
  });
  done();
}

// Watch for file changes
function watch() {
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(resetPages, pages, inline, browser.reload));
  gulp.watch(['src/layouts/**/*', 'src/partials/**/*']).on('all', gulp.series(resetPages, pages, inline, browser.reload));
  gulp.watch(['../scss/**/*.scss', 'src/assets/scss/**/*.scss']).on('all', gulp.series(resetPages, sass, pages, inline, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
}

// Inlines CSS into HTML, adds media query CSS into the <style> tag of the email, and compresses the HTML
function inliner(css) {
  var css = fs.readFileSync(css).toString();
  var mqCss = siphon(css);

  var pipe = lazypipe()
    .pipe($.inlineCss, {
      applyStyleTags: false,
      removeStyleTags: true,
      preserveMediaQueries: true,
      removeLinkTags: false,
    })
    .pipe($.replace, '<!-- <style> -->', `<style>${mqCss}</style>`)
    .pipe($.replace, '<link rel="stylesheet" type="text/css" href="css/app.css">', '')
    .pipe($.htmlmin, {
      collapseWhitespace: false,
      minifyCSS: true,
    });

  return pipe();
}

// Copy and compress into Zip
function zip() {
  var ext = '.html';

  function getHtmlFiles(dir) {
    return fs.readdirSync(dir).filter(function (file) {
      var fileExt = path.join(dir, file);
      var isHtml = path.extname(fileExt) == ext;
      return fs.statSync(fileExt).isFile() && isHtml;
    });
  }

  var htmlFiles = getHtmlFiles(DIST_FOLDER);

  var moveTasks = htmlFiles.map(function (file) {
    var sourcePath = path.join(DIST_FOLDER, file);
    var fileName = path.basename(sourcePath, ext);

    var moveHTML = gulp.src(sourcePath).pipe(
      $.rename(function (path) {
        path.dirname = fileName;
        return path;
      }),
    );

    var moveImages = gulp
      .src(sourcePath)
      .pipe($.htmlSrc({ selector: 'img' }))
      .pipe(
        $.rename(function (currentpath) {
          currentpath.dirname = path.join(fileName, currentpath.dirname.replace(DIST_FOLDER, ''));
          return currentpath;
        }),
      );

    return merge(moveHTML, moveImages)
      .pipe($.zip(fileName + '.zip'))
      .pipe(gulp.dest(DIST_FOLDER));
  });

  return merge(moveTasks);
}
