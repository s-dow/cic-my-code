//common js - older method - does not work on front end - updated in ES6

function myFunc1() {
  console.log("MyFunc1 just ran");
}

function myFunc2() {
  console.log("MyFunc2 just ran");
}
module.exports = { myFunc1, myFunc2, color: "blue" };
