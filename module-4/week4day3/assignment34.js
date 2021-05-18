const inventory = [
  { SKU: 1, color: "black", qty: 3 },
  { SKU: 2, color: "grey", qty: 0 },
  { SKU: 3, color: "beige", qty: 12 },
  { SKU: 4, color: "yellow", qty: 13 },
  { SKU: 5, color: "burgundy", qty: 0 },
  { SKU: 6, color: "white", qty: 6 },
];

// MAP
const colorsAvailable = inventory.map((colors) => colors.color);

console.log(colorsAvailable);

// FILTER
let restock = [];

const zeroCount = inventory.filter((zeroQty) => {
  if (zeroQty.qty === 0) {
    restock.push(zeroQty.SKU);
  }
});

console.log(restock);
