"use strict";

import {composerCharCounter} from "./composer-char-counter.js";
import {composerToggle} from "./composer-toggle.js";
import {submitForm} from "./form-submission.js";

const createTweetElement = (tweetData) => {
  let $tweet = $("<article>");
  let $header = $("<header>");
  let $content = $("<div>").addClass("tweetText").text(tweetData.content.text);
  let $footer = $("<footer>");
  
  $header.append(`<img src="${tweetData.user.avatars.small}">`);
  $header.append(`<h2>${tweetData.user.name}</h2>`);
  $header.append(`<span>${tweetData.user.handle}</span>`);
  $footer.append(`<span>${new Date() - tweetData.created_at}</span>`);
  $footer.append(`<span class="icon"><img src="/images/icons.png"></span>`);
  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($footer);
  return $tweet;
};
  
const renderTweets = (allTweets) => {
  for (let tweet of allTweets.reverse()) {
    $(createTweetElement(tweet)).appendTo("#tweets");
  };
};

export const loadTweets = () => {
  $.getJSON("/tweets", (data) => {
    $("#tweets").empty();
    renderTweets(data);
  });
};

const loadScripts = () => {
  loadTweets();
  composerCharCounter();
  composerToggle();
  submitForm();
};

$(document).ready(loadScripts);