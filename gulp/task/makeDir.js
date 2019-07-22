var gulp = require("gulp");
const shell = require("shelljs");

const {
  presentation,
  numberOfSlide,
  SeperateMainAndAdd
} = require("../../config.json");
const { baseDir, distDir, presentationDir } = require("../../gulpfile");

gulp.task("deleteDist", () => {
  shell.rm("-Rf", `${distDir}/*`);
});

gulp.task("makeDir", ["deleteDist"], () => {
  shell.cd(baseDir);
  shell.mkdir("-p", "dist"); //-p 옵션 : 만약 dist풀더가 존재하지 않는다면 새로 만들어줌.
  shell.cd(distDir);
  if (!SeperateMainAndAdd) {
    shell.exec(`mkdir ${presentation}`);
  } else {
    shell.exec(`mkdir ${presentation}`);
  }
});

gulp.task("makeSubPresentation", ["makeDir"], () => {
  shell.cd(presentationDir);
  shell.mkdir("-p", `${presentation}_MAIN`);
  shell.mkdir("-p", `${presentation}_ADD`);
  shell.cd("..");
});

gulp.task("makeSubDir", () => {
  shell.cd(presentationDir);
  shell.cd(`${presentation}_MAIN`);

  for (let i = 0; i < numberOfSlide; i++) {
    let name = "";
    if (i < 10) {
      name = "00" + i;
    } else if (i >= 10) {
      name = "0" + i;
    }
    shell.mkdir(`${presentation}_${name}`);
  }
  shell.cd("..");
  shell.cd(`${presentation}_ADD`);

  shell.mkdir(`${presentation}_REFS`);
  shell.mkdir(`${presentation}_PI`);

  shell.cd("../../");
  shell.mkdir("shared");
});
