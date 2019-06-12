"use strict";

// Count characters in the composer, then change text
// to red if over the limit.
export const composerCharCounter = () => {
  $("#new-tweet textarea").on("input", function() {
    let $textarea = $(this);
    let charCounter = $textarea.siblings(".counter");
    charCounter.text(140 - $textarea.val().length);

    if (Number(charCounter.text()) < 0) {
      charCounter.addClass("error");
    } else {
      charCounter.removeClass("error");
    }
  });
};