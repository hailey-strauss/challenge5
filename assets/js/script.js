// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the HTML.
$(function () {
  // TODO: Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Get the user input from the textarea associated with this button
    var userInput = $(this).siblings(".description").val();

    // Get the id of the parent time-block to use as the key in local storage
    var timeBlockId = $(this).parent().attr("id");

    // Save the user input in local storage with the time block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // TODO: Add code to apply the past, present, or future class to each time block
  // by comparing the id to the current hour.
  function updateHourlyBlocks() {
    var currentHour = dayjs().format("H");

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Call the function to update time-block classes when the page loads
  updateHourlyBlocks();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedUserInput = localStorage.getItem(timeBlockId);

    if (savedUserInput) {
      $(this).find(".description").val(savedUserInput);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
