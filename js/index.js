const sprites = new Image();
sprites.src = '../images/sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 300,
    x: 0,
    y: canvas.height - 112,

    init(){
        ctx.drawImage(
            sprites, 
            floor.spriteX, floor.spriteY, 
            floor.width, floor.height, 
            floor.x, floor.y,
            floor.width, floor.height, 
        ),
        ctx.drawImage(
            sprites, 
            floor.spriteX, floor.spriteY, 
            floor.width, floor.height, 
            (floor.x + floor.width), floor.y,
            floor.width, floor.height, 
        );
    },
 

}

const flappyBird = { 
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    gravity: 0.25,
    speed: 0,

    currentPosition () {
        flappyBird.speed = flappyBird.speed + flappyBird.gravity;
        flappyBird.y = flappyBird.y + flappyBird.speed;

    },


    init(){
        ctx.drawImage(
            sprites, 
            flappyBird.spriteX, flappyBird.spriteY, 
            flappyBird.width, flappyBird.height, 
            flappyBird.x, flappyBird.y,
            flappyBird.width, flappyBird.height,

        );
    }

}

const mesagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    width: 174,
    height: 152,
    x: (canvas.width / 2 ) - 174 / 2,
    y: 58,

    start() {
        ctx.drawImage(
            sprites,
            mesagemGetReady.spriteX, mesagemGetReady.spriteY, 
            mesagemGetReady.width, mesagemGetReady.height, 
            mesagemGetReady.x, mesagemGetReady.y,
            mesagemGetReady.width, mesagemGetReady.height,
        )
    }
}

let current = {}
function changeStage (newStage) {
    current = newStage
}

const stage = {
    START: {
        startGame() {
            background.init();
            floor.init();
            flappyBird.init();
            mesagemGetReady.start();
        },
        click () {
            changeStage(stage.GAME)
        },
        updateGame() {

        }
    }

}

stage.GAME ={
    startGame() {
        background.init();
        floor.init();
        flappyBird.init();
    },
    updateGame() {
        flappyBird.currentPosition();
    }
}

const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height -204,

    init(){
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0,0, canvas.width, canvas.height)

        ctx.drawImage(
            sprites, 
            background.spriteX, background.spriteY, 
            background.width, background.height, 
            background.x, background.y,
            background.width, background.height, 
        ),
        ctx.drawImage(
            sprites, 
            background.spriteX, background.spriteY, 
            background.width, background.height, 
            (background.x + background.width), background.y,
            background.width, background.height, 
        )
    }
 
}

function loop() {
    current.startGame();
    current.updateGame();

    requestAnimationFrame(loop);
    
}

window.addEventListener('click', () => {
    if (current.click) {
        current.click();
    }

})

changeStage(stage.START);
loop();