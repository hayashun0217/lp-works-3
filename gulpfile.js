const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync");

//ファイル圧縮
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const htmlBeautify = require("gulp-html-beautify");

const sassGlob = require("gulp-sass-glob-use-forward");

const pug = require("gulp-pug");

function test(done) {
  console.log("hello Gulp");  //処理の内容
  done();
}

function compileSass() {
  //元になるフォルダー src
  return gulp.src("./src/assets/sass/**/*.scss")
  //コンパイルの処理を記載する
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssSorter()])) 
  .pipe(mmq())
  //出力先のフォルダー public
  .pipe(gulp.dest("./public/assets/css/"))//出力先のパス
  //CSSファイル圧縮
  .pipe(cleanCss())
  .pipe(sassGlob())
  .pipe(rename( {
    suffix: ".min"
  }))
  .pipe(gulp.dest("./public/assets/css/"))
}


//scssファイルを更新されたらコンパイル->リロードされる
function watch() {
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserReload));  
  gulp.watch("./src/assets/sass/**/*.js", gulp.series(minJs, browserReload));  
  gulp.watch("./src/assets/img/**/*", gulp.series(copyImage, browserReload));  
  gulp.watch("./src/assets/**/*.html", gulp.series(formatHTML, browserReload));  
}

function browserInit() {
  browserSync.init({
    server: {
      baseDir: "./public/"  //ベースのディレクトリー
    }
  })
}


function browserReload(done) {
  browserSync.reload();
  done();
}

//jsファイル圧縮
function minJs() {
  return gulp.src("./src/assets//js/**/*.js")
  .pipe(gulp.dest("./public/assets/js/"))
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest("./public/assets/js/"))
}

//HTMLフォーマット
function formatHTML() {
  return gulp.src("./src/**/*.html")
  .pipe(htmlBeautify({
    indent_size: 2,
    indent_with_tabs: true,
  }))
  .pipe(gulp.dest("./public/"))
}

function copyImage() {
  return gulp.src("./src/assets/img/**/*")
  .pipe(gulp.dest("./public/assets/img/"))
}

function compilePug() {
  return gulp.src(["./src/**/*.pug","!./src/**/_*.pug"]) //_をつけたpugファイルは出力されない
//コンパイルの処理を書く
.pipe(pug( {
  pretty: true  //改行されるようになる
}) )//pugのパッケージを読み込む
.pipe(gulp.dest("./public"))
}

exports.compilePug = compilePug; //実行できるようにする
exports.test = test;    //コマンドで実行  コマンドでnpx gulp test
exports.compileSass = compileSass;    //コマンドで実行  コマンドでnpx gulp compilesSass
exports.watch = watch;    //コマンドで実行  コマンドでnpx gulp watch
exports.browserInit = browserInit;    //コマンドで実行  コマンドでnpx gulp browserInit
exports.dev = gulp.parallel(browserInit, watch)//カッコ内が自動で行われる
exports.minJS = minJs;
exports.formatHTML = formatHTML;
exports.build = gulp.parallel(formatHTML,minJs,compileSass,copyImage);
