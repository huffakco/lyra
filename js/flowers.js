
var gameWidth = 800;
var gameHeight = 600;
var primaryCard = $("#primary-card");

loadGame();

function loadGame() {
    var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'primary-card', null, true);
    game.state.add('Game', Game);
    game.state.start('Game');
}