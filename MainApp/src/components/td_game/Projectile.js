import bulletPng from './spritesheets/bullet.png'
const bullet = new Image();
bullet.src = bulletPng;

export class Projectile {
    constructor(x,y, defenderType){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.power = 20; 
        this.speed = 5;

        this.frameX = 0;
        this.minFrame = 0;
        this.maxFrame = 5;
        this.spriteWidth = 31;
        this.spriteHeight = 31;


        if (defenderType === 1){
            this.speed = 5;
            this.power = 20;
        } else if(defenderType === 5){
            this.speed = 15;
            this.power = 100;
        } else if(defenderType === 3){
            this.speed = 35;
            this.power = 8;
        } else if(defenderType === 4){
            this.speed = 30;
            this.power = 8;
        }
        else if(defenderType === 2){
            this.speed = 10;
            this.power = 25;
        }

    }
    update(frame){
        this.x += this.speed;

        if(frame % 2 === 0){
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;

        
            if(this.frameX < 4) this.frameX++;
            else {
                this.minFrame = 5;
                this.frameX++
            }

        }
        

            
        
    }
    draw(ctx){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        //ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        //ctx.fill();
        ctx.drawImage(bullet, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export function handleProjectiles(projectiles,ctx, enemies, collision,canvas, cellSize, frame) {
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update(frame);
        projectiles[i].draw(ctx);

        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize) {
            projectiles.splice(i, 1);
            i--;
        }

    }
}
