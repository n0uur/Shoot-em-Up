///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var player; 
var level = [];

function Rectangle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
}

function Entity(x, y, width, height, color) {
    Rectangle.call(this, x, y, width, height, color);
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.score = 0;
    //this.status = 0;
    this.gForce = 10;

    this.entityUpdate = function entityUpdate() {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.updatePos = function updatePos() {
        this.y += this.yVelocity + this.gForce;
        this.x += this.xVelocity;
    }

    this.moveRight = () => {
        this.xVelocity = 10;
    }

    this.moveLeft = () => {
        this.xVelocity = -10;
    }

    this.jump = () => {
        this.yVelocity = -20;
        tap2 = 1;
    }
    return this;
}

// ---------- Movement Handler ----------

document.onkeydown = document.body.onkeydown = (e) => {
	  if(e.keyCode == 68) {
	  	player.moveRight();
	  } else if (e.keyCode == 65){ 
	  	player.moveLeft();
	  }
    }

document.onkeyup = document.body.onkeyup = (e) => {
	  if(e.keyCode == 68 || e.keyCode == 65) {
        player.xVelocity = 0;
      }
      if(e.keyCode == 32){
        player.yVelocity = 0;
      }
    }

document.onkeypress = document.onkeypress = (e) => {
    if(e.keyCode == 32){
        player.jump();
    }
}

// ---------- Game Function ----------

const draw = {
    canvas : function drawCanvas(width, height, color) {
        this.width = width;
        this.height = height;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    map : function drawMap() { // Draw map and keep all platform in array
        let platform1 = new Rectangle(370,170,300,10, "red");//top1
        let platform2 = new Rectangle(170,370,300,10, "red");//top2
        let platform3 = new Rectangle(570,370,300,10, "red");//top3
        level = [platform1, platform2, platform3];
        
    }
}
function collisionDetector(obj) {
    let pat1 = (((obj.y+obj.height) == level[0].y)&&((obj.x+obj.width >= level[0].x)&&(obj.x <= level[0].x+level[0].width)));
    let pat2 = (((obj.y+obj.height) == level[1].y)&&((obj.x+obj.width >= level[1].x)&&(obj.x <= level[1].x+level[1].width)));
    let pat3 = (((obj.y+obj.height) == level[2].y)&&((obj.x+obj.width >= level[2].x)&&(obj.x <= level[2].x+level[2].width)));
    if(pat1 || pat2 || pat3){
        obj.gForce = 0;
    }
    else{
        obj.gForce = 10;
    }
}

// ---------- Game Loop ----------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new Entity(500, 100, 50, 80, "#9ce2a0");
    setInterval(game, 33); // 33ms ~ 30fps (defalut = 33ms)
}

function render() {
    draw.canvas(1000, 500, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else

}

function game() { //update here
    collisionDetector(player);
    player.updatePos();
    render();
}
