import React, { useEffect, useRef } from 'react'
import './board.css'
import { createGrid, drawGrid } from "./Cell.js"
import { handleEnemies } from "./Enemy.js"
import { handleProjectiles } from "./Projectile.js"
import { Defender, handleDefenders } from "./Defender.js"
import { floatingMessage, handleFloatingMessages } from "./floatingMessage.js"
import { handleGameStatus, collision, drawNavBar } from "./utilities.js"
import UserContext from "../context/userContext.js";
import { useContext } from 'react';
import { useState } from 'react'


import defender1Png from './spritesheets/defender1logo.png';
import defender2Png from './spritesheets/defender2logo.png';
import defender3Png from './spritesheets/defender3logo.png';
import defender4Png from './spritesheets/defender4logo.png';
import defender5Png from './spritesheets/defender5logo.png';
import backgroundPng from './spritesheets/background.png';
import defenderLockJpg from './spritesheets/defender_lock.png';

const defender1 = new Image();
const defender2 = new Image();
const defender3 = new Image();
const defender4 = new Image();
const defender5 = new Image();
const background = new Image();
const defenderLock = new Image();

defender1.src = defender1Png;
defender2.src = defender2Png;
defender3.src = defender3Png;
defender4.src = defender4Png;
defender5.src = defender5Png;
background.src = backgroundPng;
defenderLock.src = defenderLockJpg;

//УБРАТЬ ШАКАЛЬНУЮ КАРТИНКУ
//УБРАТЬ ШАКАЛЬНУЮ КАРТИНКУ
//УБРАТЬ ШАКАЛЬНУЮ КАРТИНКУ
//УБРАТЬ ШАКАЛЬНУЮ КАРТИНКУ
//УБРАТЬ ШАКАЛЬНУЮ КАРТИНКУ
//УБРАТЬ ШАКАЛЬНУЮ КАРТИНКУ
//УБРАТЬ ШАКАЛЬНУЮ КАРТИНКУ


