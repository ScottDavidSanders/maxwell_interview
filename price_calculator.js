const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PRICES = {
  milk: { price: 3.97, saleQuantity: 2, salePrice: 5, discount: 2.94 },
  bread: { price: 2.17, saleQuantity: 3, salePrice: 6, discount: 0.51 },
  banana: { price: 0.99, saleQuantity: null, salePrice: null, discount: 0 },
  apple: { price: 0.89, saleQuantity: null, salePrice: null, discount: 0 },
};

const countItems = (itemString) => {
  const items = itemString.split(",").map((item) => item.trim().toLowerCase());
  return Object.entries(
    items.reduce((acc, item) => {
      if (item in acc) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {})
  ).map(([item, count]) => ({ item, count }));
};

readline.question("Please enter all the items purchased separated by a comma:\n", (list) => {
  const blah = countItems(list);
  console.log(blah);
  readline.close();
});
