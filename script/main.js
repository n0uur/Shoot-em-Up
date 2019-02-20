///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var player;

const init = {
    drawCanvas : function draw(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


function game() {
    player.updatePos();

}

function load() {
    init.drawCanvas(1200, 750, "#383434");
    player = new entity(400, 100, 50, 80, "#9ce2a0", 0, 0, true, 10);
    start();

}

function start() {
    setInterval(game, 33); // 33ms ~ 30fps
}

function entity(x, y, width, height, color, xVelocity, yVelocity, afftctedByGravity, gValue) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.afftctedByGravity = afftctedByGravity;
    this.gValue = gValue;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);


    this.updatePos = function updatePos() {
        this.y += 10;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //console.log(this.y);
        //onsole.log("Test")
    }
}


