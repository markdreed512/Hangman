var game = {
    wordList: ['parrot','spam', 'grail'],
    firstKeyPressed: false,
    index: 0,
    currentWord: '',//why can't i set this to this.wordList[this.index]?
    currentWordAsBlanks: [],
    blanksDisplayed: false,
    letterGuessedCount: 0,
    lettersGuessed: [],
    guessesRemaining: 6,
    wins: 0,
    userGuess: '',
    setup: function(){
        document.getElementById('instructions').innerText = 'Choose a Letter';
        document.getElementById('chosen-letters').innerText = 'Choosen Letters: ';
        document.getElementById('wrong-guesses').innerText = 'Number of Wrong Guesses: ';
        document.getElementById('guesses-remaining').innerText = 'Number of Guesses Remaining: ';
        document.getElementById('number-of-wins').innerText = 'Wins: ';
        this.displayBlanks();
        this.blanksDisplayed = true;
        this.currentWord = this.wordList[this.index];
    },
    playGame: function() {//invoked on every key press (except first)
        //add letter to lettersGuessed array

        //set currentWord to this.wordList[this.index] (workaround for currentWord problem)
        this.currentWord = this.wordList[this.index];
        //loop through currentWord string and check each letter
        for (i = 0; i < this.currentWord.length; i++){
            //check if userGuess === a letter in this.currentWord:
            if (this.userGuess === this.currentWord.charAt(i)){
                //swap out the _ for userGuess
                this.currentWordAsBlanks[i] = this.userGuess.toUpperCase();
                this.letterGuessedCount++
                //handle win if statement goes here
                if (game.letterGuessedCount === game.currentWord.length){
                    game.handleWin();  
                }
            }
        }
        document.getElementById('word-to-guess').innerHTML = "";
        //display all strings in currentWordAsBlanks in #word-to-guess
        for (i = 0; i < this.currentWordAsBlanks.length; i++){
            console.log('in currentWordAsBlanks loop ' );
            document.getElementById('word-to-guess').innerHTML += this.currentWordAsBlanks[i];

        }  
      
        
    },
    displayBlanks: function() {
        var wordLength = this.wordList[this.index].length;
        console.log('wordlength: ' + wordLength)
        for (var i = 0; i < wordLength; i++){
            console.log('in displayBlanks Loop')
            document.getElementById('word-to-guess').innerHTML += "_"
            this.currentWordAsBlanks.push("_");
        }
    },
    handleWin: function() {
        //display "you win!!"
        document.getElementById('win-lose-message').innerHTML = "YOU WIN!!!<br>press any key to continue"
        this.wins++;
        this.index++;
        //start another round(move on to next word)
        console.log('in handleWin function');
        this.firstKeyPressed = false
        document.getElementById('word-to-guess').innerHTML = ""
    }
}

//end of game object





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