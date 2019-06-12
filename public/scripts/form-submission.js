"use strict";

import {loadTweets} from "./app.js";

export const submitForm = () => {
  $("#new-tweet form").on("submit", function(event) {
    let $error = $(this).find("div.error");
    let $msg = $(this).find("textarea");
    let errMsg = "";

    // Stop normal submission and hide error when submitting.
    event.preventDefault();
    $error.hide(100);

    // Set correct error message.
    if ($msg.val().length === 0) {
      errMsg = "You can't submit an empty tweet.";
    } else if ($msg.val().length > 140) {
      errMsg = "Your tweet is too long.";
    }

    // Show error only if there is one, or else if no error:
    $error.text(errMsg);
    if (errMsg) {
      $error.slideDown(100);
    } else {
      // Save message to db, then reload tweets.
      $.ajax("/tweets/", {
        method: "POST",
        data: $msg.serialize(),
        success: () => {
          loadTweets();
        }
      });
      // Finally clear message.
      $msg.val("");
      // Manually set counter, because clearing the message this
      // way is not registered as input.
      $msg.siblings(".counter").text(140);
    }
  });
}