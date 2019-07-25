var gulp = require("gulp");
const shell = require("shelljs");
const setting = require("../../config.json");

const { presentation, numberOfSlide, SeperateMainAndAdd } = setting;
const { presentationDir, copyDir, distDir } = require("../../gulpfile");
const fs = require("fs");
const { makeCoreJS } = require("../coreSetting");

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

const makeHtml = slide => {
  let data = `<!DOCTYPE html>
<head>
  <title>${slide}</title>
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
  <div>
    <img class="background" src="../shared/media/images/bg01.jpg">
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
  <script src="js/local.js"></script>
</body>
</html>`;
  return data;
};

gulp.task("putAssets", () => {
  shell.cd(presentationDir);
  shell.ls(presentationDir).forEach(el => {
    if (SeperateMainAndAdd) {
      // 여기서 el은  프레젠테이션
      shell.ls(`${presentationDir}/${el}`).forEach(slide => {
        shell.cd(`${presentationDir}/${el}/${slide}`);
        let htmlData = makeHtml(slide);
        fs.writeFile("index.html", htmlData, "utf8", err => callback);
        shell.mkdir("css");
        shell.mkdir("images");
        shell.mkdir("js");
        shell.cd("css");
        callback(fs.writeFile("styles.css", "", "utf8", err => {})).then(() => {
          shell.cd("../");
        });
        shell.cd(`${presentationDir}/${el}/${slide}/js`);
        callback(fs.writeFile("local.js", "", "utf8", err => {})).then(() => {
          shell.cd("../");
        });
        shell.cd("../");
      });
    } else {
      if (el !== "shared") {
        shell.cd(`${presentationDir}/${el}`);
        let htmlData = makeHtml(el);
        fs.writeFile("index.html", htmlData, "utf8", err => callback);
        shell.mkdir("css");
        shell.mkdir("images");
        shell.mkdir("js");
        shell.cd("css");
        callback(fs.writeFile("styles.css", "", "utf8", err => {})).then(() => {
          shell.cd("../../");
        });
        shell.cd(`${presentationDir}/${el}/js`);
        callback(fs.writeFile("local.js", "", "utf8", err => {})).then(() => {
          shell.cd("../");
        });
      }
    }
  });
});

//shared 세팅
gulp.task("cpShared", () => {
  let data = makeCoreJS();
  shell.cd(`${distDir}/shared`);
  shell.cp("-Rf", `${copyDir}/js`, `${distDir}/shared/js`);
  shell.cd("js");
  fs.writeFile("core.js", data, "utf8", err => {});
  shell.cd(`${distDir}/shared`);
  fs.writeFile("index.html", "<html>shared</html>", "utf8", err => {});
  shell.mkdir("media");
  shell.cd(`${distDir}/shared/media`);
  shell.mkdir("images");
  shell.cp(
    "-Rf",
    [`${copyDir}/css`, `${copyDir}/media/*`, `${copyDir}/thumb.png`],
    `${distDir}/shared`
  );
});

const callback = fn => {
  return new Promise((res, rej) => {
    res(fn);
  });
};
