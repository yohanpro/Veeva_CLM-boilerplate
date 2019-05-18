/**********************************************************/
/* gulp task for GSK */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/05/16                   */
/* Last modified by          yohan                         */
/**********************************************************/

const baseDir = __dirname;
const gulp = require("gulp");
module.exports = baseDir;

require("./gulp/task/makeDir");
require("./gulp/task/putAssets");

gulp.task("build", [
  "makeDir",
  "makeSubDir",
  "putHtml",
  "putCss",
  "putJs",
  "cpShared"
]);
