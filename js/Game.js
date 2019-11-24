class Game {
    constructor() {
        this.missed = 0;
        this.phrases = ["This is phrase", "You won", "You lost", "I love javascript", "cloud computing"];
        this.activePhrase = null;
    }

    startGame() {
        $("#overlay").hide();
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

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

    removeLife() {
        $("#scoreboard li:visible:last").hide();
        this.missed += 1;
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    checkForWin() {
        if ($("#phrase").find("li.hide").length > 0) {
            return false;
        }
        return true;
    }

    gameOver(isUserWon) {
        if (isUserWon) {
            $("#game-over-message").text("Congrats! You've won the game");
        }
        else {
            $("#game-over-message").text("Oops! Better luck next time");
        }
        $("#overlay").show();
        this.resetGame();
    }

    resetGame() {
        $("#scoreboard li").show();
        $("#qwerty button").removeClass("chosen");
        $("#qwerty button").removeAttr("disabled");
        $("#qwerty button").removeClass("wrong");
        $("#phrase li").remove();
        this.missed = 0;
        this.activePhrase = null;
    }
}