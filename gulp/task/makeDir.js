var gulp = require("gulp");
const shell = require("shelljs");

const { presentation, numberOfSlide } = require("../../config.json");
const { distDir, presentationDir } = require("../../gulpfile");

gulp.task("deleteDist", () => {
  shell.rm("-Rf", `${distDir}/*`);
});

gulp.task("makeDir", ["deleteDist"], () => {
  if (!`${distDir}`) {
    shell.mkdir(`${distDir}`);
  }
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

  shell.mkdir("shared");
});
