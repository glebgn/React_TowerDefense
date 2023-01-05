import { floatingMessage } from "./floatingMessage";

import enemy1Png from './spritesheets/enemy1.png';
import enemy2Png from './spritesheets/enemy2.png';
import enemy3Png from './spritesheets/enemy3.png';

import enemy1AttackPng from './spritesheets/ORK1_ATTACK.png';
import enemy2AttackPng from './spritesheets/ORK2_ATTACK.png';
import enemy3AttackPng from './spritesheets/ORK3_ATTACK.png';

import enemy100Png from './spritesheets/hp/100.png';
import enemy80Png from './spritesheets/hp/80.png';
import enemy60Png from './spritesheets/hp/60.png';
import enemy40Png from './spritesheets/hp/40.png';
import enemy20Png from './spritesheets/hp/20.png';

const enemyTypes = [];
const enemyTypesAttacks = [];


const enemy1 = new Image();
const enemy2 = new Image();
const enemy3 = new Image();

const enemy1Attack = new Image();
const enemy2Attack = new Image();
const enemy3Attack = new Image();

const enemy100HP = new Image();
const enemy80HP = new Image();
const enemy60HP = new Image();
const enemy40HP = new Image();
const enemy20HP = new Image();


enemy1.src = enemy1Png;
enemy2.src = enemy2Png;
enemy3.src = enemy3Png;

enemy1Attack.src = enemy1AttackPng;
enemy2Attack.src = enemy2AttackPng;
enemy3Attack.src = enemy3AttackPng;

enemy100HP.src = enemy100Png;
enemy80HP.src = enemy80Png;
enemy60HP.src = enemy60Png;
enemy40HP.src = enemy40Png;
enemy20HP.src = enemy20Png;

enemyTypes.push(enemy1);
enemyTypes.push(enemy2);
enemyTypes.push(enemy3);

enemyTypesAttacks.push(enemy1Attack);
enemyTypesAttacks.push(enemy2Attack);
enemyTypesAttacks.push(enemy3Attack);



export class Enemy{
    constructor(verticalPosition, canvas,cellSize,cellGap ){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.1 + 0.4;
        this.movement = this.speed; 
        this.health = 100;
        this.maxHealth = this.health;
        
        this.isColliding = false;

        // animating enemies textures
        //this.enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        this.enemyType = Math.floor(Math.random() * enemyTypes.length);
        this.enemyTypeImage = enemyTypes[this.enemyType];
        this.enemyTypeAttackImage = enemyTypesAttacks[this.enemyType];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 6;
        //this.spriteWidth = 1485;

        //standard animation
        this.spriteWidth = 1520;
        this.spriteHeight = 1400; //this.spriteHeight = 1200; 
        
        //attack animation
        this.spriteWidthAttack = 0;
        this.spriteHeightAttack = 1500;
        this.frameXAttack = 5;
        if (this.enemyType === 0) {
            this.spriteWidth = 1776;
            this.spriteWidthAttack = 1719;
        } else if (this.enemyType === 1) {
            this.spriteWidth = 1842;
            this.spriteWidthAttack = 1733;
        }
        else if (this.enemyType === 2) {
            this.spriteWidth = 1807;
            this.spriteWidthAttack = 1732;
        }

    }
    update(frame){
        this.x -= this.movement;
        if(frame % 19 === 0){
            if(this.frameX < this.maxFrame) 
                this.frameX++;
            else 
                this.frameX = this.minFrame;
        }
        //if(this.frameX < this.maxFrame) this.frameX++;
         //   else this.frameX = this.minFrame;

    }
    draw(ctx){
        // squares testing 
        //ctx.fillStyle = '#A900C3';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#FF0000';
        ctx.font = '20px Arial';
        
        //ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        if(this.isColliding === false){
            this.maxFrame = 6;
            ctx.drawImage(this.enemyTypeImage, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y + 5, this.width, this.height);
        }
        if(this.isColliding === true){
            this.maxFrame = 4; //5
        
            ctx.drawImage(this.enemyTypeAttackImage, this.frameX * this.spriteWidthAttack, 0, this.spriteWidthAttack, this.spriteHeightAttack, this.x, this.y - 5, this.width, this.height);
        }

        if(this.health > 90){
            ctx.drawImage(enemy100HP, 0, 10, this.spriteWidth, this.spriteHeight, this.x+35, this.y - 5, this.width, this.height);
            //enemy100HP (defender1, 0, 0, 115, 115, -3, 0, 95, 95)
        } else if(this.health >= 70 && this.health <= 90){
            ctx.drawImage(enemy80HP, 0, 10, this.spriteWidth, this.spriteHeight, this.x+35, this.y - 5, this.width, this.height);
        } else if(this.health >= 49 && this.health <= 70){
            ctx.drawImage(enemy60HP, 0, 10, this.spriteWidth, this.spriteHeight, this.x+35, this.y - 5, this.width, this.height);
        } else if(this.health >= 30 && this.health <= 49){
            ctx.drawImage(enemy40HP, 0, 10, this.spriteWidth, this.spriteHeight, this.x+35, this.y - 5, this.width, this.height);
        } else if(this.health >= 10 && this.health <= 30){
            ctx.drawImage(enemy20HP, 0, 10, this.spriteWidth, this.spriteHeight, this.x+35, this.y - 5, this.width, this.height);
        }

        // default number health display
        //ctx.fillText(Math.floor(this.health), this.x + 30, this.y);
        
    }
}

//ENEMY
export function handleEnemies(enemies,ctx, gameStatus, enemyPosition, cellSize, cellGap, canvas, frame, floatingMessages) {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update(frame);
        enemies[i].draw(ctx);
        if (enemies[i].x < 0) {
            gameStatus.gameOver = true;
        }
        if (enemies[i].health <= 0) {
            let gainedResources = enemies[i].maxHealth / 5;
            floatingMessages.push(new floatingMessage("+" + gainedResources, enemies[i].x, enemies[i].y , 10, 'red'));
            gameStatus.numberOfResources += gainedResources;
            gameStatus.score += gainedResources;
            //floatingMessages.push(new floatingMessage("+" + gainedResources, 260, 45 , 10, 'red'));
            const findThisIndex = enemyPosition.indexOf(enemies[i].y);
            enemyPosition.splice(findThisIndex, 1);
            enemies.splice(i, 1);
            i--;
        }
    }
    if (frame % gameStatus.enemiesInterval === 0) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        enemies.push(new Enemy(verticalPosition, canvas, cellSize, cellGap));
        enemyPosition.push(verticalPosition);
        if (gameStatus.enemiesInterval > 100) gameStatus.enemiesInterval -= 50;

    }
}
