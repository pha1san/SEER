const { number } = require("./index2");

var str = "a b     c";
//var replaced = str.replace(/\s/g, "+");

var replaced = str.replace(/ +/g, "+");

console.log(replaced);
