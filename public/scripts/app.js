"use strict";

import {composerCharCounter} from "./composer-char-counter.js";
import {composerToggle} from "./composer-toggle.js";
import {submitForm} from "./form-submission.js";

// Each tweet has a header (avatar, username, and handle),
// main text, and footer (time, flag/retweet/like).
// Everything is contained in an article.
const createTweetElement = (tweetData) => {
  let $tweet = $("<article>");
  let $header = $("<header>");
  let $content = $("<div>").addClass("tweetText")
                           .text(tweetData.content.text);
  let $footer = $("<footer>");
  
  $header.append(`<img src="${tweetData.user.avatars.small}">`);
  $header.append(`<h2>${tweetData.user.name}</h2>`);
  $header.append(`<span>${tweetData.user.handle}</span>`);

  $footer.append(`<span>${$.timeago(tweetData.created_at)}</span>`);
  $footer.append(`<span class="icon">
                  <i class="fa fa-flag"></i> 
                  <i class="fa fa-retweet"></i> 
                  <i class="fa fa-heart"></i></span>`);
  
  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($footer);

  return $tweet;
};

// As the tweets are already sorted by newest after retrieval
// from the database, tweets are prepended to the tweet container.
const renderTweets = (allTweets) => {
  for (let tweet of allTweets) {
    $(createTweetElement(tweet)).prependTo("#tweets");
  };
};

// Retrieve database, then empty the tweet container before rendering.
export const loadTweets = () => {
  $.getJSON("/tweets", (data) => {
    $("#tweets").empty();
    renderTweets(data);
  });
};

// Convenient loading function.
const loadScripts = () => {
  // JQuery timeago plugin
  $("time.timeago").timeago();
  
  loadTweets();
  composerCharCounter();
  composerToggle();
  submitForm();
};

$(document).ready(loadScripts);