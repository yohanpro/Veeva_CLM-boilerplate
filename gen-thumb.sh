# Directory containing _MAIN and _ADD presentation folders

PROJECT=~/Projects/Relvar/Efficacy/Relvar_Efficacy_2018/Relvar_Efficacy_SC_2018_KR1.0
# Directory containing screenshots for all slides
# Screenshot file name must be [slidename].png
# KR_Paxil_SC02_2017_KR1.0_V1.0_008.png
SCN_DIR=~/Projects/Relvar/Efficacy/Relvar_Efficacy_2018/screenshots

# Generate thumb files for each slide in the presentation
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