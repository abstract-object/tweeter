$(document).ready(function() {
  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    $.ajax("/tweets/", {
      method: "POST",
      data: $(this).find("textarea").serialize(),
      success: function() {
        console.log("Successful POST");
      }
    });
  });
});