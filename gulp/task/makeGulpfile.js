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
        "test": "echo \\\"Error: no test specified\\\" && exit 1",
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
        "gulp": "^3.9.1"
    },
    "devDependencies": {}
}
`;

const gulpfileJS = `

/**********************************************************/
/* gulp task */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/07/27                   */
/* Last modified by          yohan                         */
/**********************************************************/

var gulp = require("gulp");

//현재 경로 바꿔주기

const rootFolder = "./${presentation}/";

//gulp로 shared파일 자동 생성
const sharedSrc = "shared/**/*";
const addSharedSrc = rootFolder + "${presentation}_ADD";
const mainSharedSrc = rootFolder + "${presentation}_MAIN";

gulp.task("gen-shared", function() {
  return gulp
    .src(sharedSrc, {
      base: "."
    })
    .pipe(gulp.dest(addSharedSrc))
    .pipe(gulp.dest(mainSharedSrc));
});

gulp.task("default", ["gen-shared"]);
`;

const check = () => {
  if (SeperateMainAndAdd) {
  }
};
gulp.task("makeGulpfile", () => {
  if (!SeperateMainAndAdd) {
    return; //만약 MAIN과 ADD로 안 나눠져있는 프로젝트라면 굳이 gulpfile 만들필요 없음.
  }
  shell.cd(distDir);
  fs.writeFile("package.json", packageJson, "utf8", err => {});
  fs.writeFile("gulpfile.js", gulpfileJS, "utf8", err => {});
});
