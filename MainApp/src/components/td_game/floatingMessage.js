

export class floatingMessage{
    constructor(value, x, y, size, color){
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;
    }
    update(){
        this.y -= 0.3;
        this.lifeSpan += 1;
        //if(this.opacity > 0.01) this.opacity -= 0.01;
    }
    draw(ctx){
        //ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = this.size + 'Brush Script MT';
        ctx.fillText(this.value, this.x, this.y);
        ctx.globalAplpha = 1;
    }
}

export function handleFloatingMessages(ctx, floatingMessages){
    for(let i = 0; i< floatingMessages.length;i++){
        floatingMessages[i].update();
        floatingMessages[i].draw(ctx);
        if(floatingMessages[i].lifeSpan >= 50){
            floatingMessages.splice(i,1);
            i--;
        }
    }
}