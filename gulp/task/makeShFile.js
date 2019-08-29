var gulp = require("gulp");
const shell = require("shelljs");

const {
  presentation,
  ProductName,
  DirectoryOfPresentation,
  SeperateMainAndAdd
} = require("../../config.json");
const { distDir } = require("../../gulpfile");

const fs = require("fs");

gulp.task("makeShfile", () => {
  shell.cd(distDir);
  let shZipFile = shZip();
  let shThumbFile = shThumb();
  fs.writeFile("gen-zip.sh", shZipFile, "utf8", err => {});
  fs.writeFile("gen-thumb.sh", shThumbFile, "utf8", err => {});
});
let shStr = "";
const shZip = () => {
  const shZipFile = `#!/bin/bash

# Directory for generated zip files
OUT_DIR=~/Projects/${ProductName}/${DirectoryOfPresentation}/dist

# Directry containing _MAIN and _ADD presentation folders
PROJECT=~/Projects/${ProductName}/${DirectoryOfPresentation}/${presentation}

# Directory to common shared
SHARED_DIR=~/Projects/${ProductName}/${DirectoryOfPresentation}/${presentation}/shared

# Shared file name specific to the project
SHARED=${presentation}_Shared

# Clean up old files inside output directory
cd $OUT_DIR
rm -r *

# Generate zip file for shared resources
cd $SHARED_DIR
zip -r $OUT_DIR/$SHARED.zip . -x .DS_Store

# Generate zip files for each slide in the presentation
${shStr}

`;
  return shZipFile;
};
let sh_zip_SeperateMainAndAdd = `
cd $PROJECT
for presentation in $(ls); do
  cd $presentation
  for slide in $(ls); do
    cd $slide
    zip -r $OUT_DIR/$slide.zip . -x .DS_Store
    cd ..
  done
  cd ..
done
`;

let sh_zip_Normal = `
cd $PROJECT
for slide in $(ls); do
  cd $slide
  zip -r $OUT_DIR/$slide.zip . -x .DS_Store
  cd ..
done
`;

if (SeperateMainAndAdd) {
  shStr = sh_zip_SeperateMainAndAdd;
} else {
  shStr = sh_zip_Normal;
}

const shThumb = () => {
  let shThumbFile = `# Directory containing _MAIN and _ADD presentation folders
# 처음 'sh gen-thumb.sh'를 실행하는 거라면, 'brew install imagemagick' 설치

PROJECT=~/Projects/${ProductName}/${DirectoryOfPresentation}/${presentation}

SCN_DIR=~/Projects/${ProductName}/${DirectoryOfPresentation}/screenshots

# Generate thumb files for each slide in the presentation
${sh_thumb_str}
`;
  return shThumbFile;
};

let sh_thumb_str = "";
let sh_thumb_seperated = `
cd $PROJECT
for presentation in $(ls); do
  cd $presentation
  for slide in $(ls); do
    if [ $slide != "shared" ]; then
      cd $slide
      convert $SCN_DIR/$slide.png -thumbnail 200x150! -strip thumb.png
      cd ..
    fi
  done
  cd ..
done
`;

let sh_thumb_normal = `
cd $PROJECT
for slide in $(ls); do
    if [ $slide != "shared" ]; then
      cd $slide
      convert $SCN_DIR/$slide.png -thumbnail 200x150! -strip thumb.png
      cd ..
    fi
done
`;
if (SeperateMainAndAdd) {
  sh_thumb_str = sh_thumb_seperated;
} else {
  sh_thumb_str = sh_thumb_normal;
}
