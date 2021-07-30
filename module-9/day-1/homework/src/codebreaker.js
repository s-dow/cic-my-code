// if the guess is higher than the secret code, return "too high!"
// if the guess is lower than the secret code, return "too low!"
// if the guess is equal to the secret code, return "you cracked the code!"
export const checkGuess = (guess, secretCode) => {
  if (guess > secretCode) {
    return "too high!";
  }

  if (guess === "secretCode") {
    return "you cracked the code!";
  }

  if (guess < secretCode || typeof guess === "string") {
    return "too low!";
  }
  if (guess === secretCode) {
    return "you cracked the code!";
  }
};

// Part 1
//
// Write test cases that cover all the behavior of the checkGuess function
console.assert(checkGuess(100, 100) === "you cracked the code!");
console.assert(checkGuess(30, 100) === "too low!");
console.assert(checkGuess(333, 100) === "too high!");
console.assert(checkGuess(-8, 100) === "too low!");
console.assert(checkGuess(100.1, 100) === "too high!");

// Part 2
//
// Uncomment the following assertion, but don't change them!
// Change the checkGuess function to make this assertion pass
//
console.assert(
  checkGuess("secretCode", Math.random()) === "you cracked the code!"
);

// Part 3 (bonus)
//
// Uncomment this assertion, but dont change it.
// Can you figure out why checkGuess passes?

// I think it passes because the checkGuess parameter runs the first time and
// returns a string, which is not greater than, less than or equal to any number,
// so it skips to the last return statement, which returns 'you cracked the code!'

// Can you change checkGuess to return "too low!" ?

// I used typeof guess === "string", and it worked manually (after changing the input to text to try it)
// but I had to add if (guess === secretCode) {
// return "you cracked the code!" } to get the assertion to raise an exception? - would love feedback on this!

// Are there other edge cases where checkGuess will return "you cracked the code!" ?
//

console.assert(checkGuess(checkGuess, 1000) === "you cracked the code!");
