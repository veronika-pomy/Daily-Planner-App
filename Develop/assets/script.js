// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Vars to store html els and attributes.
  var saveButtonEls = $(".saveBtn"); // grab all buttons
  var textEls = $(".description"); // grab all textareas

  // A listener for click events on the save button.
  // Use the id in the containing time-block as a key to save the user input in
  // local storage. 
  saveButtonEls.on("click", function (){
    var timeBlockIdEL = this.parentNode.id;
    var getTextInput = $(`#${timeBlockIdEL}`);
    var userInput = getTextInput.children(".description").val();
    localStorage.setItem(timeBlockIdEL, userInput);
  });

  // Get ids for time block els
  var textInputIdArr = []; // an array to store ids for time block els
  for (var index = 0; index < textEls.length; index++) {
    textInputIdArr.push(textEls[index].parentNode.id);
  };

  // Get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  for (var i = 0; i < textInputIdArr.length; i++) {
    var input = localStorage.getItem(`${textInputIdArr[i]}`);
    $(`#${textInputIdArr[i]}`).children(".description").val(input);
  };

  // Apply the past, present, or future class to each time block
  // Get current hour in 24-hr format using dayjs
    var currTime = Number(dayjs().format('H'));

    for (var j = 0; j < textEls.length; j++) {
      // Grab time from each time block id el
      var compareTime  = Number(textEls[j].parentNode.id.split("-")[1]);
      if (compareTime < currTime) {
        $(`#${textInputIdArr[j]}`).addClass("past");
      } else if (compareTime > currTime) {
        $(`#${textInputIdArr[j]}`).addClass("future");
      } else {
        $(`#${textInputIdArr[j]}`).addClass("present");
      }
    };

  // Display current date in the header of the page
  var today = dayjs();
  $("#currentDay").text(today.format('dddd, MMMM D'));
});
