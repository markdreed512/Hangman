var game = {
    wordList: ['spanish inquisition','holy grail','dead parrot','spam', 'lumberjack', ],
    pictureList: ['spanish.jpg','grail.jpg','parrot.jpg','spam.jpg', 'lumberjack.jpg' ],
    insultList: ['\'\'I fart in your general direction\'\'', '\'\'Your mother was a hamster\'\'', '\'\'I blow my nose at you\'\'', '\'\'You empty-headed animal food trough wiper\'\'', '\'\'Your father smelt of elderberries\'\'' ],
    firstKeyPressed: false,
    secondKeyPressed: false,
    index: 0,
    insIndex: 0,
    currentWord: '',
    currentWordAsBlanks: [],
    blanksDisplayed: false,
    // letterGuessedCount: 0,
    lettersGuessed: [],
    guessesRemaining: 6,
    wins: 0,
    userGuess: '',
    loseAGuess: false,
    setup: function(){
        document.getElementById('title-main').innerHTML = '';

        document.getElementById('pic-spot').innerHTML = '';
        document.getElementById('insult').innerHTML = '';
        document.getElementById('instructions').innerText = 'Choose a Letter';
        document.getElementById('chosen-letters').innerText = 'Wrong Guesses: ';
        document.getElementById('guesses-remaining').innerText = 'Guesses Left: '+ this.guessesRemaining;
        document.getElementById('number-of-wins').innerText = 'Wins: ' + this.wins ;
        document.getElementById('win-lose-message').innerText = '';
        this.displayBlanks();
        this.blanksDisplayed = true;
        this.currentWord = this.wordList[this.index];
        this.currentPicture = this.pictureList[this.index]
        this.guessesRemaining = 6;
        this.lettersGuessed = [];
    },
    playGame: function() {//invoked on every key press (except first)
        //check to see if  userGuess is a letter. if not, error message
        //write function to check if userGuess is a letter. return true or false
        if (this.isUserGuessLetter()){
            //if function === false, error message, if true, do the following:
            document.getElementById('pic-spot').innerHTML = "" 
            document.getElementById('guesses-remaining').innerHTML = 'Guesses Left: ' + this.guessesRemaining;
            //set currentWord to this.wordList[this.index] (workaround for currentWord problem)
            this.currentWord = this.wordList[this.index];
            //loop through currentWord string and check each letter
            this.loseAGuess = true;
            for (i = 0; i < this.currentWord.length; i++){
                //check if player chose a correct letter:
                if (this.userGuess === this.currentWord.charAt(i)){                    
                    this.loseAGuess = false;
                    //swap out the "_" for userGuess
                    this.currentWordAsBlanks[i] = this.userGuess.toUpperCase();
                    if (this.currentWordAsBlanks.includes("_") === false){
                        game.handleWin();  
                    }  
                }   
            };
            if (this.loseAGuess === true){//handles wrong guess
                //only run below if userGuess hasn't been previously guessed (to avoid duplicates on guessed list)
                if (this.lettersGuessed.includes(this.userGuess) === false){
                    //str.includes("world", 12)
                    this.guessesRemaining--;
                    document.getElementById('guesses-remaining').innerHTML = "Guesses Left: " + this.guessesRemaining
                    this.lettersGuessed.push(this.userGuess)
                    document.getElementById('chosen-letters').innerHTML += this.userGuess.toUpperCase() +" "
                }
                else{
                    alert('you already chose that letter')
                }   
            } 
            //handles correct guess
            document.getElementById('word-to-guess').innerHTML = "";   
            //renders updated word to screen with any guessed letters showing
            for (i = 0; i < this.currentWordAsBlanks.length; i++){
                document.getElementById('word-to-guess').innerHTML += this.currentWordAsBlanks[i];
                
            }  
            if (this.guessesRemaining === 0){
                this.handleLoss();
            }
        }
        else{
            alert('Please select a letter')
        }
    },
    reset: function(){
        
        this.currentWordAsBlanks = [];
      //  document.getElementById('pic-spot').innerHTML = "";
        this.displayBlanks();
        document.getElementById('win-lose-message').innerHTML = "";
        this.letterGuessedCount = 0;

    },
    displayBlanks: function() {
        document.getElementById('word-to-guess').innerHTML = "";
        var wordLength = this.wordList[this.index].length;
        for (var i = 0; i < wordLength; i++){
//*          //if the letter is a blank, print " ", else print _
            if (this.wordList[this.index].charAt(i) === " "){
                document.getElementById('word-to-guess').innerHTML += " "
                this.currentWordAsBlanks.push(" ");
            }
            else{
            document.getElementById('word-to-guess').innerHTML += "_"
            this.currentWordAsBlanks.push("_");
            }
        }
    },
    handleWin: function() {
        document.getElementById('win-lose-message').innerHTML = "YOU WIN!!!<br>press any key to continue"
        this.wins++;
        document.getElementById('number-of-wins').innerText = 'Wins: ' + this.wins ;
        document.getElementById('instructions').innerText = '';
        document.getElementById('pic-spot').innerHTML = "<img src=\"assets/images/" + this.pictureList[this.index] + "\">" //"<img src=\"" + this.pictureList[this.index] + "\">"
        this.index++;
        this.firstKeyPressed = false;
        document.getElementById('word-to-guess').innerHTML = ""
        this.secondKeyPressed = false;
        this.guessesRemaining = 6;
    
    },
    handleLoss: function(){
        document.getElementById('instructions').innerHTML = "" 

        document.getElementById('win-lose-message').innerHTML = "You Lose:" 
        document.getElementById('insult').innerHTML = this.insultList[this.insIndex] 

        this.index++;
        this.insIndex++;
        //start another round(move on to next word)
        document.getElementById('pic-spot').innerHTML = "<img src=\"assets/images/taunt.gif\">"
        this.firstKeyPressed = false;
        document.getElementById('word-to-guess').innerHTML = ''
        this.secondKeyPressed = false;
        this.guessesRemaining = 6;
    },
    //write function to check if userGuess is a letter. return true or false
    isUserGuessLetter: function(){
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //loop through alphabet
        // if alphabet.includes(this.userGuess.toUpperCase()), return true
        if (alphabet.includes(this.userGuess.toUpperCase())){
            return true
        }
    },

}


//end of game object





document.onkeyup = function (event) {
    game.userGuess = event.key; // Determines which key was pressed.
    if (game.firstKeyPressed === false){
        game.setup();
        game.firstKeyPressed = true;
        
    }
    else{
        //only call reset() if it's the first key of each game (after first key pressed)
        if(game.secondKeyPressed === false){
            game.reset();
        }
        game.secondKeyPressed = true;
        game.playGame();

    }
}