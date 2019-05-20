# Directory containing _MAIN and _ADD presentation folders
# 처음 'sh gen-thumb.sh'를 실행하는 거라면, 'brew install imagemagick' 설치

PROJECT=~/Projects/NesinaAct/NesinaAct-sc01-2019/NesinaAct_SC_01-2019

SCN_DIR=~/Projects/NesinaAct/NesinaAct-sc01-2019/screenshots

# Generate thumb files for each slide in the presentation

cd $PROJECT
for slide in $(ls); do
    if [ $slide != "shared" ]; then
      cd $slide
      convert $SCN_DIR/$slide.jpg -thumbnail 150x200! -strip thumb.png
      cd ..
    fi
done