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

gulp.task("makeEtc", () => {
  shell.cd(distDir);
  shell.mkdir(["screenshots", "dist"]);
  fs.writeFile("README.md", `${presentation}`, "utf8", err => {});
  shell.cp(
    "-Rf",
    [`${copyDir}/vault.numbers`, `${copyDir}/.gitignore`],
    `${distDir}`
  );
  shell.cd("..");
});
