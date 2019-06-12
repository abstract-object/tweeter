"use strict";

import {loadTweets} from "./app.js";

export const submitForm = () => {
  $("#new-tweet form").on("submit", function(event) {
    event.preventDefault();
    $(".error").hide(50);

    if ($(this).find("textarea").val().length <= 0) {
        $(".error").text("You can't send an empty tweet.");
        $(".error").slideDown(50);
    } else if ($(this).find("textarea").val().length > 140) {
        $(".error").text("Your message is too long.");
        $(".error").slideDown(50);
    } else {
      $.ajax("/tweets/", {
        method: "POST",
        data: $(this).find("textarea").serialize(),
        success: function() {
          loadTweets();
        }
      });
      $(this).find("textarea").val("");
    }
  });
};