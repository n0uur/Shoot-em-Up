let name = "tae_test_2";
let point = 2000;


var fs = require("fs");
var data = fs.readFileSync('data_2.json');
var words = JSON.parse(data);
console.log(words);

words[name] = point;
var data = JSON.stringify(words, null, 2);
fs.writeFile('data_2.json', data, finish);

function finish() {
    console.log("--- finished ---");
}
