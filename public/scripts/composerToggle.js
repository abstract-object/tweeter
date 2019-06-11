"use strict";

export const composerToggle = () => {
  $("#nav-bar button").on("click", function() {
      if ($("#new-tweet").offset().top - $(document).scrollTop() < 0) {
        $("html, body").animate({
          scrollTop: ($("#new-tweet").offset().top - 140)
        }, 100);
        $("#new-tweet textarea").focus();
      } else {
        $("html, body").animate({
        scrollTop: ($("#tweets").offset().top - 140)
        }, 100);
      }
    });
};