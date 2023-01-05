export class Cell{
    constructor(x, y,cellSize){
        this.x = x ;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(ctx, mouse, collision){
        if (mouse.x && mouse.y && collision(this,mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
    }
}

export function createGrid(canvas, cellSize, gameGrid) {
    for (let y = cellSize; y < canvas.height; y += cellSize) {
        for (let x = 0; x < canvas.width; x += cellSize) {
            gameGrid.push(new Cell(x, y, cellSize))
        }
    }
}
export function drawGrid( ctx, collision, gameGrid, mouse) {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw(ctx, mouse, collision);
    }
}