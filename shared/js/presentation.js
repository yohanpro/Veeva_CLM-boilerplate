/**********************************************************/
/* GSK Veeva Master Template - Presentation Functionality */
/**********************************************************/
/* File version              1.4.1                       */
/* Last modified             05/05/2017                   */
/* Last modified by          T.T.                         */
/**********************************************************/

// --- CUSTOM TO THIS PRESENTATION --- //
$(document).ready(function() {

  /* Initialize SI */
    (function initSi() {
        var dialogId,
            $si = $('#si');

        // If embed Si value is true, create a dialog.
        if (com.gsk.mtconfig.embedSi) {
            dialogId = com.gsk.mt.createQuickLinkDialogFrame();
        }

        if (com.gsk.mtconfig.embedSi) {
            $si.css('display', 'inline-block');
            com.gsk.mt.createQuickLinkPi();

            $si.removeClass("gotoSlide")
            .addClass("openDialog")
            .attr("data-quicklink", "Si")
            .attr("data-dialog", "#" + dialogId);
        } else if (!com.gsk.mtconfig.embedSi && com.gsk.mtconfig.si !== "") {
            $si.css('display', 'inline-block');
            if (com.gsk.mtconfig.si === com.gsk.mt.currentSlide) {
                $si.addClass("activeNav");
            }
        }
    })();

    $('.fn-modal-open-btn').on(com.gsk.mt.pressEvent, function() {
        $('.fn-modal').toggleClass('open');
    });
    $('.fn-modal-close-btn').on(com.gsk.mt.pressEvent, function() {
        $('.fn-modal').removeClass('open');
    });
});
