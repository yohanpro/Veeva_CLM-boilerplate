var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("../../config.json");

const { presentation, ProductName, numberOfSlide, shared } = setting;
const baseDir = require("../../gulpfile");
const distDir = baseDir + "/dist";
const presentationDir = `${distDir}/${presentation}`;
const copyDir = baseDir + "/copy";
const fs = require("fs");

const slides = [];
for (let i = 0; i < numberOfSlide; i++) {
  let name = "";
  if (i < 10) {
    name = "00" + i;
  } else if (i >= 10) {
    name = "0" + i;
  }
  name = presentation + "_" + name;
  slides.push(name);
}

gulp.task("test", () => {
  console.log(slides);
});

let data = `<!DOCTYPE html>

<head>
  <title>Eliquis_Nudge_LongJourney-2019_1.0_000</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="../shared/css/core.css" type="text/css" charset="utf-8" />
  <link rel="stylesheet" href="css/styles.css" type="text/css" charset="utf-8" />
</head>

<body>
  <div class="container swipe-left swipe-right" id="swipe-area">
  </div>
  <!-- end of container-->

  <script src="../shared/js/jquery-3.1.0.min.js"></script>
  <script src="../shared/js/jquery-ui.js"></script>
  <script src="../shared/js/jquery.ui.touch-punch.js"></script>
  <script src="../shared/js/veeva-library.js"></script>
  <script src="../shared/js/hammer.min.js"></script>
  <script src="../shared/js/core.js"></script>
  <script src="../shared/js/swipe.js"></script>
  <script src="../shared/js/presentation.js"></script>
</body>
</html>`;

gulp.task("putHtml", () => {
  //프레젠테이션을 열고
  shell.cd(presentationDir);
  shell.ls(presentationDir).forEach(slide => {
    shell.cd(slide);
    shell.cp("-P", `${copyDir}/index.html`, slide);
    shell.cd("..");
  });

  //각각의 슬라이드에 index.html파일을 넣어준다.
});

gulp.task("buildHtml", () => {
  shell.cd(copyDir);
  fs.writeFile(`${copyDir}/index.html`, data, "utf8", error => {});
});
