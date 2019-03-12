///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var player;
var enemy;
var enemy2;
var level = [];
var counterJ;
var statusjump=0;
var faceHit = "R";


function Rectangle(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	return this;
}

function Entity(x, y, width, height, color, hp) {
	Rectangle.call(this, x, y, width, height, color);
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.score = 0;
	this.status = 0;
	this.gForce = 10;
	this.hp = 1

	this.entityUpdate = function entityUpdate() {
		ctx.fillStyle = this.color;
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

function enemyMovement(obj){
    let xDiff = player.x - obj.x;
    if(Math.abs(xDiff) <= 150 && player.y == obj.y){
        if(player.x > obj.x){
            obj.xVelocity = 6;
        } else if(player.x < obj.x){
            obj.xVelocity = -6;
        }
    } else {
        let x = Math.floor(Math.random() * 30) + 1;
        if(x == 1){
            obj.xVelocity = 4;
        } else if(x == 2){
            obj.xVelocity = -4;
        }
    }
}

document.body.addEventListener('keydown', function(e){
	if(e.code == 'KeyD') {
		player.moveRight();
		faceHit = "R";
	} else if (e.code == 'KeyA'){ 
		player.moveLeft();
		faceHit = "L"
	} else if (e.code == 'KeyL' && player.status == 1){
		player.jump();
		player.status = 0;
	}else if(e.code == 'KeyK'){
		if(faceHit == "L"){
			lazer = new Entity(player.x, player.y+(player.height/2)+1, 0-player.x, 5, "red");
			lazer.updatePos();
			lazer.entityUpdate();
			lazer.gForce = 0;
			if(player.y == enemy.y && player.x > enemy.x){
				enemy.y = -100;
				enemy.hp = 0;
			}
		}
		else if(faceHit == "R"){
			lazer = new Entity(player.x+player.width, player.y+(player.height/2)+1, 1200-player.x, 5, "red");
			lazer.updatePos();
			lazer.entityUpdate();
			lazer.gForce = 0;
			if(player.y == enemy.y && player.x < enemy.x){
				enemy.y = -100;
				enemy.hp = 0;
			}
	}
}});

document.body.addEventListener('keyup', function(e){
	if(e.code == 'KeyD' || e.code == 'KeyA') {
		player.xVelocity = 0;
	} else if(e.code == 'KeyL'){
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
function tophit(){
	if ((player.y+player.height == enemy.y)&&(player.x+player.width >= enemy.x)&&(player.x <= enemy.x+enemy.width)){
		player.jump();
		player.status = 0;
		enemy.y = -100;
		enemy.hp = 0;

	}
}

// ---------- Game Loop ----------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new Entity(500, 10, 50, 80, "#9ce2a0");
    enemy = new Entity(300, 50, 50, 80, "pink")
    enemy2 = new Entity(700, 50, 50, 80, "purple")
    setInterval(game, 33); // 33ms ~ 30fps (defalut = 33ms)
}

function render() {
    draw.canvas(1000, 500, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else
    enemy.entityUpdate();
    enemy2.entityUpdate();
}

function game() { //update here
    collisionDetector(player);
    collisionDetector(enemy);
    collisionDetector(enemy2);
    warpPlayer(player);
    warpPlayer(enemy);
    warpPlayer(enemy2);
    enemyMovement(enemy);
    enemyMovement(enemy2);
    Jtest(player); // player.y(before jump)
    console.log(player.y, counterJ, statusjump);
    player.updatePos();   
    enemy.updatePos();
    enemy2.updatePos();

    render();
	tophit();
	if(enemy.hp == 1){
		enemy.updatePos();
	}
}
