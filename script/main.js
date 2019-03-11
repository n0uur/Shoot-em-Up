///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var player;
var enemy;
var level = [];
var counterJ;
var statusjump=0;


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
    this.status = 0;
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
        statusjump = 1;
    }
    return this;
}

function testEnemy(){
    let xDiff = player.x - enemy.x;
    if(Math.abs(xDiff) <= 150){
        if(player.x > enemy.x){
            enemy.xVelocity = 6;
        } else if(player.x < enemy.x){
            enemy.xVelocity = -6;
        }
    } else {
        let x = Math.floor(Math.random() * 30) + 1;
        if(x == 1){
            enemy.xVelocity = 4;
        } else if(x == 2){
            enemy.xVelocity = -4;
        }
    }
}

document.body.addEventListener('keydown', function(e){
    if(e.code == 'KeyD') {
        player.moveRight();
    } else if (e.code == 'KeyA'){ 
        player.moveLeft();
    } else if (e.code == 'Space' && player.status == 1){
        player.jump();
        player.status = 0;
    } else if (e.code == 'KeyW' && player.status == 1){
        player.jump();
        player.status = 0;
    
}
});

document.body.addEventListener('keyup', function(e){
    if(e.code == 'KeyD' || e.code == 'KeyA') {
        player.xVelocity = 0;
    } else if(e.code == 'Space'){
        player.yVelocity = 0;
    } else if(e.code == 'KeyW'){
        player.yVelocity = 0;
    }
});

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
        obj.status = 1;
    }
    else{
        obj.gForce = 10;
        obj.status = 0;
    }
}
function warpPlayer(player){
    if((player.x+player.width < 0)){
        player.x = 1000;
    }
    else if(player.x > 1000){
        player.x = 0;
    }
    else if(player.y > 500){
        player.y = -50;
    }
}

function Jtest(player){ // counterj = Y (before jump)
    let j1 = (((player.y+player.height) == level[0].y)&&((player.x+player.width >= level[0].x)&&(player.x <= level[0].x+level[0].width))&&(statusjump == 0));
    let j2 = (((player.y+player.height) == level[1].y)&&((player.x+player.width >= level[1].x)&&(player.x <= level[1].x+level[1].width))&&(statusjump == 0));
    let j3 = (((player.y+player.height) == level[2].y)&&((player.x+player.width >= level[2].x)&&(player.x <= level[2].x+level[2].width))&&(statusjump == 0));
    if(j1 || j2 || j3){
        counterJ = player.y;
    }
    else if(player.yVelocity ==-20){
        if(player.y+player.height == counterJ-120){
            player.yVelocity = 0;
        }
    }
    else if((player.yVelocity ==0) && (statusjump == 1) && (player.gForce == 0)){
        statusjump = 0;
    }
}

// ---------- Game Loop ----------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new Entity(500, 10, 50, 80, "#9ce2a0");
    enemy = new Entity(300, 50, 50, 80, "pink")
    setInterval(game, 33); // 33ms ~ 30fps (defalut = 33ms)
}

function render() {
    draw.canvas(1000, 500, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else
    enemy.entityUpdate();
}

function game() { //update here
    collisionDetector(player);
    collisionDetector(enemy);
    warpPlayer(player);
    warpPlayer(enemy);
    testEnemy();
    Jtest(player); // player.y(before jump)
    console.log(player.y, counterJ, statusjump);
    player.updatePos();   
    enemy.updatePos();
    render();
}
