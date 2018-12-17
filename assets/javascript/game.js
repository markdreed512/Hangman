// var wrongGuesses = 0;
// var guessesRemaining = 0;
// var wins = 0;
// var wordList = ['spam', 'camelot', 'parrot'];
// var index = 0;


// function displayWordAsBlanks() {
//     var currentWord = wordList[index];
//     if(index === wordList.length){
//         alert('end of list')
//     }
//     //find length of currentWord;
//     //loop that many times and print _ each loop
//     document.getElementById('word-to-guess').innerHTML = "";
//     for (i = 0; i < currentWord.length; i++){
//         //add a "_" to the current text (#word-to-guess) on screen
//         document.getElementById('word-to-guess').innerHTML += '_  ';
//     }
//     index++;   
// }
// function displayChosenLetters() {
//     document.getElementById('chosen-letters').innerHTML += userGuess;
// }

// // This function is run whenever the user presses the first key.
// if (it's the first key pressed){
//     run setup
// }
// else {
//     run playGame
// }
//document.onkeyup = function setup(event) {
//     var userGuess = event.key; // Determines which key was pressed.
    
    

    
    
//     displayWordAsBlanks();
//     displayChosenLetters();







// }

var game = {
    message: 'Press any Key to Start',
    wordList: ['spam', 'grail', 'parrot'],
    currentWord: '',
    chosenLetters: [],
    wrongGuesses: 0,
    guessesRemaining: 10,
    numberOfWins: 0,
    userGuess: '',
    firstKeyPressed: false,
    index: 0,
    setup: function(){
        document.getElementById('instructions').innerText = 'Choose a Letter';
        document.getElementById('chosen-letters').innerText = 'Choosen Letters: ';
        document.getElementById('wrong-guesses').innerText = 'Number of Wrong Guesses: ';
        document.getElementById('guesses-remaining').innerText = 'Number of Guesses Remaining: ';
        document.getElementById('number-of-wins').innerText = 'Wins: ';
        this.displayWordAsBlanks();
    },
    playGame: function(){
        this.displayChosenLetters();
    },
    displayWordAsBlanks: function(){
        //choose next word
        this.currentWord = this.wordList[this.index];
        if(this.index === this.wordList.length){
            alert('end of list')
        }
        //find length of currentWord;
        //loop that many times and print _ each loop
        document.getElementById('word-to-guess').innerHTML = "";
        for (i = 0; i < this.currentWord.length; i++){
            //add a "_" to the current text (#word-to-guess) on screen
            document.getElementById('word-to-guess').innerHTML += '_  ';
        }
        this.index++;   
    },
    displayChosenLetters: function(){
        this.chosenLetters.push(this.userGuess);
        document.getElementById('chosen-letters').innerText += this.userGuess;
    },
    
}

document.onkeyup = function (event) {
    game.userGuess = event.key; // Determines which key was pressed.
    if (game.firstKeyPressed === false){
        game.setup();
        game.firstKeyPressed = true;
    }
    else{
        game.playGame();

    }
}


