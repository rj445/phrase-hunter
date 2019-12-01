let game = null;

// Listen for button click on start game button
$("#btn__reset").on('click', (event) => {
    game = new Game()
    game.startGame();
});

// Listen for button click of keys
$("#qwerty").on("click", "button", (event) => {
    if (game != null) {
        game.handleInteraction(event.target);
    }
});

// Listen for key press on the key board and will use screens button for adding interaction to the game
$(document).on('keyup', (event) => {
    const displayBoardButtons = $("#qwerty").find("button");
    for (let buttonIndex = 0; buttonIndex < displayBoardButtons.length; buttonIndex += 1) {
        if ($(displayBoardButtons[buttonIndex]).text() === String.fromCharCode(event.which).toLowerCase())
            $(displayBoardButtons[buttonIndex]).click();
    };
});