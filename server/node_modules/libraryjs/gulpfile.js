var path = require("path");
var gulp = require("gulp");
var gulpsync = require("gulp-sync")(gulp);
var clean = require('gulp-clean');
var concat = require('gulp-concat')
var typescript = require("gulp-typescript");
var tsconfig = require('./tsconfig.json');
var fs = require("fs");

const libs = "lib.source";
const exportedLibs = "lib";
const src = path.join(__dirname,"/source");
const dist = path.join(__dirname,"/dist");
const test = path.join(__dirname,"/test");


gulp.task("default", gulpsync.sync([ "clean", "concat", "export", "typescript" ]));

gulp.task("clean", function() { //delete old files
  return gulp.src(path.join(dist))
    .pipe(clean())
  ;
});
gulp.task("concat", function() { //concat typescript
  return gulp.src(path.join(src, "/ts/*.ts"))
    .pipe(concat(libs + ".ts"))
    .pipe(gulp.dest(path.join(dist)))
  ;
});
gulp.task("export", function() { //add export { ... };
  //Import exported list
  var list = require(path.join(src, "/export.json"));
  var exportList = "";
  for(let module of list) {
    exportList += module + ", ";
  }
  exportList = exportList.substr(0, exportList.length - 2);

  //Create module map
  var indexTS = "export { " + exportList + " } from './dist/lib';";
  var indexTSpath = path.join(__dirname, "index.ts");
  fs.writeFile(indexTSpath, indexTS, function(err) {
    gulp.src(indexTSpath)
      .pipe(typescript(tsconfig.compilerOptions))
      .pipe(gulp.dest(__dirname))
    ;
  });

  //Create exported lib ts file
  var exportedLibsContent = fs.readFileSync(path.join(dist, libs + ".ts")) + "\n" + "export { " + exportList + " };";
  return fs.writeFile(path.join(dist, exportedLibs + ".ts"), exportedLibsContent, function(err) {});
});
gulp.task("typescript", function() { //compile typescript
  return gulp.src(path.join(dist, "/*.ts"))
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(gulp.dest(dist))
  ;
});