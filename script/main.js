///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gForce = 10;

var player; //declare player Entity
var level = [];

// ----------------------------- Constructor ------------------------------

//        ----------------------- Entity ---------------------

function Entity(id, x, y, width, height, color) {
    this.id = id;
    this.coordinate = {
        "x" : x,
        "y" : y
    }
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = {
        "x" : 0,
        "y" : 0
    }
    this.state = "grounded"; // there are two state (grounded || airborne)
    this.score = 0;

    this.entityUpdate = function entityUpdate() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.coordinate.x, this.coordinate.y, this.width, this.height);
    }

    this.updatePos = function updatePos() {
        if (this.state === "ascending") {
            if (this.velocity.y === 0) {
                this.state = "descending";
            } else {this.velocity.y += 5}
        }
        else if (this.state === "descending") {
            if (velocity.y <= 0) {
                this.state = "grounded";
            }
        }

        this.coordinate.y += this.velocity.y + gForce;
        this.coordinate.x += this.velocity.x;

    }

    this.moveRight = function moveRight() {
        this.velocity.x += 2;
    }

    this.moveLeft = function moveLeft() {
        this.velocity.x -= 2;
    }

    this.jump = function jump() {
        if (state === "grounded") {
            this.velocity.y += 20;
            this.state = "ascending"
        }
    }

    this.shoot = function shoot() {

    }
}

//         -------- Platform ---------

function Platform(x, y, width, height, color) {
    this.coordinate = {
        "x" : x,
        "y" : y
    }
    this.width = width;
    this.height = height;
    ctx.fillStyle = color;
    ctx.fillRect(this.coordinate.x, this.coordinate.y, this.width, this.height);
    return this;
}

//          -------- Collide ----------

function isPlayerCollide(arr) {
    // define player border
    let playerHead = player.coordinate.y;
    let playerBottom = player.coordinate.y - player.height;
    let playerLeft = player.coordinate.x;
    let playerRight = player.coordinate.x + player.width;
    // check every object in array
    for (i = 0; i < arr.length; i++) {
        let objHead = arr[i].coordinate.y;
        let objBottom = arr[i].coordinate.y - arr[i].height;
        let objLeft = arr[i].coordinate.x;
        let objRight = arr[i].coordinate.x + arr[i].width;

        if (playerHead <= objHead) { //top
            player.velocity.y -= player.velocity.y;
        }
        if (playerBottom > objBottom && playerRight >=  objLeft && playerLeft <= objRight) { //bottom
            player.velocity.y -=  gForce;
            console.log("bottom!");
        }
        if(0) { //left
            console.log(0)
        }
        if(0) { //right
            console.log(0)
        }
    }
}

// --------------------- Draw ------------------------

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
    map : function drawMap() { // Draw map and keep all platform in array
        level.push(
            Platform(400, 600, 400, 10, "red"),
            //Platform(600, 200, 200, 10, "red")
        );
    }
}

// ---------------------- Game init --------------------------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new Entity("player", 500, 100, 50, 80, "#9ce2a0");
    setInterval(game, 200); // 33ms ~ 30fps
}

function updateGame() {
    draw.canvas(1200, 750, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else

}

function game() {
    //player.moveLeft();
    isPlayerCollide(level);
    player.updatePos();
    updateGame();

}







