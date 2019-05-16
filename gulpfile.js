/**********************************************************/
/* gulp task for GSK */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2018/06/12                   */
/* Last modified by          yohan                         */
/**********************************************************/

var gulp = require("gulp");
const exec = require("child_process").exec;

var a = require("./config.json");

gulp.task("default", function() {
  exec("sh build.sh");
});

gulp.task("test", () => {});
