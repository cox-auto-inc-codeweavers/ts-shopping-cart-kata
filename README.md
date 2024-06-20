# The Supermarket Checkout Kata in Typescript

The aim of this exercise is to build an automated checkout that can scan products to produce a receipt. The supermarket has a catalogue with different types of products (rice, apples, milk, toothbrushes,...).
Each product has a price, and the total price of the shopping cart is the total of all the prices.

### The Goal

The goal of the exercise is to implement a `Checkout` that can handle the following scenarios:

- The checkout should be able to handle a shopping cart with multiple scanned products of varying quantities (4x Apple, 2x Milk etc.).
- The client should get a receipt with the list of purchases and the total price.

There are failing tests in `src/checkout.spec.ts` that you need to get passing - see further down for information on how to run these.

- Get the initial failing tests passing by adding the necessary features to the checkout
- Add additional tests that cover other scenarios: 
  - when two 'Apple' items are scanned, then the receipt displays two Apples and a correct total price of 0.6
  - when one or more 'Orange' items are scanned
  - when both an 'Apple' and an 'Orange' item are scanned, the receipt displays both items and a total price that is the sum of both

### Running the tests

The tests that you'll find follow the naming convention `*.spec.ts` and are written using [Jest](https://jestjs.io/).

- to run the tests, you'll first need to run `npm install` to install the dependencies, then run the following command:

```
npm test
```

### (Optional) Additional Goals

- writing additional tests in `src/checkout.spec.ts`
- adding the ability to handle deals and discounts (e.g. buy one get one free offers)