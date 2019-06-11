"use strict";

export const composerCharCounter = () => {
  $("#new-tweet textarea").on("input", function() {
    let $textarea = $(this);
    let charCounter = $textarea.siblings(".counter");
    charCounter.text(140 - $textarea.val().length);

    if (Number(charCounter.text()) < 0) {
      charCounter.attr("id", "overCharLimit");
    } else {
      charCounter.removeAttr("id");
    }
  });
};