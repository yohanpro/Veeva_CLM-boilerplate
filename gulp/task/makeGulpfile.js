var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("../../config.json");

const { presentation, SeperateMainAndAdd } = require("../../config.json");
const { distDir, copyDir } = require("../../gulpfile");
const fs = require("fs");

const packageJson = `
{
    "name": "",
    "version": "1.0.0",
    "description": "essential packages for clm development",
    "main": "",
    "scripts": {
        "gulp": "./node_modules/gulp/bin/gulp.js"
    },
    "repository": {
        "type": "git",
        "url": ""
    },
    "keywords": [
        "clm"
    ],
    "author": "",
    "license": "ISC",
    "bugs": {
        "url": ""
    },
    "homepage": "",
    "dependencies": {
      "gulp-watch": "^5.0.1",
      "gulp": "^3.9.1",
      "shelljs": "^0.8.3"
    },
    "devDependencies": {}
}
`;

const setGulpFle = () => {
  if (SeperateMainAndAdd) {
    return `gulp.task("gen-shared", function() {
      shell.cd(rootFolder);
      shell.ls(rootFolder).forEach(presentation => {
        console.log(presentation);
        shell.cp("-Rf", baseDir+"/shared",rootFolder);
      });
    });`;
  } else {
    return `gulp.task("gen-shared", function() {
      shell.cd(rootFolder);
      shell.cp("-Rf", baseDir+"/shared",rootFolder);
    });`;
  }
};

const gulpfileJS = `

/**********************************************************/
/* gulp task */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/07/27                   */
/* Last modified by          yohan                         */
/**********************************************************/

var gulp = require("gulp"),
  shell = require("shelljs"),
  watch = require("gulp-watch");

const baseDir = __dirname;


const rootFolder = baseDir+"/${presentation}";

//gulp로 shared파일 자동 생성



gulp.task("watch", () => {
  watch("./shared/**/*", () => {
    gulp.start("gen-shared");
  });
});
${setGulpFle()}
gulp.task("default", ["gen-shared"]);
`;

gulp.task("makeGulpfile", () => {
  // if (!SeperateMainAndAdd) {
  //   return; //만약 MAIN과 ADD로 안 나눠져있는 프로젝트라면 굳이 gulpfile 만들필요 없음.
  // }
  shell.cd(distDir);
  fs.writeFile("package.json", packageJson, "utf8", err => {});
  fs.writeFile("gulpfile.js", gulpfileJS, "utf8", err => {});
});
