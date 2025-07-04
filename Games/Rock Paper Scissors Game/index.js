// when page refresh 
displayResult("you","computer","Choose Move ")

function displayResult(playerMove,computerMove,msg){
    document.querySelector('.js-playerMove').innerHTML = 
                        `<img class="icon-sm" src="images/${playerMove}-emoji.png" 
                        alt="${playerMove.toUpperCase()}"></img>`;
    document.querySelector('.js-computerMove').innerHTML = 
                        `<img class="icon-sm" src="images/${computerMove}-emoji.png" 
                        alt="${computerMove.toUpperCase()}"></img>`;
    document.querySelector('.js-resultMsg').innerHTML = 
                        `${msg}`;
    displayScore();
    
}

function displayScore(){
    const score = getScore();
    document.querySelector('.js-wins').innerHTML = 
                        `${score.wins}`;
    
    document.querySelector('.js-losses').innerHTML = 
                        `${score.losses}`;
                        
    document.querySelector('.js-ties').innerHTML = 
                        `${score.ties}`;
}


function getScore(){
    return JSON.parse(localStorage.getItem('score')) || {wins:0,losses:0,ties:0};   
}

function play(playermove){
    const playerMove = playermove;
    const computerMove = computerPlay();
    const msg = gameResult(playerMove,computerMove);

    displayResult(playerMove,computerMove,msg);
    // console.log(playerMove,computerMove,msg);
}

function computerPlay(){
    let computerMove = '';
    const rand = Math.random();
    if (0 <= rand && rand < 1/3){
        computerMove = "rock"
    }
    else if (1/3 <= rand && rand < 2/3){
        computerMove = "paper"
    }
    else{
        computerMove = "scissors"
    }
    return computerMove;
}

function gameResult(playerMove,computerMove){
    const score = getScore();
    let msg = '';
    if (playerMove === computerMove){
        msg = "It's a Tie !!!";
        score.ties += 1;
    }
    else{
        const winCondition = {rock:"scissors",paper:"rock",scissors:"paper"}
        if(winCondition[playerMove] === computerMove){
            msg = "You won!!!";
            score.wins += 1;
        }
        else{
            msg = "You Lost!!!";
            score.losses += 1;
        }
    }
    localStorage.setItem('score', JSON.stringify(score));
    return msg;
}

function resetGame(){
    localStorage.removeItem('score');   
    displayResult("you","computer","Choose Move");
}
