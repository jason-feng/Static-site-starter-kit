'use strict';

var gulp		= require('gulp');
var config	= require('./config.json');
var gulpSequence = require('gulp-sequence');


var deps = [];
// Loop on assets tasks
for (var a in config.assets) {
  assetTask('assets#' + a, config.assets[a]);
}

// Meta tesk asset
gulp.task('assets', function build(cb) {
  gulpSequence.apply(null, deps.concat(cb));
});

// Copy assets folders in build path
function assetTask(taskName, asset) {
  deps.push(taskName);
  gulp.task(taskName, function assets() {
    return gulp.src(asset.src)
    .pipe(gulp.dest(asset.dest, {cwd: config.buildDir}));
  });
}
