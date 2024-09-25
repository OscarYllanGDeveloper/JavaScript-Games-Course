let currMoleTile;
let currPlantTile;
let score =0;
let gameOver= false;

window.onload = function(){
    setGame();
}

function setGame(){
    // set up the game for the gameboard in html
    for (let i=0; i<9; i++){  // i goes from 0 to 8
        // We just created a tile in the DOC with  js
        // <div id="0-8"></div>

        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click",selectTile);
        document.getElementById("board").appendChild(tile);

        setInterval(setMole,1000); // We are going to call this function every 2000 miliseconds = 1 second
        setInterval(setPlant, 2000); // every 2 seconds


    }
}

function getRandomTile() {
    // math.random gets a number between 1 and 9 nut with floor we get integers (0-8)
    let num = Math.floor(Math.random()*9);
    return num.toString();

}


function setMole() {

    if (gameOver){
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML= "";
    }
    
    let mole= document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currMoleTile.id == num){
        return;
    }
    currMoleTile= document.getElementById(num);
    currMoleTile.appendChild(mole);
}


function setPlant() {
    if (gameOver){
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML ="";

    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currPlantTile && currMoleTile.id == num){
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);


}


function selectTile(){
    if (gameOver){
        return;
    }

    if (this == currMoleTile) {
        score+=10;
        document.getElementById("score").innerText = score.toString(); // update score
    }
    else if (this== currPlantTile){
        document.getElementById("score").innerText= "GAME OVER: " + score.toString();
        gameOver = true;
    }
}