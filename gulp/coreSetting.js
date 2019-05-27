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

    isVeevaEnvironment: function () {
        if (navigator.userAgent.match(/iPad/i) !== null ||
            navigator.userAgent.match(/iPhone/i) !== null) {
            return true;
        }

        var isChrome = (!!window.chrome && !!window.chrome.webstore),
            isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
            !isChrome && window.webkitAudioContext !== undefined;
        if (typeof InstallTrigger !== 'undefined' || // Firefox
            isSafari || // Safari
            isChrome) // Chrome
        {
            return com.veeva.clm.isEngage(); //return false;
        }
        return true;
    },

    isWindowEnvironment: function () {
        var isIE = ( /*@cc_on!@*/ false || !!document.documentMode);
        if (isIE ||
            (!isIE && !!window.StyleMedia) //Edge
        ) {
            return true;
        }
        return false;
    },

    getCurrentSlide: function () {
        var parser = document.createElement('a');
        parser.href = window.location.href.replace("/index.html", "");
        return String(parser.pathname).substring(
            parser.pathname.lastIndexOf('/') + 1);
    },

    getNextSlide: function (currentSlide) {
        var cur = this.slides.indexOf(currentSlide);
        if (cur === this.slides.length - 1) {
            return currentSlide;
        } else {
            return this.slides[cur + 1];
        }
    },

    getPrevSlide: function (currentSlide) {
        var cur = this.slides.indexOf(currentSlide);
        if (cur === 0) {
            return currentSlide;
        } else {
            return this.slides[cur - 1];
        }
    },

    goToNextSlide: function () {
        if (this.isVeeva) {
            com.veeva.clm.nextSlide();
        } else {
            this.goToSlide(this.nextSlide, this.presentation);
        }
    },

    goToPrevSlide: function () {
        if (this.isVeeva) {
            com.veeva.clm.prevSlide();
        } else {
            this.goToSlide(this.prevSlide, this.presentation);
        }
    },

    goToSlide: function (slide, presentation) {
        if (!slide || !presentation) {
            return;
        }
        window.location = '../../' + presentation + '/' + slide + '/index.html';
    },

    goToVeevaSlide: function (slide, presentation) {
        com.veeva.clm.gotoSlide(slide + '.zip', presentation);
    },

    goToHome: function () {
        if (this.isVeeva) {
            this.goToVeevaSlide(this.home, this.presentation);
        } else {
            this.goToSlide(this.home, this.presentation);
        }
    },

    goToPI: function () {
        if (this.isVeeva) {
            this.goToVeevaSlide(this.pi, this.presentation);
        } else {
            this.goToSlide(this.pi, this.presentation);
        }
    },

    goToRefs: function () {
        if (this.isVeeva) {
            this.goToVeevaSlide(this.refs, this.presentation);
        } else {
            this.goToSlide(this.refs, this.presentation);
        }
    },

    getPrevMainSlide: function () {
        return window.sessionStorage.getItem('prevMainSlide');
    },

    goToVeevaPrevMainSlide: function (callback) {
        var updateDebugMessage = this.updateDebugMessage;
        var goToVeevaSlide = this.goToVeevaSlide;
        var presentation = this.presentation;
        com.veeva.clm.getDataForCurrentObject('Presentation', 'Data_String_Field__c', function (result) {
            updateDebugMessage('Presentation data received: ' + JSON.stringify(result));

            if (result.success) {
                goToVeevaSlide(result.Presentation.Data_String_Field__c, presentation);
            }
        });
    },

    navigateToPrevMainSlide: function () {
        this.isVeeva = this.isVeevaEnvironment();
        this.isWindow = this.isWindowEnvironment();

        if (this.isWindow) {
            this.goToVeevaPrevMainSlide();
        } else {
            var prevSlide = this.getPrevMainSlide();
            this.navigateSlide(prevSlide)
        }
    },

    navigateSlide: function (slide) {
        if (this.isVeeva || this.isWindow) {
            this.goToVeevaSlide(slide, this.presentation);
        } else {
            this.goToSlide(slide, this.presentation);
        }
    },

    initNav: function () {
        var homeBtn = document.querySelector('.icon-home');
        var piBtn = document.querySelector('.icon-pi');
        var refBtn = document.querySelector('.icon-refs');

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

    updateDebugMessage: function (text) {
        var debugMsg = document.getElementById('debug');
        if (debugMsg && this.debug) {
            debugMsg.innerHTML = debugMsg.innerHTML + '<br />' + text;
        }
    },

    setDebugMessage: function (text) {
        var debugMsg = document.getElementById('debug');
        if (debugMsg && this.debug) {
            debugMsg.textContent = text;
        }
    },

    showVeevaAPIResult: function (result) {
        this.updateDebugMessage('Veeva API result: ' + JSON.stringify(result));
    },

    setLocalStoragePrevSlide: function (currentSlide) {
        if (this.addSlides.indexOf(currentSlide) <= -1) {
            this.updateDebugMessage('setting prevSlide');
            window.sessionStorage.setItem('prevMainSlide', this.currentSlide);
        }

    },
    updateSliderValue: function (value) {
        var slider = document.getElementById('quiz-slider');
        if (value && slider) {
            $('#quiz-slider').val(value).change();
            $('#blue-percentage').text(value);
            $('#pink-percentage').text(100 - value);
        }
    },

    initSliderWindow: function () {
        var isWindow = this.isWindowEnvironment();
        var updateSliderValue = this.updateSliderValue;
        var updateDebugMessage = this.updateDebugMessage;
        if (isWindow) {
            com.veeva.clm.getDataForCurrentObject('Presentation', 'Data_Num_Field__c', function (result) {
                updateDebugMessage('Presentation data received: ' + JSON.stringify(result));

                if (result.success) {
                    var oldValue = result.Presentation.Data_Num_Field__c;
                    updateDebugMessage(oldValue);
                    updateSliderValue(oldValue);
                }
            });
        }

    },

    initSliderLocalStorage: function () {
        var oldValue = window.sessionStorage.getItem('slider-value');
        this.updateSliderValue(oldValue);
    },

    initSlider: function () {
        var slider = document.getElementById('quiz-slider');

        if (slider) {
            $('#quiz-slider').rangeslider({
                polyfill: false,
                rangeClass: 'rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: 'rangeslider--vertical',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',

                // Callback function
                onSlide: function (position, value) {
                    if (!$('#submit-btn').hasClass('fg-pink')) {
                        $('#submit-btn').addClass('active');
                    }
                    $('#blue-percentage').text(value);
                    $('#pink-percentage').text(100 - value);
                },

            });
        }
    },

    setVeevaRecordPrevSlide: function () {
        var addSlides = this.addSlides;
        var updateDebugMessage = this.updateDebugMessage;

        com.veeva.clm.getDataForCurrentObject('KeyMessage', 'Media_File_Name_vod__c', function (result) {
            updateDebugMessage('KeyMessage data received: ' + JSON.stringify(result));

            if (result.success) {
                var currentSlide = result.KeyMessage.Media_File_Name_vod__c;
                currentSlide = currentSlide.substring(0, currentSlide.length - 4); // remove .zip
                updateDebugMessage('Parsed slide name: ' + currentSlide);
                if (addSlides.indexOf(currentSlide) <= -1) {
                    // Save slide name if it is not one of the add slides.
                    updateDebugMessage('Updating Presentation...');

                    var prevSlideRecord = {};
                    prevSlideRecord.Data_String_Field__c = currentSlide;
                    com.veeva.clm.updateCurrentRecord('Presentation', prevSlideRecord, function (updatedRecord) {
                        updateDebugMessage('Updated Record' + JSON.stringify(updatedRecord));
                    });
                }
            }
        });
    },

    checkPage: function () { /*pi,커버,refs 페이지 구별해서 아이콘 이미지 변경*/
        var currentSlide = this.getCurrentSlide();
        switch (currentSlide) {
            case this.home:
                $(".icon-home").attr("src", "../shared/images/icon_home_active.png");
                break;
            case this.pi:
                $(".icon-pi").attr("src", "../shared/images/icon_pi_active.png");
                break;
            case this.refs:
                $(".icon-refs").attr("src", "../shared/images/icon_references_active.png");
                break;
        }

    },



    init: function () {
        this.isVeeva = this.isVeevaEnvironment();
        this.isWindow = this.isWindowEnvironment();
        this.currentSlide = this.getCurrentSlide();
        this.nextSlide = this.getNextSlide(this.currentSlide);
        this.prevSlide = this.getPrevSlide(this.currentSlide);

        if (this.isVeeva && !this.isWindow) {
            this.updateDebugMessage('Veeva Environment');
            this.touchEvent = 'touchstart';
        }

        this.checkPage();

        var debugStatus = document.getElementById('debug');
        if (debugStatus && !this.debug) {
            debugStatus.style.display = 'none';
        }

        this.initNav();

        if (this.isWindow) {

            this.setVeevaRecordPrevSlide();
            this.initSliderWindow();

        } else {

            this.setLocalStoragePrevSlide(this.currentSlide);
            this.initSliderLocalStorage();
        }

    },



};


$(document).ready(function () {

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    com.inno.veeva.init();
    var closeBtn = $('.btn-close');
    if (closeBtn.length) {
        closeBtn.on(com.inno.veeva.touchEvent, function () {
            com.inno.veeva.navigateToPrevMainSlide();
        });
    }
});`;
  return data;
};

module.exports = { makeCoreJS };
