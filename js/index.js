let frames = 0;
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
                changeStage(stage.GAME_OVER)
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
            const intervalFrame = 10;
            const interval = frames % intervalFrame === 0;


            if (interval) { 
                const baseIncrement = 1;
                const increment = baseIncrement + flappyBird.frame;
                const baseRepaeat = flappyBird.moviment.length;
                flappyBird.frame = increment % baseRepaeat;
            }

        },
    
        init(){
            flappyBird.currentFrame();
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

function newObstacles () {
    const obstacles = {
        width: 52,
        height: 400,
        floor: {
            spriteX: 0,
            spriteY: 169
        },
        sky: {
            spriteX: 52,
            spriteY: 169,
        },
        clear: 80,
        init() {
            obstacles.pairs.forEach(par => {
                const yRandom = par.y
                const spacing = 40;
                const obstacleSkyX = par.x;
                const obstacleSkyY = yRandom;
                
                ctx.drawImage (
                    sprites,
                    obstacles.sky.spriteX, obstacles.sky.spriteY,
                    obstacles.width, obstacles.height,
                    obstacleSkyX, obstacleSkyY,
                    obstacles.width, obstacles.height
                )
    
                const obstacleFloorX = par.x;
                const obstacleFloorY = obstacles.height + spacing + yRandom;
    
                ctx.drawImage (
                    sprites,
                    obstacles.floor.spriteX, obstacles.floor.spriteY,
                    obstacles.width, obstacles.height,
                    obstacleFloorX, obstacleFloorY,
                    obstacles.width, obstacles.height
                ) 
                
                par.obstacleSky = {
                    x: obstacleFloorX,
                    y: obstacles.height + obstacleSkyY
                }
                par.obstacleFloor = {
                    x: obstacleFloorX,
                    y: obstacleFloorY
                }
            });
            
        },
        collision(par) {
            const flappyHeart = globais.flappyBird.y;
            const flappyBase =  globais.flappyBird.y + globais.flappyBird.height;

            if((globais.flappyBird.x + globais.flappyBird.height ) >= par.x){
  
                if (flappyHeart <= par.obstacleSky.y) {
                    return true
                }

                if (flappyBase >= par.obstacleFloor.y) {
                    return true;
                }

            }

            return false
        },
        pairs: [],        
        update() {
            const nextFrame = frames % 100 === 0;
            
            if(nextFrame) {
                obstacles.pairs.push({
                    x: canvas.width,
                    y: -150 * [Math.random() + 1]
                })
            }

            obstacles.pairs.forEach(par => {
                par.x = par.x - 2;

                if(obstacles.collision(par)){
                    hit.play();
                    changeStage(stage.GAME_OVER)
                }

                if(par.x + obstacles.height <= 0) {
                    obstacles.pairs.shift();
                }

            })

        }
    }
    return obstacles;

}

function gameScore() {
    const score = {
        point: 0,

        init () {
            ctx.font = '35px "VT323" ';
            ctx.textAlign = 'right';
            ctx.fillStyle = 'white';
            ctx.fillText(`${score.point}`, canvas.width - 10, 35);

        },
        update () {
            const intervalFrame = 10;
            const interval = frames % intervalFrame === 0;

            if (interval){
                score.point = score.point +1;
            }
        }
    }

    return score

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

const messageGameOver = {
    sX: 134,
    sY: 153,
    width: 226,
    height: 200,
    x: (canvas.width / 2 ) - 226 / 2,
    y: 50,

    init() {
        ctx.drawImage(
            sprites,
            messageGameOver.sX, messageGameOver.sY, 
            messageGameOver.width, messageGameOver.height, 
            messageGameOver.x, messageGameOver.y,
            messageGameOver.width, messageGameOver.height,
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
            globais.obstacles = newObstacles();
        },
        startGame() {
            background.init();
            globais.flappyBird.init();
            globais.obstacles.init();
            globais.floor.init();
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

stage.GAME = {
    begin() {
        globais.score = gameScore();

    },
    startGame() {
        background.init();
        globais.obstacles.init();
        globais.floor.init();
        globais.flappyBird.init();
        globais.score.init();
    },
    keyUp () {
        globais.flappyBird.up();
    },
    updateGame() {
        globais.obstacles.update();
        globais.floor.lopping();
        globais.flappyBird.currentPosition();
        globais.score.update();
    }
}

stage.GAME_OVER = {
    startGame () {
        messageGameOver.init();
    },
    click () {

    },
    updateGame() {
        changeStage(stage.GAME_OVER)
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
    frames = frames +1;
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

