"use strict";

// Show/hide composer and focus on textarea.
export const composerToggle = () => {
  $("#nav-bar button").on("click", function() {
    $("#new-tweet").slideToggle("fast");
    $("#new-tweet textarea").focus();
  });
};