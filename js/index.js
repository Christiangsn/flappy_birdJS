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
    background.init();
    floor.init();
    flappyBird.init();
    requestAnimationFrame(loop);

}

loop();