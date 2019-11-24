class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // Show all the phrase character
    addPhraseToDisplay() {
        let letterList = $("#phrase ul");
        for (let index = 0; index < this.phrase.length; index++) {
            let letterElement = $(`<li class="${(this.phrase.charAt(index) != ' ' ? 'hide letter ' + this.phrase.charAt(index) : 'space')}">${this.phrase.charAt(index)}</li>`);
            letterList.append(letterElement);
        }
    }

    // Check whether typed character is in the phrase or not
    checkLetter(letter) {
        return this.phrase.includes(letter.toLowerCase());
    }

    // display all the matched character used clicked or typed
    showMatchedLetter(letter) {
        if (this.checkLetter(letter)) {
            $("#phrase ul li").each((index, letterElement) => {
                if ($(letterElement).hasClass(letter)) {
                    $(letterElement).removeClass("hide");
                    $(letterElement).addClass("show");
                }
            });
        }
    }
}