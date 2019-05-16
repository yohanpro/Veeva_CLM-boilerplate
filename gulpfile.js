/**********************************************************/
/* gulp task for GSK */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/05/16                   */
/* Last modified by          yohan                         */
/**********************************************************/

var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("./config.json");

const { presentation, ProductName, numberOfSlide, shared } = setting;
const currentPwd = __dirname;
const distDir = __dirname + "/dist";
const presentationDir = `${distDir}/${presentation}`;
const copyDir = __dirname + "/copy";

gulp.task("test", () => {
  shell.exec("touch test.sh");
  shell.exec("vim test.sh");
});

gulp.task("deleteDist", () => {
  shell.rm("-rf", `${currentPwd}/dist/*`);
});

gulp.task("makeDir", ["deleteDist"], () => {
  console.log(presentation, ProductName, numberOfSlide);
  shell.cd(distDir);
  shell.exec(`mkdir ${presentation}`);
});

gulp.task("makeSubDir", () => {
  shell.cd(presentationDir);
  for (let i = 0; i < numberOfSlide; i++) {
    let name = "";
    if (i < 10) {
      name = "00" + i;
    } else if (i >= 10) {
      name = "0" + i;
    }
    shell.mkdir(`${presentation}_${name}`);
  }
  if (shared) {
    shell.mkdir("shared");
  }
});

gulp.task("copyGeneralFiles", () => {
  shell.cd(copyDir);
  shell.cp("-R", [`*`, "!/*.html"], distDir);
});
gulp.task("build", ["makeDir", "makeSubDir"]);
