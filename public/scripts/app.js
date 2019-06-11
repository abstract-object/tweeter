/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadTweets = () => {
  $.getJSON( "/tweets", (data) => {
    renderTweets(data);
  });
};

const createTweetElement = (tweetData) => {
  let $tweet = $("<article>");
  let $header = $("<header>");
  let $content = $("<div>").addClass("tweetText").text(tweetData.content.text);
  let $footer = $("<footer>");

  $header.append(`<img src="${tweetData.user.avatars.small}">`);
  $header.append(`<h2>${tweetData.user.name}</h2>`);
  $header.append(`<span>${tweetData.user.handle}</span>`);
  $footer.append(`<span>${new Date() - tweetData.created_at}</span>`);
  $footer.append(`<span class="icon"></span>`);
  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($footer);
  return $tweet;
};

const renderTweets = (allTweets) => {
  for (let tweet of allTweets) {
    $(createTweetElement(tweet)).appendTo("#tweets");
  }
};

$(document).ready(() => {
  loadTweets();
});