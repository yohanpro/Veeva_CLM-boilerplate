var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("../../config.json");

const {
  presentation,
  ProductName,
  numberOfSlide,
  DirectoryOfPresentation
} = setting;
const {
  baseDir,
  distDir,
  presentationDir,
  copyDir
} = require("../../gulpfile");
const fs = require("fs");

gulp.task("deleteDist", () => {
  shell.rm("-Rf", `${distDir}/*`);
});

gulp.task("makeDir", ["deleteDist"], () => {
  shell.mkdir(`${distDir}`);

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
