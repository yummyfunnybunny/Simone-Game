var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



// BEGIN NEW SEQUENCE
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
})

// SEQUENCE BUILDING PATTERN
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// USER CLICKED PATTERN
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

// PLAY AUDIO
function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// BUTTON ANIMATIONS
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

// CHECK ANSWERS
function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  console.log("success!");
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    },1000);
  }
} else {
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

// START OVER
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
