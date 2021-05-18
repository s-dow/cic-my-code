// Write a function that takes a string color as an argument (e.g. 'red'),
// and returns true if it is your favorite color,
// or false if it is not your favorite color.

function favColor(color) {
  if (color === "black") {
    return true;
  } else {
    return false;
  }
}

console.log(favColor("red"));
console.log(favColor("black"));
console.log(favColor("lilac"));
console.log(favColor("black"));
