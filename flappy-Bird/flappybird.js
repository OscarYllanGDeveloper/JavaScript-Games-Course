// Code for Making a FlappyBird Type of game 
// It's useful for racticing some general programming concepts and VideoGame design

//board

let board;
let boardWidth= 360;
let boardHeight = 640;
let context;


//bird
let birdWidth= 34;  // width/height ratio = 408/228 17/12
let birdHeight = 24; 
let birdX= boardWidth/8;
let birdY= boardHeight/2
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}


//pipes
let pipeArray= []
let pipeWidth = 64;   // width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX= boardWidth;
let pipeY = 0;



let topPipeImg;
let bottomPipeImg;


// physics
let velocityX = -2; // pipes moving left speed
let velocityY=0 ;  // bird jump speed
let gravity = 0.4;


let gameOver= false;
let score=0;




window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // This used for drawing in the board

    // Draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x,bird.y,bird.width,bird.height);

    // load images
    birdImg = new Image();
    birdImg.src= "./flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);

    }

    topPipeImg = new Image();
    topPipeImg.src= "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src= "./bottompipe.png";



    // bottomPipeImg = new Image

    requestAnimationFrame(update);
    setInterval(placePipes,1500);   // every 1.5 seconds we are going to call this function
    document.addEventListener("keydown",moveBird);

}


function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0,0,board.width, board.height);

    // bird
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y= Math.max(bird.y+velocityY,0); // apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);


    if (bird.y > board.height){
        gameOver= true;

    }

    //pipes
    for (let i=0; i<pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x +=  velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);

        if (!pipe.passed && bird.x> pipe.x +pipe.width){
            score +=0.5;  // 0.5 because there are two pipes! so 0.5*2 =1, 1 for each set of pipes
            pipe.passed= true;
        }

        if (detecCollision(bird,pipe)) {
            gameOver = true;

        }

    }

    //clear pipes
    while (pipeArray.length >0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift(); // removes first elemnt: from the array

    }



    // score
    context.fillStyle = "white";
    context.font= "45px sans-serif";
    context.fillText(score,5,45);

    if (gameOver){
        context.fillText("GAME OVER",5,90);
    }


}


function placePipes(){
    if (gameOver){
        return;
    }

    // (0-1) * pipeHeight/2
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 -256 (pipeHeight/4 - pipeHeight/2) = -3/$ pipeHeight
    let randomPipeY = pipeY- pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = boardHeight/4;


    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);


    let bottomPipe= {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);
}


function moveBird(e){
    if (e.code=="Space" || e.code == "ArrowUp" || e.code== "KeyX"){
        // jump 
        velocityY= -6;

        // reset game 
        if (gameOver && e.code=="Space"){
            bird.y= birdY;
            pipeArray= [];
            score=0;
            gameOver= false;
        }

    }

}


function detecCollision(a,b){
    return a.x < b.x + b.width && 
            a.x + a.width > b.x && 
            a.y < b.y + b.height &&
            a.y + a.height > b.y;

}
