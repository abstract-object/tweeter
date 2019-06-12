"use strict";

export const composerToggle = () => {
  $("#nav-bar button").on("click", function() {
    $("#new-tweet").slideToggle("fast");
    $("#new-tweet textarea").focus();
  });
};