///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gForce = 10;

var player; //declare player Entity

// ----------------------------- Constructor ------------------------------

//          ----------------------- Entity ---------------------

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

function Platform(x, y, width, height, color) {
    Entity.call(this, x, y, width, height, color);
    this.test = () => {
        console.log("Test");
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
    map : function drawMap() {
        // entity("platform", 200, 400, 600, 20, "red");
        // entity("platform", 0, 700, 300, 20, "red");
        // entity("platform", 750, 600, 100, 20, "red");


    }
}

// -------------- Game init --------------------------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new Entity("player", 400, 100, 50, 80, "#9ce2a0");
    setInterval(game, 33); // 33ms ~ 30fps
    var plat = new Platform(10,10,10,10,"red")
    plat.test();
}

function updateGame() {
    draw.canvas(1200, 750, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else

}

function game() {
    player.moveLeft();
    player.updatePos();
    updateGame();

}







