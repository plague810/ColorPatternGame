var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var gameLevel = 0;

$(document).keypress(function() {
    if(started == false){
        started = true;
        setTimeout(function () {
            nextSequence();
        }, 150);
        
    }
});

$(".btn").click(function(){
    if(started){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        $('#' + userChosenColour).fadeOut(100).fadeIn(100);
        animatePress(userChosenColour);
        checkAnswer();
    }
});

function nextSequence(){
    gameLevel++;
    $("#level-title").text("Level " + gameLevel);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

function playSound(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(function() {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(){
    var currentIndex = userClickedPattern.length;
    var patternLength = gamePattern.length;
    if(userClickedPattern[currentIndex - 1] == gamePattern[currentIndex - 1]){
        console.log("correct");
        if(currentIndex == patternLength){
            setTimeout(function () {
                nextSequence();
            }, 900);
        }
    } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            startOver();
        },200);
    }
}

function startOver() {
    gameLevel = 0;
    started = false;
    gamePattern = [];
}