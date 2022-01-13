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

const calculateCost = (items) => {
  return items.map(({ item, count, ...rest }) => {
    if (PRICES[item]) {
      return { item, count, ...rest, cost: PRICES[item].price * count };
    }
    return { item, count, ...rest, cost: 0 };
  });
};

const calculateDiscount = (items) => {
  return items.map(({ item, count, ...rest }) => {
    if (PRICES[item] && PRICES[item].saleQuantity) {
      const { discount, saleQuantity } = PRICES[item];
      return { item, count, ...rest, discount: Math.floor(count / saleQuantity) * discount };
    }
    return { item, count, ...rest, discount: 0 };
  });
};

const applyDiscount = (items) => {
  return items.map((item) => {
    if (Number(item.cost) && Number(item.discount)) {
      item.cost = item.cost - item.discount;
    }
    return item;
  });
};

readline.question("Please enter all the items purchased separated by a comma:\n", (list) => {
  const itemsCount = countItems(list);
  console.log("countItems", itemsCount);

  const itemsCostBeforeDiscount = calculateCost(itemsCount);
  console.log("calculateCost", itemsCostBeforeDiscount);

  const discount = calculateDiscount(itemsCostBeforeDiscount);
  console.log("discount", discount);

  const discountedPrice = applyDiscount(discount);
  console.log("discountedPrice", discountedPrice);

  readline.close();
});
