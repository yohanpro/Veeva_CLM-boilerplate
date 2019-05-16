#!/bin/bash

# 세팅
Presentation=Lynpazar_2019_1.0
PRODUCT=Lynpazar
numOfSlide=20


Dist_dir=$(pwd)/dist
ToCopy_dir=$(pwd)/copy

cd $Dist_dir
rm -r *

mkdir $Presentation
cp $ToCopy_dir/* $Dist_dir

gulp