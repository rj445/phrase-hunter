let game = new Game();

$("#btn__reset").on('click', (event) => {
    game.startGame();
});

$("#qwerty").on("click", "button", (event) => {
    game.handleInteraction(event.target);
});

$(document).on('keyup', (event) => {
    const displayBoardButtons = $("#qwerty").find("button");
    for (let buttonIndex = 0; buttonIndex < displayBoardButtons.length; buttonIndex += 1) {
        if ($(displayBoardButtons[buttonIndex]).text() === String.fromCharCode(event.which).toLowerCase())
            $(displayBoardButtons[buttonIndex]).click();
    };
});