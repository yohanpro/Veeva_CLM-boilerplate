# Directory containing _MAIN and _ADD presentation folders
# 처음 'sh gen-thumb.sh'를 실행하는 거라면, 'brew install imagemagick' 설치

PROJECT=~/Projects/Brintellix/Brintellix_Brochure-2019/Brintellix_Brochure-2019_1.0
# Directory containing screenshots for all slides
# Screenshot file name must be [slidename].png
# KR_Paxil_SC02_2017_KR1.0_V1.0_008.png
SCN_DIR=~/Projects/Brintellix/Brintellix_Brochure-2019/screenshots

# Generate thumb files for each slide in the presentation

cd $PROJECT
for slide in $(ls); do
    if [ $slide != "shared" ]; then
      cd $slide
      convert $SCN_DIR/$slide.jpg -thumbnail 150x200! -strip thumb.png
      cd ..
    fi
done