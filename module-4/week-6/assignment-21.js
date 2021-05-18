// Write a program that prints out the numbers from 1 to 100, BUT:

// If the number is divisible by 3, print "Wizz" instead of the number
// If the number is divisible by 5, print "Wozz" instead of the number
// If the number is divisible by BOTH 3 and 5, print "WizzWozz" instead of the number

for (i = 1; i <= 100; i++) {
  if (i % 3 === 0 && !(i % 5 === 0)) {
    console.log("Wizz");
  } else if (i % 5 === 0 && !(i % 3 === 0)) {
    console.log("Wozz");
  } else if (i % 3 === 0 && i % 5 === 0) {
    console.log("WizzWozz");
  } else {
    console.log(i);
  }
}
