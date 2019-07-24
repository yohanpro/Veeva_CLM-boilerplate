/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/05/26                   */
/* Last modified by          yohan                         */
/**********************************************************/

const { presentation } = require("./config.json");
const baseDir = __dirname;
const distDir = baseDir + `/dist`;
const presentationDir = `${distDir}/${presentation}`;
const copyDir = baseDir + "/copy";

module.exports = { baseDir, distDir, presentationDir, copyDir };
const gulp = require("gulp");

require("./gulp/task/makeDir");
require("./gulp/task/putAssets");
require("./gulp/task/makeShFile");
require("./gulp//task/makeEtc");

gulp.task("build", [
  "makeDir",
  "makeSubDir",
  "putAssets",
  "cpShared",
  "makeShfile",
  "makeEtc"
]);
