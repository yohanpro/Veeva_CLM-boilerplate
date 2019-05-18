(function() {
  /* https://codepen.io/JefMari/pen/NxLaed */
  function hasClass(element, cls) {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
  }

  var swipeArea = document.getElementById("swipe-area");
  var swipeRightOn = hasClass(swipeArea, "swipe-right");
  var swipeLeftOn = hasClass(swipeArea, "swipe-left");

  var mc = new Hammer(swipeArea);
  /* Go to next slide on swipe left */
  mc.on("swipeleft", function(ev) {
    if (!swipeLeftOn) return;
    com.inno.veeva.updateDebugMessage("Swipe left");
    com.inno.veeva.goToNextSlide();
  });

  mc.on("swiperight", function(ev) {
    if (!swipeRightOn) return;
    com.inno.veeva.updateDebugMessage("Swipe right");
    com.inno.veeva.goToPrevSlide();
  });
})();
