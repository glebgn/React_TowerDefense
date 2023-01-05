export function handleGameStatus(ctx, gameStatus, onGameOver) {
    ctx.fillStyle = 'black';
    ctx.font = '40px Brush Script MT';
    ctx.fillText('Resources: ' + gameStatus.numberOfResources, 620, 42);
    ctx.fillText('Score: ' + gameStatus.score, 620, 82);
    if (gameStatus.gameOver) {
        console.log("GAME IS OVER")
        ctx.fillStyle = '#CAC9C9';
        ctx.font = '100px Brush Script MT' ;
        ctx.fillText('GAME OVER', 190, 300);
        ctx.fillText('CREDITS: + ' + gameStatus.score/4, 150, 400);
        window.isScriptLoaded = false;
        onGameOver(gameStatus.score);
    }
}

export function collision(first, second) {
    if (!(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)) {
        return true;
    };
};



//navigation bar draw function
export function drawNavBar(ctx, controlsBar) {
    ctx.fillStyle = '#A7A7A7';
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
}
