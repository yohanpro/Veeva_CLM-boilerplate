var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("../../config.json");

const { presentation } = require("../../config.json");
const { distDir, copyDir } = require("../../gulpfile");
const fs = require("fs");

gulp.task("makeEtc", () => {
  shell.cd(distDir);
  shell.mkdir(["screenshots", "dist"]);
  fs.writeFile("README.md", `${presentation}`, "utf8", err => {});
  shell.cp("-Rf", [`${copyDir}/.gitignore`], `${distDir}`);
  shell.cd("..");
});
