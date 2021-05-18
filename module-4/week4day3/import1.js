//common js - older method - updated in ES6
const { myFunc1, myFunc2, color } = require("./export1.js");
const camelcase = require("camelcase");
//package json ^^ installed via terminal
//variable does not need to match name of package

myFunc1();
myFunc2();
console.log(color);

console.log(camelcase("some sentence goes here"));
