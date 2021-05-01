const hit = new Audio();
hit.src = '../effekte/hit.wav';

const sprites = new Image();
sprites.src = '../images/sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function newFloor () {
    const floor = {
        spriteX: 0,
        spriteY: 610,
        width: 224,
        height: 400,
        x: 400,
        y: canvas.height - 112,

        lopping () {
            const move = 1;
            // const repeat = floor.width % 99.9  RESOLVER MAIS TARDE
            const repeat = floor.width / floor.width
            const drive = floor.x - move;
            floor.x = drive % repeat;

        },
    
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

    return floor
}


function meeting(flappyBird, floor) {
    const flappyBirdY = flappyBird.y + flappyBird.height;
    const floorY = floor.y;
    
    if (flappyBirdY >= floorY) {
        return true;
    }

    return false

}

function newFlappyBird () {
    const flappyBird = { 

        spriteX: 0, 
        spriteY: 0, 
        width: 33, 
        height: 24, 
        x: 10,
        y: 50,           
        gravity: 0.25,
        speed: 0,
        flappyUp: 4.6,
    
        up () {
            flappyBird.speed = - flappyBird.flappyUp
        },
    
        currentPosition () {
            if (meeting(flappyBird, globais.floor)) {
                hit.play();

                setTimeout ( () => {
                    changeStage(stage.START)
                }, 500)
                return;
            }
            flappyBird.speed = flappyBird.speed + flappyBird.gravity;
            flappyBird.y = flappyBird.y + flappyBird.speed;
    
        },

        moviment: [
            { spriteX: 0,  spriteY: 0 },
            { spriteX: 0,  spriteY: 26 },
            { spriteX: 0,  spriteY: 52 }
        ],

        frame: 0,
        currentFrame (){

        },
    
        init(){
            const { spriteX, spriteY } = flappyBird.moviment[flappyBird.frame];
            ctx.drawImage(
                sprites, 
                spriteX, spriteY, 
                flappyBird.width, flappyBird.height, 
                flappyBird.x, flappyBird.y,
                flappyBird.width, flappyBird.height,
    
            );
        }
    
    }

    return flappyBird;
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

const globais = {};
let current = {};
function changeStage (newStage) {
    current = newStage;

    if(current.begin) {
        current.begin();
    }

}

const stage = {
    START: {
        begin() {
            globais.flappyBird = newFlappyBird();
            globais.floor = newFloor();
        },
        startGame() {
            background.init();
            globais.floor.init();
            globais.flappyBird.init();
            mesagemGetReady.start();
        },
        click () {
            changeStage(stage.GAME)
        },
        updateGame() {
            globais.floor.lopping();
        }
    }

}

stage.GAME ={
    startGame() {
        background.init();
        globais.floor.init();
        globais.flappyBird.init();
    },
    keyUp () {
        globais.flappyBird.up();
    },
    updateGame() {
        globais.flappyBird.currentPosition();
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

const keysDown = {};
window.addEventListener('keydown', (e) => {
    keysDown[e.keyCode] = true;

    if (38 in keysDown) {
        current.keyUp();
    }
});

window.addEventListener('click', () => {
    if (current.click) {
      current.click();
    }  

})

changeStage(stage.START);
loop();

