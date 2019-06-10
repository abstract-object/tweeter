$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    let charCounter = $(this).siblings(".counter");
    charCounter.text(140 - $(this).val().length);

    if (Number(charCounter.text()) < 0) {
      charCounter.attr("id", "overCharLimit");
    } else {
      charCounter.removeAttr("id");
    }
  });
});