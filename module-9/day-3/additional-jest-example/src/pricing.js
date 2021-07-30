export function calculateTotal(cartItems, salesTax) {
  let subTotal = 0;

  for (const item of cartItems) {
    subTotal += item.price;
  }

  let total = subTotal * salesTax + subTotal;
  return total;
}
