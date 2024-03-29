let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext('2d');
let canvasStyle = document.querySelector(".canvas1");
let canvasBorder = getComputedStyle(canvas1);

let start = document.getElementById("start");
let pause = document.getElementById("pause");
let score = document.getElementById("score");

let snake = [];
let size = 10;
let key = "";
let snakeMove;
let oldHead = {};
let pauseState = false;
let startState = false;
let apple = {};
let scoreValue = 0;
let X,Y;
const borderConst=10;

start.addEventListener('click',newGame);
pause.addEventListener('click',pauseGame);

if(pause == false){
    document.addEventListener('keydown',directSnake);
}

function newGame(){
    scoreValue=0;

    if(startState == false){
        start.innerText ='New Game';
        startState=true;
    }
    else{
        //clear everything
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pauseState = false;
        document.addEventListener('keydown',directSnake);
    }
    
    //clear snake
    snake = [];
    
    snake[0]={
        x : canvas.width/2,
        y : canvas.height/2
    };

    // draw new snake
    drawSnake();
    //draw apple
    drawApple();
}

function pauseGame(){

}

function directSnake(e){
    //clear interval
    clearInterval(snakeMove);
    //snake should only move forward direction, not backward 
    //37 -L, 38 -U, 39 -R, 40 -D
    if((key == "U" && e.keyCode !=40) || (key == "D" && e.keyCode !=38) || (key == "L" && e.keyCode !=39) || (key == "R" && e.keyCode !=37) || (key == "")){
        //change direction
        switch(e.keyCode) {
            case 37: key = "L";
                     break;
            case 38: key = "U";
                     break;
            case 39: key = "R";
                     break;
            case 40: key = "D";
                     break;
        }
    }
    snakeMove = setInterval(moveSnake, 100);
}

function drawSnake(){
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle= 'green';
        ctx.fillRect(snake[i].x,snake[i].y,size,size);
    }
}
function drawApple(){
    apple={
        x: Math.round(Math.random() * (parseInt(canvasBorder.width) - borderConst)/10) * 10,
        y: Math.round(Math.random() * (parseInt(canvasBorder.width) - borderConst)/10) * 10
    };
    ctx.fillStyle= 'orange';
    ctx.fillRect(apple.x,apple.y,size,size);

}
function moveSnake(){
    // get the current head values
    X = snake[0].x;
    Y = snake[0].y;

    switch(key){
        case 'U': Y -= size;
                  break;
        case 'D': Y += size;
                  break;
        case 'L': X -= size;
                  break;
        case 'R': X += size;
                  break;
    }

    let head = {
        x: X,
        y: Y
    };

    snake.unshift(head);

    //we need to decided if we need to keep the old head or erase it means apple eaten or not

    if(snake[0].x == apple.x && snake[0].y == apple.y){
        scoreValue++;
        score.innerText = 'Score: ' + scoreValue;
        drawApple();
        drawSnake();
    }
    else{
        oldHead= snake.pop();
        clearOldHead(oldHead);
        drawSnake();
    }
}
function clearOldHead(oldHead){
    ctx.clearRect(oldHead.x, oldHead.y,size,size);
}