var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("../../config.json");

const { presentation, ProductName, numberOfSlide, shared } = setting;
const baseDir = require("../../gulpfile");
const distDir = baseDir + "/dist";
const presentationDir = `${distDir}/${presentation}`;
const copyDir = baseDir + "/copy";
const fs = require("fs");

gulp.task("deleteDist", () => {
  shell.rm("-rf", `${baseDir}/dist/*`);
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
});

gulp.task("copyGeneralFiles", () => {
  shell.cd(copyDir);
  shell.cp("-R", "*", distDir);
  shell.cd(distDir);

  shell.rm("r", [`${copyDir}/index.html`, "styles/"]);
});
gulp.task("build", ["makeDir", "makeSubDir"]);
