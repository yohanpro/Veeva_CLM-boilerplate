var gulp = require("gulp");
const setting = require("../config.json");

const { presentation, numberOfSlide } = setting;

const slides = [];
for (let i = 0; i < numberOfSlide; i++) {
  let name = "";
  if (i < 10) {
    name = "00" + i;
  } else if (i >= 10) {
    name = "0" + i;
  }
  name = presentation + "_" + name;
  slides.push(name);
}
const makeslides = () => {
  let newSlides = slides.map(el => {
    el = `'${el}'`;
    return el;
  });
  return newSlides;
};

gulp.task("test", () => {
  let data = makeslides();
  console.log(data);
});

const makeCoreJS = () => {
  const data = `var com = com || {};
com.inno = com.inno || {};
com.inno.veeva = {
    presentation: '${presentation}',
    slides: [${makeslides()}],
    addSlides: [
      '${presentation}_PI', '${presentation}_REFS'
    ],
    home: '${slides[0]}',
    pi:'${presentation}_PI',
    spi: '',
    refs: '${presentation}_REFS',
    isVeeva: false,
    isWindow: false,
    currentSlide: '',
    nextSlide: '',
    prevSlide: '',
    touchEvent: 'mousedown',
    prevMainSlide: '',
    debug: false,

    isVeevaEnvironment: function() {
        if (
          navigator.userAgent.match(/iPad/i) !== null ||
          navigator.userAgent.match(/iPhone/i) !== null
        ) {
          return true;
        }
        const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
        const firefox = navigator.userAgent.indexOf("Firefox") > -1;
        const safari = navigator.userAgent.indexOf("Safari") > -1;
    
        if (isChrome || firefox || safari) {
          return false;
        } else {
          return true;
        }
      },
      isWindowEnvironment: function() {
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        if (
          isIE ||
          (!isIE && !!window.StyleMedia) //Edge
        ) {
          return true;
        }
        return false;
      },
    
      getCurrentSlide: function() {
        var parser = document.createElement("a");
        parser.href = window.location.href.replace("/index.html", "");
        return String(parser.pathname).substring(
          parser.pathname.lastIndexOf("/") + 1
        );
      },
    
      getNextSlide: function(currentSlide) {
        var cur = this.slides.indexOf(currentSlide);
        if (cur === this.slides.length - 1) {
          return currentSlide;
        } else {
          return this.slides[cur + 1];
        }
      },
    
      getPrevSlide: function(currentSlide) {
        var cur = this.slides.indexOf(currentSlide);
        if (cur === 0) {
          return currentSlide;
        } else {
          return this.slides[cur - 1];
        }
      },
    
      goToNextSlide: function() {
        if (this.isVeeva) {
          com.veeva.clm.nextSlide();
        } else {
          this.goToSlide(this.nextSlide, this.presentation);
        }
      },
    
      goToPrevSlide: function() {
        if (this.isVeeva) {
          com.veeva.clm.prevSlide();
        } else {
          this.goToSlide(this.prevSlide, this.presentation);
        }
      },
    
      goToSlide: function(slide, presentation) {
        if (!slide || !presentation) {
          return;
        }
        window.location = "../../" + presentation + "/" + slide + "/index.html";
      },
    
      goToVeevaSlide: function(slide, presentation) {
        com.veeva.clm.gotoSlide(slide + ".zip", presentation);
      },
    
      goToHome: function() {
        if (this.isVeeva) {
          this.goToVeevaSlide(this.home, this.presentation);
        } else {
          this.goToSlide(this.home, this.presentation);
        }
      },
    
      goToPI: function() {
        if (this.isVeeva) {
          this.goToVeevaSlide(this.pi, this.presentation);
        } else {
          this.goToSlide(this.pi, this.presentation);
        }
      },
    
      goToRefs: function() {
        if (this.isVeeva) {
          this.goToVeevaSlide(this.refs, this.presentation);
        } else {
          this.goToSlide(this.refs, this.presentation);
        }
      },
    
      getPrevMainSlide: function() {
        return window.sessionStorage.getItem("prevMainSlide");
      },
    
      goToVeevaPrevMainSlide: function(callback) {
        var updateDebugMessage = this.updateDebugMessage;
        var goToVeevaSlide = this.goToVeevaSlide;
        var presentation = this.presentation;
        com.veeva.clm.getDataForCurrentObject(
          "Presentation",
          "Data_String_Field__c",
          function(result) {
            updateDebugMessage(
              "Presentation data received: " + JSON.stringify(result)
            );
    
            if (result.success) {
              goToVeevaSlide(
                result.Presentation.Data_String_Field__c,
                presentation
              );
            }
          }
        );
      },
    
      navigateToPrevMainSlide: function() {
        this.isVeeva = this.isVeevaEnvironment();
        this.isWindow = this.isWindowEnvironment();
    
        if (this.isWindow) {
          this.goToVeevaPrevMainSlide();
        } else {
          var prevSlide = this.getPrevMainSlide();
          this.navigateSlide(prevSlide);
        }
      },
    
      navigateSlide: function(slide) {
        if (this.isVeeva || this.isWindow) {
          this.goToVeevaSlide(slide, this.presentation);
        } else {
          this.goToSlide(slide, this.presentation);
        }
      },
    
      initNav: function() {
        var homeBtn = document.querySelector(".icon-home");
        var piBtn = document.querySelector(".icon-pi");
        var refBtn = document.querySelector(".icon-refs");
    
        if (homeBtn) {
          homeBtn.addEventListener(this.touchEvent, this.goToHome.bind(this));
        }
    
        if (piBtn) {
          piBtn.addEventListener(this.touchEvent, this.goToPI.bind(this));
        }
    
        if (refBtn) {
          refBtn.addEventListener(this.touchEvent, this.goToRefs.bind(this));
        }
      },
    
      updateDebugMessage: function(text) {
        var debugMsg = document.getElementById("debug");
        if (debugMsg && this.debug) {
          debugMsg.innerHTML = debugMsg.innerHTML + "<br />" + text;
        }
      },
    
      setDebugMessage: function(text) {
        var debugMsg = document.getElementById("debug");
        if (debugMsg && this.debug) {
          debugMsg.textContent = text;
        }
      },
    
      showVeevaAPIResult: function(result) {
        this.updateDebugMessage("Veeva API result: " + JSON.stringify(result));
      },
    

      init: function() {
        this.isVeeva = this.isVeevaEnvironment();
    
        this.isWindow = this.isWindowEnvironment();
        this.currentSlide = this.getCurrentSlide();
        this.nextSlide = this.getNextSlide(this.currentSlide);
        this.prevSlide = this.getPrevSlide(this.currentSlide);
    
        if (this.isVeeva && !this.isWindow) {
          this.updateDebugMessage("Veeva Environment");
          this.touchEvent = "touchstart";
        }
    
        var debugStatus = document.getElementById("debug");
        if (debugStatus && !this.debug) {
          debugStatus.style.display = "none";
        }
    
        this.initNav();
      }
    };
    
    $(document).ready(function() {
      document.addEventListener(
        "touchmove",
        function(e) {
          e.preventDefault();
        },
        false
      );
      com.inno.veeva.init();
    });
    `;
  return data;
};

module.exports = { makeCoreJS };
