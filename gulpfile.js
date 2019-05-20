/**********************************************************/
/* gulp task for GSK */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/05/16                   */
/* Last modified by          yohan                         */
/**********************************************************/

const setting = require("./config.json");

const {
  presentation,
  ProductName,
  numberOfSlide,
  DirectoryOfPresentation
} = setting;
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
  "putHtml",
  "cpShared",
  "makeShfile",
  "makeEtc"
]);
