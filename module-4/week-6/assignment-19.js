const childPrice = 1.5;
const adultPrice = 4.0;

const totalEarnings = 5765;

let children = 0;
let adults = 2100;

let solved = false;

while (!solved) {
  const hypotheticalEarnings = children * childPrice + adults * adultPrice;

  if (hypotheticalEarnings === totalEarnings) {
    solved = true;
  } else if (adults < 0) {
    throw new Error("Problem has no solution!");
  } else {
    children += 1;
    adults -= 1;
  }
}

console.log("Children: ", children);
console.log("Adults: ", adults);
