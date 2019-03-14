var board = [
    {name: "tae_0", point: 700},
    {name: "tae_1", point: 600},
    {name: "tae_2", point: 300},
    {name: "tae_3", point: 900},
    {name: "tae_4", point: 500},
    {name: "tae_5", point: 200},
    {name: "tae_6", point: 100},
    {name: "tae_7", point: 800},
    {name: "tae_8", point: 400},
    {name: "tae_9", point: 1000},
    {name: "test", point: 0}
]

function main() {
    input();
    sort();
    updateBoard();

    // var txt = loadStrings("../DATA/board.txt");
    // console.log(txt);
};

function updateBoard() {
    theName_1.innerHTML = board[0].name;
    theName_2.innerHTML = board[1].name;
    theName_3.innerHTML = board[2].name;
    theName_4.innerHTML = board[3].name;
    theName_5.innerHTML = board[4].name;
    theName_6.innerHTML = board[5].name;
    theName_7.innerHTML = board[6].name;
    theName_8.innerHTML = board[7].name;
    theName_9.innerHTML = board[8].name;
    theName_10.innerHTML = board[9].name;

    thePoint_1.innerHTML = board[0].point;
    thePoint_2.innerHTML = board[1].point;
    thePoint_3.innerHTML = board[2].point;
    thePoint_4.innerHTML = board[3].point;
    thePoint_5.innerHTML = board[4].point;
    thePoint_6.innerHTML = board[5].point;
    thePoint_7.innerHTML = board[6].point;
    thePoint_8.innerHTML = board[7].point;
    thePoint_9.innerHTML = board[8].point;
    thePoint_10.innerHTML = board[9].point;
};

function sort() {
    for (var i = 0; i < 10; ++i) {
        if (board[i].point < board[i+1].point) {

            var savePointChange = board[i].point;
            board[i].point = board[i+1].point;
            board[i+1].point = savePointChange;

            var saveNameChange = board[i].name;
            board[i].name = board[i+1].name;
            board[i+1].name = saveNameChange;
            i = -1;
        }
    };
}

function input() {
    var name = prompt("Please enter your name:", );
    board[9].name = name;
    var point = prompt("Please enter your point:", );
    board[9].point = point;
}

main();
