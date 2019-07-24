# Directory containing _MAIN and _ADD presentation folders
# 처음 'sh gen-thumb.sh'를 실행하는 거라면, 'brew install imagemagick' 설치

PROJECT=~/Projects/Orencia/Acronym/Orencia-Nudge-5_Acronym

SCN_DIR=~/Projects/Orencia/Acronym/screenshots

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

