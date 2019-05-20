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
  shell.rm("-Rf", `${baseDir}/dist/*`);
});

gulp.task("makeDir", ["deleteDist"], () => {
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
  shell.mkdir(`${presentation}_REFS`);
  shell.mkdir(`${presentation}_PI`);

  shell.cp("-Rf", `${copyDir}/.gitignore`, distDir);
  shell.mkdir("shared");
});
// fs.writeFile("README.md", `${presentationDir}`, "utf8", err => {});
