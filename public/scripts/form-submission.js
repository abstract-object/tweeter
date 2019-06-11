"use strict";

import {loadTweets} from "./app.js";

export const submitForm = () => {
  $("#new-tweet form").on("submit", function(event) {
    event.preventDefault();
    if ($(this).find("textarea").val().length <= 0) {
      alert("Please enter a message.");
    } else if ($(this).find("textarea").val().length > 140) {
      alert("Your message is too long.");
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