import {Projectile} from "./Projectile.js"



import defender1Png from './spritesheets/defender1.png';
import defender2Png from './spritesheets/defender2.png';
import defender3Png from './spritesheets/defender3.png';
import defender4Png from './spritesheets/defender4.png';
import defender5Png from './spritesheets/defender5.png';
//const defenderTypes = [];
const defender1 = new Image();
const defender2 = new Image();
const defender3 = new Image();
const defender4 = new Image();
const defender5= new Image();
defender1.src = defender1Png;
defender2.src = defender2Png;
defender3.src = defender3Png;
defender4.src = defender4Png;
defender5.src = defender5Png;
//defenderTypes.push(defender1);

export class Defender{
    constructor(x,y, cellSize, cellGap, chosenDefender){
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shooting = false;
        this.shootNow = false;
        this.health = 40; //100
        this.projectiles = [];
        this.timer = 0;
        //graphics & animations
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 11;
        this.spriteWidth = 122;
        this.spriteHeight = 111;
        // chosenDefender not available for the class // need a solution // next line is not working
        this.pickedDefender = chosenDefender;
    }
    draw(ctx){
        //ctx.fillStyle = '#5C56AE';
        //ctx.fillRect(this.x,this.y, this.width, this.height);
        ctx.fillStyle = '#030915';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 30, this.y + 52);
        //ctx.drawImage(defender1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        
        //chosenDefender needs to be replaced with this.pickedDefender
        if(this.pickedDefender === 1){
            ctx.drawImage(defender1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        } else if(this.pickedDefender === 2){
            ctx.drawImage(defender2, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        } else if(this.pickedDefender === 3){
            ctx.drawImage(defender3, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        } else if(this.pickedDefender === 4){
            ctx.drawImage(defender4, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        } else if(this.pickedDefender === 5){
            ctx.drawImage(defender5, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }
    update(projectiles, frame){
        //animations
        if(frame % 19 === 0){
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;

            if(this.pickedDefender === 3){
            if(this.frameX === 7 || this.frameX === 6 || this.frameX === 5) this.shootNow = true;
            } else if (this.pickedDefender === 2){
                if(this.frameX === 7) this.shootNow = true;
            } else if(this.pickedDefender === 4){
                if(this.frameX === 7 || this.frameX === 6 || this.frameX === 5 || this.frameX === 8 || this.frameX === 9 || this.frameX === 10 || this.frameX === 11) this.shootNow = true;
                this.maxFrame = 9;
            } else if(this.pickedDefender === 5){
                if(this.frameX === 7) this.shootNow = true;
            } else if(this.pickedDefender === 1){
                if(this.frameX === 7) this.shootNow = true;

            }
        }

        if(this.pickedDefender === 1){
            this.spriteWidth = 122;
            this.spriteHeight = 111;
        } else if(this.pickedDefender === 2){
            this.spriteWidth = 116;
            this.spriteHeight = 117;
        }
        else if(this.pickedDefender === 3){
            this.spriteWidth = 116;
            this.spriteHeight = 117;

        }
        else if(this.pickedDefender === 4){
            this.spriteWidth = 116;
            this.spriteHeight = 117;
        }
        else if(this.pickedDefender === 5){
            this.spriteWidth = 116;
            this.spriteHeight = 117;
        }
        
        
        if(this.shooting){
            this.minFrame = 5;
            this.maxFrame = 11;
        } else{
            this.minFrame = 0;
            this.maxFrame = 4;
        }

  


        if(this.shooting && this.shootNow){
            if(this.pickedDefender === 1)projectiles.push(new Projectile(this.x + 50, this.y + 33, 1));
            if(this.pickedDefender === 2)projectiles.push(new Projectile(this.x + 50, this.y + 33, 2));
            if(this.pickedDefender === 3)projectiles.push(new Projectile(this.x + 50, this.y + 33, 3));
            if(this.pickedDefender === 4)projectiles.push(new Projectile(this.x + 50, this.y + 33, 4));
            if(this.pickedDefender === 5)projectiles.push(new Projectile(this.x + 50, this.y + 33, 5));
            
            
            this.shootNow = false;
        }
        

            // old shooting function: 
           /* this.timer++;
            if(this.timer % 100 === 0){
                projectiles.push(new Projectile(this.x + 100, this.y + 50));
            }
        } else {
            this.timer = 0;
        } */
        
    }
}

export function handleDefenders(defenders, ctx, projectiles, enemyPosition, enemies, collision, frame ) {
    for (let i = 0; i < defenders.length; i++) {
        defenders[i].draw(ctx);
        defenders[i].update(projectiles, frame);
        if (enemyPosition.indexOf(defenders[i].y) !== -1) { // !== -1
            defenders[i].shooting = true;
        } else {
            defenders[i].shooting = false;
        }

        for (let j = 0; j < enemies.length; j++) {
            if (defenders[i] && collision(defenders[i], enemies[j])) {
                enemies[j].movement = 0;
                defenders[i].health -= 0.2;
                enemies[j].isColliding = true;
            }
            if (defenders[i] && defenders[i].health <= 0) {
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
                enemies[j].isColliding = false;
            }
        }
    }
}