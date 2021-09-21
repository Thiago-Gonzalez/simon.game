//Creates a variable that indicates whether the game started or not
var gameHasStarted = false;

//Function that toggles title's fade animation
function titleAnimation () {
  $("#level-title").fadeIn().fadeOut().fadeIn();
}


//Creates a variable to store the current game level, starting at level 0
var level = 0;

//Creates a list of colors
var buttonColors = ["red", "blue", "green", "yellow"];

//Creates an empty list to store colors of sequence
var gamePattern = [];

//Creates an empty list to store clicked button's color
var userClickedPattern = [];

//Function that plays the corresponding button sound
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

//Function that adds animation to buttons (when clicked by the user)
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Detects the clicked button and adds its id to the end of the list userClickedPattern and sound functionality
$(".btn").on("click", function() {
  //Saves the id value corresponding to the clicked button
  var userChosenColor = $(this).attr("id");

  //Adds it to the end of userClickedPattern list
  userClickedPattern.push(userChosenColor);

  //Adds animation when user clicks on button
  animatePress(userChosenColor);

  //Plays the corresponding button sound
  playSound(userChosenColor);

  //Checks if user's response matches
  checkAnswer(userClickedPattern.length-1);
});

//Function that adds the next color to the sequence and shows the user the next color in the sequence
function nextSequence() {
  //Removes title animation
  clearInterval(titleInterval);

  //Empty the list of buttons clicked by the user
  userClickedPattern = [];

  //Updates h1's text to show the current level
  $("#level-title").text("Level " + level);

  //Generates a random number 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  //Generates a random color
  var randomChosenColor = buttonColors[randomNumber];

  //Adds the random color to the end of gamePattern list
  gamePattern.push(randomChosenColor);


  //Shows the next sequence's color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Plays the corresponding button sound
  playSound(randomChosenColor);
  level++;
}

function startOver () {
  level = 0;
  gamePattern = [];
  gameHasStarted = false;
}

//Function that checks if user's clicked buttons list correponds to the correct sequence
function checkAnswer (currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, Press Any Key to Restart");
    startOver();

  }

}

//Adds animation to "Press A Key to Start" title if game has not started
var titleInterval = setInterval(titleAnimation, 1000);
if (!gameHasStarted) {
  titleInterval;
}

//Starts the game if any key pressed and game has not started
$(document).on("keypress", function () {
  if (!gameHasStarted) {
    nextSequence();
    gameHasStarted = true;
  }
})
