///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gForce = 10;

var player; //declare player Entity

// ----------------------------- Entity ------------------------------

function entity(id, x, y, width, height, color, xVelocity, yVelocity, state, score) {
    this.id = id;
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
        if (this.state === "ascending") {
            if (this.yVelocity === 0) {
                this.state = "descending";
            } else {this.yVelocity += 5}
        }
        else if (this.state === "descending") {
            if (yVelocity <= 0) {
                this.state = "grounded";
            }
        }

        this.y += this.yVelocity + gForce;
        this.x += this.xVelocity;

    }

    this.moveRight = function moveRight() {
        this.xVelocity += 2;
    }

    this.moveLeft = function moveLeft() {
        this.xVelocity -= 2;
    }

    this.jump = function jump() {
        if (state === "grounded") {
            this.yVelocity += 20;
            this.state = "ascending"
        }
    }
}

// ------------------ Declare Platform --------------

function platform(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
    map : function drawMap() {
        platform(200, 400, 600, 20, "red");
        platform(0, 700, 300, 20, "red");
        platform(750, 600, 100, 20, "red");


    }
}

// -------------- Game init --------------------------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new entity("player", 400, 100, 50, 80, "#9ce2a0", 0, 0, "grounded", 0);
    setInterval(game, 33); // 33ms ~ 30fps
}

function updateGame() {
    draw.canvas(1200, 750, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else
    //console.log(player.xVelocity);

    // console.log("x : " + player.x + " | Y : " + player.y);
    // console.log(player.xVelocity);
}

function game() {
    player.moveLeft();
    player.updatePos();
    updateGame();

}







