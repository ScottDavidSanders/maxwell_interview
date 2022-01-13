const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
