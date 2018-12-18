

var game = {
    message: 'Press any Key to Start',
    wordList: ['spam', 'grail', 'parrot'],
    currentWord: "",
    currentWordArray: [],
    currentWordArrayAsString: "",
    displayedBlanks: [],
    chosenLetters: [],
    wrongGuesses: 0,
    guessesRemaining: 10,
    numberOfWins: 0,
    userGuess: '',
    firstKeyPressed: false,
    index: 0,
    solvedLetters: 0,
    setup: function(){
        document.getElementById('instructions').innerText = 'Choose a Letter';
        document.getElementById('chosen-letters').innerText = 'Choosen Letters: ';
        document.getElementById('wrong-guesses').innerText = 'Number of Wrong Guesses: ';
        document.getElementById('guesses-remaining').innerText = 'Number of Guesses Remaining: ';
        document.getElementById('number-of-wins').innerText = 'Wins: ';
        this.displayWordAsBlanks();
    },
    displayWordAsBlanks: function(){
        //choose next word
         this.currentWord = this.wordList[this.index];
        //iterate through currentWord, push each letter to currentWordArray 
        // for (i = 0; i < this.currentWord.length; i++){
        //     console.log('in blanks loop')
        //     //slice letter and add to array-done
        //     var slicedLetter = this.currentWord.slice(i, i + 1);
        //     //push slicedLetter to array-done
        //     this.currentWordArray.push(slicedLetter);
        // }  **don't think above is necessary

        if(this.index === this.wordList.length){
            alert('end of list')
        }
        //find length of currentWord;
        //loop that many times and print _ each loop
        document.getElementById('word-to-guess').innerHTML = "";
        for (i = 0; i < this.currentWord.length; i++){
            //add a "_" to the current text (#word-to-guess) on screen
            document.getElementById('word-to-guess').innerHTML += '_  ';
            //add "_ " to array
            this.currentWordArray.push("_ " );
        }
        this.index++;   
    },
    playGame: function(){
        //if solvedLetters === length of word, win screen then start new game
        if (this.solvedLetters === this.currentWord.length){
            alert('You win!!')
            this.index++; //will increment index of word in wordList array
            //start new game
        }
        else{
        this.displayWordAsBlanks();
        this.displayUnsolvedWord();
        this.displayChosenLetters();  
        }
    },
    
    displayChosenLetters: function(){
        this.chosenLetters.push(this.userGuess);
        document.getElementById('chosen-letters').innerText += this.userGuess;
    },
    displayUnsolvedWord: function() {
        this.currentWord = wordList[i];
        //iterate over currentWord and check if each letter matches userGuess
        for (var i = 0; i < this.currentWord.length; i++) {
            //if it matches, 
            if (this.currentWord.charAt(i) === this.userGuess){
                //replace currentWordArray[i] with userGuess- done
                this.currentWordArray[i] = this.userGuess;  
                solvedLetters++;//to be used to compare to length of word
            }
            else if(this.currentWord.charAt(i) === "_ "){
                this.currentWordArray[i] = "_ "
            }
                //*** */display no match, wrongGuesses++, guessesRemaining--, ***
            
        }
        //convert each item in array to letter in string
        this.currentWordArrayAsString = this.currentWordArray.join('');
        document.getElementById('word-to-guess').innerHTML = this.currentWordArrayAsString;
        this.guessesRemaining--;

    }   
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


