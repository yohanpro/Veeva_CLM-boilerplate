var gulp = require("gulp");
const shell = require("shelljs");

const {
  presentation,
  ProductName,
  DirectoryOfPresentation
} = require("../../config.json");
const { distDir } = require("../../gulpfile");

const fs = require("fs");
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
cd $PROJECT
for slide in $(ls); do
  cd $slide
  zip -r $OUT_DIR/$slide.zip . -x .DS_Store
  cd ..
done
`;
  return shZipFile;
};
const shThumb = () => {
  let shThumbFile = `# Directory containing _MAIN and _ADD presentation folders
# 처음 'sh gen-thumb.sh'를 실행하는 거라면, 'brew install imagemagick' 설치

PROJECT=~/Projects/${ProductName}/${DirectoryOfPresentation}/${presentation}

SCN_DIR=~/Projects/${ProductName}/${DirectoryOfPresentation}/screenshots

# Generate thumb files for each slide in the presentation

cd $PROJECT
for slide in $(ls); do
    if [ $slide != "shared" ]; then
      cd $slide
      convert $SCN_DIR/$slide.jpg -thumbnail 150x200! -strip thumb.png
      cd ..
    fi
done`;
  return shThumbFile;
};
gulp.task("makeShfile", () => {
  shell.cd(distDir);
  let shZipFile = shZip();
  let shThumbFile = shThumb();
  fs.writeFile("gen-zip.sh", shZipFile, "utf8", err => {});
  fs.writeFile("gen-thumb.sh", shThumbFile, "utf8", err => {});
});