export const Board = () => {
    const MAIN_URL = "http://localhost:3000";
    const API_URL = "http://localhost:3000";

    let username = localStorage.getItem("user")

    let tower2Unlocked = false;
    let tower3Unlocked = false;
    let tower4Unlocked = false;
    let tower5Unlocked = false;

    const onGameStart = () => {
        console.log("On game start user name: " + username);
        fetch(`http://localhost:8000/users/${username}/towers`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("data");
                console.log(data);
                if (typeof data !== 'undefined' && data.length > 0) {
                    tower2Unlocked = data[0];
                    tower3Unlocked = data[1];
                    tower4Unlocked = data[2];
                    tower5Unlocked = data[3];
                }
            });

    }

    const alertUser = (e) => {
        console.log("PAGE IS REFRESHED")
        e.preventDefault();
        e.returnValue = "";
      };
      
    const onGameOver = (userScore) => {
        let userNickname = username;
        console.log("On game over nickname: " + userNickname)


        const constURL = `http://localhost:8000/users/${userNickname}/score`
        const data = { user_nickname: userNickname, new_score: userScore };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(constURL, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));

    }




    const canvasRef = useRef(null);
    useEffect(() => {
        //////////

        //////////
        if (!window.isScriptLoaded) {
            window.isScriptLoaded = true;
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 900;
            canvas.height = 600;

            let canvasPosition = canvas.getBoundingClientRect();

            //map variables
            const cellSize = 100;
            const cellGap = 3;

            //game status object
            const gameStatus = {
                numberOfResources: 500,
                score: 0,
                enemiesInterval: 600,
                gameOver: false
            }

            let frame = 0;

            //arrays of objects
            const enemyPosition = [];
            const enemies = [];
            const gameGrid = [];
            const defenders = [];
            const projectiles = [];
            const floatingMessages = [];

            //navigation bar
            const controlsBar = {
                width: canvas.width,
                height: cellSize,
            }

            //MOUSE
            const mouse = {
                //possible x:10 y:10
                x: undefined,
                y: undefined,
                width: 0.1,
                height: 0.1,
                clicked: false
            }

            canvas.addEventListener('mousedown', function () {
                mouse.clicked = true;
            });
            canvas.addEventListener('mouseup', function () {
                mouse.clicked = false;
            });


            // Switching between the defenders

            let chosenDefender = 1;


            const card1 = {
                x: 10,
                y: 8,
                width: 70,
                height: 85
            }
            const card2 = {
                x: 90,
                y: 8,
                width: 70,
                height: 85
            }
            const card3 = {
                x: 170,
                y: 8,
                width: 70,
                height: 85
            }
            const card4 = {
                x: 250,
                y: 8,
                width: 70,
                height: 85
            }
            const card5 = {
                x: 330,
                y: 8,
                width: 70,
                height: 85
            }

            function chooseDefender() {


                if (collision(mouse, card1) && mouse.clicked) chosenDefender = 1;
                if (tower2Unlocked) {
                    if (collision(mouse, card2) && mouse.clicked) chosenDefender = 2;
                }
                if (tower3Unlocked) {
                    if (collision(mouse, card3) && mouse.clicked) chosenDefender = 3;
                }
                if (tower4Unlocked) {
                    if (collision(mouse, card4) && mouse.clicked) chosenDefender = 4;
                } if (tower5Unlocked) {
                    if (collision(mouse, card5) && mouse.clicked) chosenDefender = 5;
                }


                if (chosenDefender === 1) ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
                if (chosenDefender === 2) ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
                if (chosenDefender === 3) ctx.strokeRect(card3.x, card3.y, card3.width, card3.height);
                if (chosenDefender === 4) ctx.strokeRect(card4.x, card4.y, card4.width, card4.height);
                if (chosenDefender === 5) ctx.strokeRect(card5.x, card5.y, card5.width, card5.height);

                ctx.lineWidth = 2;
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
                ctx.drawImage(defender1, 0, 0, 115, 115, -3, 0, 95, 95);

                ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
                ctx.drawImage(defender2, 0, 0, 115, 115, 80, -1.5, 93, 93);
                if (!tower2Unlocked) ctx.drawImage(defenderLock, 0, 0, 450, 450, 91, 17, 95, 95);

                ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
                ctx.drawImage(defender3, 0, 0, 115, 115, 163, 2, 90, 90);
                if (!tower3Unlocked) ctx.drawImage(defenderLock, 0, 0, 450, 450, 171, 17, 95, 95);

                ctx.fillRect(card4.x, card4.y, card4.width, card4.height);
                ctx.drawImage(defender4, 0, 0, 115, 115, 241, 2, 90, 90);
                if (!tower4Unlocked) ctx.drawImage(defenderLock, 0, 0, 450, 450, 251, 17, 95, 95);

                ctx.fillRect(card5.x, card5.y, card5.width, card5.height);
                ctx.drawImage(defender5, 0, 0, 115, 115, 320, 2, 90, 90);
                if (!tower5Unlocked) ctx.drawImage(defenderLock, 0, 0, 450, 450, 331, 17, 95, 95);


            }

            // defender prices
            function fillPrices() {
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.fillStyle = 'white';
                ctx.font = '20px Arial';
                ctx.fillText('100', 27, 88);
                ctx.fillText('150', 110, 88);
                ctx.fillText('200', 189, 88);
                ctx.fillText('250', 270, 88);
                ctx.fillText('300', 350, 88);
            }




            //mouse inside canvas window
            canvas.addEventListener('mousemove', function (event) {
                mouse.x = event.x - canvasPosition.left;
                mouse.y = event.y - canvasPosition.top;
            });
            //mouse outside canvas window
            canvas.addEventListener('mouseleave', function (event) {
                mouse.x = undefined;
                mouse.y = undefined;
            });

            window.addEventListener('resize', function () {
                canvasPosition = canvas.getBoundingClientRect();
            })


            //MAIN FUNCTION
            //init
            function init() {
                createGrid(canvas, cellSize, gameGrid);
                if (username != undefined) {
                    let resp = onGameStart();
                }
            }

            canvas.addEventListener('click', function () {
                const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
                const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
                if (gridPositionY < cellSize) return;
                for (let i = 0; i < defenders.length; i++) {
                    if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY)
                        return;
                }
                let defenderCost = 100;
                /*
                if(chosenDefender === 1) defenderCost = 100;
                    if(chosenDefender === 2) defenderCost = 150;
                    if(chosenDefender === 3) defenderCost = 200;
                    if(chosenDefender === 4) defenderCost = 250;
                    if(chosenDefender === 5) defenderCost = 300;
                    */
                if (gameStatus.numberOfResources >= defenderCost + (chosenDefender-1)*50) {
                    if (gameStatus.numberOfResources >= defenderCost) {
                    defenders.push(new Defender(gridPositionX, gridPositionY, cellSize, cellGap, chosenDefender));
                    //gameStatus.numberOfResources -= defenderCost * chosenDefender;
                    gameStatus.numberOfResources -= defenderCost + (chosenDefender-1)*50;
                    
                    //gameStatus.numberOfResources -= defenderCost;
                    
                } else {
                    floatingMessages.push(new floatingMessage('not enough resources', mouse.x, mouse.y, 15, 'black'));
                }
                }
            });


            //Renders level
            function animate() {
                //check for Navigation Timing API support
                if(window.addEventListener("beforeunload", alertUser)){
                    return () => {
                        window.removeEventListener("beforeunload", alertUser);
                    };
                }
                if(window.location.href != `${MAIN_URL}/game`){
                    window.isScriptLoaded = false;
                    onGameOver(0);
                    return;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillStyle = 'blue';
                // ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
                ctx.drawImage(background, 0, 0);
                drawNavBar(ctx, controlsBar);
                drawGrid(ctx, collision, gameGrid, mouse);
                handleDefenders(defenders, ctx, projectiles, enemyPosition, enemies, collision, frame);
                handleProjectiles(projectiles, ctx, enemies, collision, canvas, cellSize, frame);
                handleEnemies(enemies, ctx, gameStatus, enemyPosition, cellSize, cellGap, canvas, frame, floatingMessages);
                handleGameStatus(ctx, gameStatus, onGameOver);
                chooseDefender();
                fillPrices();
                handleFloatingMessages(ctx, floatingMessages);
                frame++;

                if (!gameStatus.gameOver) requestAnimationFrame(animate);
            }

            //execution scenario
            init()
            animate();
        }

    }, [])
    return (<canvas id="canvas" ref={canvasRef} height="600px" width="900px"></canvas>

    );
}

export default Board; 