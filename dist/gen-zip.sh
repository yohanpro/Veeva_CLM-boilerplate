#!/bin/bash

# Directory for generated zip files
OUT_DIR=~/Projects/NesinaAct/NesinaAct-sc01-2019/dist

# Directry containing _MAIN and _ADD presentation folders
PROJECT=~/Projects/NesinaAct/NesinaAct-sc01-2019/NesinaAct_SC_01-2019

# Directory to common shared
SHARED_DIR=~/Projects/NesinaAct/NesinaAct-sc01-2019/NesinaAct_SC_01-2019/shared

# Shared file name specific to the project
SHARED=NesinaAct_SC_01-2019_Shared

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
