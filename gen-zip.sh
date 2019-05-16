#!/bin/bash

# Directory for generated zip files
OUT_DIR=~/Projects/Relvar/Efficacy/Relvar_Efficacy_2018/dist

# Directry containing _MAIN and _ADD presentation folders
PROJECT=~/Projects/Relvar/Efficacy/Relvar_Efficacy_2018/Relvar_Efficacy_SC_2018_KR1.0

# Directory to common shared
SHARED_DIR=~/Projects/Relvar/Efficacy/Relvar_Efficacy_2018/shared

# Shared file name specific to the project
SHARED=Relvar_Efficacy_SC_2018_KR1.0_Shared

# Clean up old files inside output directory
cd $OUT_DIR
rm -r *

# Generate zip file for shared resources
cd $SHARED_DIR
zip -r $OUT_DIR/$SHARED.zip . -x .DS_Store

# Generate zip files for each slide in the presentation
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