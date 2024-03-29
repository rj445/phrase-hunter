class Game {
    constructor() {
        this.missed = 0;
        this.phrases = ["This is phrase", "You won", "You lost", "I love javascript", "cloud computing"];
        this.activePhrase = null;
    }

    // Start the game by using new phrase
    startGame() {
        $("#overlay").removeClass("win");
        $("#overlay").removeClass("lose");
        $("#overlay").hide();
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }

    // Get random phrase
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    // Handle interaction with game using button
    handleInteraction(button) {
        let guessedLetter = $(button).text();
        $(button).attr("disabled", true);
        if (this.activePhrase.checkLetter(guessedLetter)) {
            $(button).addClass("chosen");
            this.activePhrase.showMatchedLetter(guessedLetter);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            $(button).addClass("wrong");
            this.removeLife();
        }
    }

    // Remove the last heart(i.e. life) 
    removeLife() {
        let hearts = $("#scoreboard li");
        this.missed += 1;
        for (let heartIndex = 4; heartIndex >= (hearts.length - this.missed); heartIndex -= 1) {
            $(hearts[heartIndex]).children("img").attr("src", "images/lostHeart.png");
        }
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    // Check for win based on the hide class existance in li element of phrase
    checkForWin() {
        if ($("#phrase").find("li.hide").length > 0) {
            return false;
        }
        return true;
    }

    // This function will show proper message based on the boolean value passed
    // If passed parameter is true than user won the game else user lost the game
    gameOver(isUserWon) {
        if (isUserWon) {
            $("#game-over-message").text("Congrats! You've won the game");
            $("#overlay").addClass("win");
        }
        else {
            $("#game-over-message").text("Oops! Better luck next time");
            $("#overlay").addClass("lose");
        }
        this.resetGame();
    }

    // This function will reset the game
    // It will remove all the phrase character, reset missed count and make active phrase null
    resetGame() {
        $("#scoreboard li").show();
        $("#qwerty button").removeClass("chosen");
        $("#qwerty button").removeAttr("disabled");
        $("#qwerty button").removeClass("wrong");
        $("#phrase li").remove();
        let hearts = $("#scoreboard li");
        for (let heartIndex = 4; heartIndex >= 0; heartIndex -= 1) {
            $(hearts[heartIndex]).children("img").attr("src", "images/liveHeart.png");
        }
        $("#overlay").show();
        this.missed = 0;
        this.activePhrase = null;
    }
}