const computerChoiceDisplay= document.getElementById('computer-choice');
const userChoiceDisplay= document.getElementById('user-choice');
const resultDisplay= document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click',(e) =>{
    userChoice= e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    gettingResult();
}))

function generateComputerChoice(){
    const randomNumber = Math.floor(Math.random()*3)+1; // or you can use possibleChoices.length
    

    if (randomNumber===1) {
        computerChoice='rock';
    }

    if (randomNumber===2) {
        computerChoice='scissors';
    }

    if (randomNumber===3) {
        computerChoice='paper';
    }


    computerChoiceDisplay.innerHTML = computerChoice;
}


function gettingResult() {
    if (computerChoice===userChoice){
        result = "it's a draw";
    }

    if (computerChoice=== 'rock' && userChoice=== 'paper'){
        result = "User won";
    }

    if (computerChoice=== 'rock' && userChoice=== 'scissors'){
        result = "Computer won";

    }

    if (computerChoice=== 'paper' && userChoice=== 'scissors'){
        result = "User won";
    }

    if (computerChoice=== 'paper' && userChoice=== 'rock'){
        result = "Computer won";
    }

    if (computerChoice=== 'scissors' && userChoice=== 'paper'){
        result = "Computer won";
    }

    if (computerChoice=== 'scissors' && userChoice=== 'rock'){
        result = "User won";
    }

    resultDisplay.innerHTML = result;
}