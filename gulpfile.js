/**********************************************************/
/* gulp task for GSK */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/05/16                   */
/* Last modified by          yohan                         */
/**********************************************************/

const baseDir = __dirname;
module.exports = baseDir;
const gulp = require("gulp");

require("./gulp/task/makeDir");
require("./gulp/task/putAssets");
require("./gulp/task/makeShFile");
require("./gulp//task/makeEtc");

gulp.task("build", [
  "makeDir",
  "makeSubDir",
  "putHtml",
  "putCss",
  "putJs",
  "cpShared",
  "makeShfile",
  "makeEtc"
]);
