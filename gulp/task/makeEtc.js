var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("../../config.json");

const { presentation, ProductName, numberOfSlide, shared } = setting;
const baseDir = require("../../gulpfile");
const distDir = baseDir + "/dist";
const presentationDir = `${distDir}/${presentation}`;
const copyDir = baseDir + "/copy";
const fs = require("fs");

gulp.task("makeEtc", () => {
  shell.cd(distDir);
  shell.mkdir(["screenshots", "dist"]);
  fs.writeFile("README.md", `${presentation}`, "utf8", err => {});
  shell.cp("-Rf", `${copyDir}/vault.numbers`, `${presentationDir}/shared`);
  shell.cd("..");
});
