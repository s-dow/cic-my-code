import { calculateTotal } from "./pricing";

describe("calculateTotal", () => {
  it("should add up the items", () => {
    let items = [
      { name: "USB B Cables", price: 7 },
      { name: "USB C Headphones", price: 8 },
      { name: "USB A to Ethernet", price: 2 },
    ];

    const total = calculateTotal(items, 0);

    expect(total).toEqual(17);
  });

  it("should handle an empty cart", () => {
    const items = [];

    const total = calculateTotal(items, 0);
    expect(total).toEqual(0);
  });

  it("should include sales tax", () => {
    const items = [
      { name: "USB B Cables", price: 7 },
      { name: "USB C Headphones", price: 8 },
      { name: "USB A to Ethernet", price: 2 },
    ];

    const total = calculateTotal(items, 0.1);
    expect(total).toEqual(18.7);
  });

  it("should include sales tax at higher percentages", () => {
    const items = [
      { name: "USB B Cables", price: 7 },
      { name: "USB C Headphones", price: 8 },
      { name: "USB A to Ethernet", price: 2 },
    ];

    const total = calculateTotal(items, 5.0);
    expect(total).toEqual(102);
  });

  it("should calculate negative sales tax", () => {
    const items = [
      { name: "USB B Cables", price: 7 },
      { name: "USB C Headphones", price: 8 },
      { name: "USB A to Ethernet", price: 2 },
    ];

    const total = calculateTotal(items, -0.05);
    expect(total).toEqual(16.15);
  });

  it("should not add tax if salesTax is 0", () => {
    const items = [
      { name: "USB B Cables", price: 7 },
      { name: "USB C Headphones", price: 8 },
      { name: "USB A to Ethernet", price: 2 },
    ];

    const total = calculateTotal(items, 0);
    expect(total).toEqual(17);
  });
});
