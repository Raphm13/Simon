
var arrayOfColors = ["red","blue", "green","yellow"];

var gamePattern = [];
var userPattern = []; 
var start = false;
var level = 0;


function nextSequence(){
  userPattern=[];
  level++;
  $("#level-title").text("level " + level);

    //generate random Number;
  var randomNumber = Math.random() * 4;
  var x = Math.floor(randomNumber);

  var randomChosenColor;
  randomChosenColor =  arrayOfColors[x];
  
  gamePattern.push(randomChosenColor);
  animateColor(randomChosenColor);
  colorSwitch(randomChosenColor);

}

//just add some toggle effect to see what color was randomly affect
function animateColor(color){
  $("#" +color).fadeOut("fast");
  $("#" +color).fadeToggle("fast")
}


//Check if the color is equal to color sound itself
function colorSwitch(color){
  switch(color){
    case "red":
      var audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
      case "blue":
        var audio = new Audio("./sounds/blue.mp3");
        audio.play();
        break;
        case "yellow":
          var audio = new Audio("./sounds/yellow.mp3");
          audio.play();
          break;
          case "green":
            var audio = new Audio("./sounds/green.mp3");
            audio.play();
            break;
    default:  var audio = new Audio("./sounds/wrong.mp3")
    audio.play();
  }
}



$(document).on("keypress" , function(){


  if(!start){
    nextSequence();
    start=true;
  }
  
});

function animatePress(color){
  
  $("#"+color).addClass("pressed");

  setTimeout(function(){
  $("#"+color).removeClass("pressed");
  },100);
  
};

$(".btn").on("click" , function(){
var userChosenColor = this.id;


userPattern.push(userChosenColor)
colorSwitch(userChosenColor);
animatePress(userChosenColor);

checkAnswer(userPattern.length-1);

});


function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userPattern[currentLevel]){
    if(gamePattern.length === userPattern.length){
    setTimeout(function(){
      nextSequence();
    },1000)
  }

}else{
  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}


}

function startOver(){
  level = 0;
  gamePattern = [];
    start = false;
}




