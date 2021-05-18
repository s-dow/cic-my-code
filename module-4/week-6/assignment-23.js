const DICE_SYMBOLS = [
  "\u2680", // ⚀
  "\u2681", // ⚁
  "\u2682", // ⚂
  "\u2683", // ⚃
  "\u2684", // ⚄
  "\u2685", // ⚅
];

let bestTotal = 0;
let currentTotal = 0;
let rolledDiceIndices = [];
let rolledDiceSymbols = [];

function diceRollFunction() {
  currentTotal = 0;
  rolledDiceIndices = [];

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * 6);
    rolledDiceIndices.push(randomIndex);
    currentTotal = currentTotal + randomIndex + 1;
  }

  if (currentTotal > bestTotal) {
    bestTotal = currentTotal;
  }

  rolledDiceSymbols = rolledDiceIndices.map((i) => DICE_SYMBOLS[i]);
  // console.log(`Third roll:\t${rolledDiceSymbols.join(" ")}`);
}

diceRollFunction();
console.log(`First roll:\t${rolledDiceSymbols.join(" ")}`);
diceRollFunction();
console.log(`Second roll:\t${rolledDiceSymbols.join(" ")}`);
diceRollFunction();
console.log(`Third roll:\t${rolledDiceSymbols.join(" ")}`);

console.log(`Best total:\t${bestTotal}`);
