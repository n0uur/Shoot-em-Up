///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gForce = 10;

var player;

function platform(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

const draw = {
    canvas : function drawCanvas(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    map : function drawMap() {
        platform(200, 400, 600, 20, "red");

    }
}

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new entity(400, 100, 50, 80, "#9ce2a0", 0, 0, "grounded", 0);
    start();

}

function start() {
    setInterval(game, 33); // 33ms ~ 30fps
}

function updateGame() {
    draw.canvas(1200, 750, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else
}

function game() {
    player.updatePos();
    console.log(player.y)
    updateGame();

}

function entity(x, y, width, height, color, xVelocity, yVelocity, state, score) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.state = state; // there are two state (grounded || airborne)
    this.score = score;
    this.entityUpdate = function entityUpdate() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.updatePos = function updatePos() {
        this.y += gForce;
    }

}


