/*jshint esversion: 6 */
let gamePattern = [];
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
let level = 0;

$('.btn').click(function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
   
    playSound(userChosenColor);
    animatedPress(userChosenColor);
    if (userClickedPattern.length === gamePattern.length) {
          checkAnswer();
    }
});

const playSound = (name) => {
    let randomChosenSound = new Audio(`sounds/${name}.mp3`);
    randomChosenSound.play();

};

const animatedPress = (currentColor) => {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
};

const nextSequence = () => {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatedPress(randomChosenColor);
    level++;
    $('h1').text(`Level ${level}`);
};

$('.start-game').on('click', ()=> {
    gamePattern = [];
    $('body').removeClass('game-over');
    nextSequence();
    $('h1').text(`Level ${level}`);
    $('.start-game').prop('disabled', true);
    $('.start-game').text('Good Luck');
});




const checkAnswer = () => {
    userClickedPattern.toString() === gamePattern.toString() ? setTimeout(() => {nextSequence()}, 1000)  : gameOver();
}

const gameOver = () => {
    $('body').addClass('game-over');
    $('h1').html(`Wrong. Press Start To Re-try`);
    gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.play();
    level = 0;
    $('.start-game').prop('disabled', false);
    $('.start-game').text('Start');
}