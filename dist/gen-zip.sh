#!/bin/bash

# Directory for generated zip files
OUT_DIR=~/Projects/Orencia/Acronym/dist

# Directry containing _MAIN and _ADD presentation folders
PROJECT=~/Projects/Orencia/Acronym/Orencia-Nudge-5_Acronym

# Directory to common shared
SHARED_DIR=~/Projects/Orencia/Acronym/Orencia-Nudge-5_Acronym/shared

# Shared file name specific to the project
SHARED=Orencia-Nudge-5_Acronym_Shared

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


