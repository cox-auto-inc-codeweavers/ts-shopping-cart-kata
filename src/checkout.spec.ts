import { Checkout } from "./checkout";
import { Receipt, ReceiptItem } from "./receipt";
import { Product } from "./product";

function lookupReceiptItem(receipt: Receipt, id: string): ReceiptItem {
  const item = receipt.items.find((x) => x.product.name === id);
  if (!item) {
    throw new Error(`The receipt does not contain a "${id}" item.`);
  }
  return item;
}

describe("Given a customer is shopping at the supermarket", () => {
  describe("When no items have been scanned", () => {
    let receipt: Receipt;

    beforeEach(() => {
      const checkout = new Checkout();
      receipt = checkout.generateReceipt();
    });

    it("Then the receipt should contain no scanned items", () => {
      expect(receipt.items).toHaveLength(0);
    });

    it("Then the receipt total price should be zero", () => {
      expect(receipt.totalPrice).toEqual(0);
    });
  });

  describe('When a single "Apple" item is scanned', () => {
    let receipt: Receipt;

    beforeEach(() => {
      const checkout = new Checkout();
      checkout.scanItem(new Product("Apple", 0.3));
      receipt = checkout.generateReceipt();
    });

    it("Then the receipt should contain 1 scanned item", () => {
      expect(receipt.items).toHaveLength(1);
    });

    it('Then the receipt should contain an "Apple" item', () => {
      expect(lookupReceiptItem(receipt, "Apple")).toBeDefined();
    });

    it('Then the receipt "Apple" item should have the correct quantity', () => {
      expect(lookupReceiptItem(receipt, "Apple").quantity).toEqual(1);
    });

    it("Then the receipt total price should be calculated correctly", () => {
      expect(receipt.totalPrice).toEqual(0.3);
    });
  });

  describe('When an "Apple" item is scanned twice', () => {
    let receipt: Receipt;

    beforeEach(() => {
      const checkout = new Checkout();
      checkout.scanItem(new Product("Apple", 0.3));
      checkout.scanItem(new Product("Apple", 0.3));
      receipt = checkout.generateReceipt();
    });

    it("Then the receipt should contain 1 scanned item", () => {
      expect(receipt.items).toHaveLength(1);
    });

    it('Then the receipt should contain an "Apple" item', () => {
      expect(lookupReceiptItem(receipt, "Apple")).toBeDefined();
    });

    it('Then the receipt "Apple" item should have the correct quantity', () => {
      expect(lookupReceiptItem(receipt, "Apple").quantity).toEqual(2);
    });

    it("Then the receipt total price should be calculated correctly", () => {
      expect(receipt.totalPrice).toEqual(0.6);
    });
  });

  describe('When an "Apple" item is scanned once and a "Banana" item is scanned three times', () => {
    let receipt: Receipt;

    beforeEach(() => {
      const checkout = new Checkout();
      checkout.scanItem(new Product("Apple", 0.3));
      checkout.scanItem(new Product("Banana", 0.2));
      checkout.scanItem(new Product("Banana", 0.2));
      checkout.scanItem(new Product("Banana", 0.2));
      receipt = checkout.generateReceipt();
    });

    it("Then the receipt should contain 2 scanned items", () => {
      expect(receipt.items).toHaveLength(2);
    });

    it('Then the receipt should contain an "Apple" item', () => {
      expect(lookupReceiptItem(receipt, "Apple")).toBeDefined();
    });

    it('Then the receipt "Apple" item should have the correct quantity', () => {
      expect(lookupReceiptItem(receipt, "Apple").quantity).toEqual(1);
    });

    it('Then the receipt should contain a "Banana" item', () => {
      expect(lookupReceiptItem(receipt, "Banana")).toBeDefined();
    });

    it('Then the receipt "Banana" item should have the correct quantity', () => {
      expect(lookupReceiptItem(receipt, "Banana").quantity).toEqual(3);
    });

    it("Then the receipt total price should be calculated correctly", () => {
      expect(receipt.totalPrice).toEqual(0.9);
    });
  });
});
