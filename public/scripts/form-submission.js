"use strict";

import {loadTweets} from "./app.js";

export const submitForm = () => {
  $("#new-tweet form").on("submit", function(event) {
    let $error = $(this).find("div.error");
    let $msg = $(this).find("textarea");
    let errMsg = "";

    // Stop normal submission and hide error when submitting.
    event.preventDefault();
    $error.hide(50);

    // Set correct error message.
    if ($msg.val().length === 0) {
      errMsg = "You can't submit an empty tweet.";
    } else if ($msg.val().length > 140) {
      errMsg = "Your tweet is too long.";
    }

    // Show error only if there is one, or else if no error:
    $error.text(errMsg);
    if (errMsg) {
      $error.slideDown(50);
    } else {
      // Save message to db, then reload tweets.
      $.ajax("/tweets/", {
        method: "POST",
        data: $msg.serialize(),
        success: function() {
          loadTweets();
        }
      });
      // Finally clear message.
      $msg.val("");
    }
  });
}