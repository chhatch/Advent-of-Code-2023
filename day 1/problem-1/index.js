const fs = require("fs");

const sum = fs
  .readFileSync("../input.txt", "utf8")
  .split("\n")
  .map((value) => {
    const digits = value.match(/\d/g);
    return [digits[0], digits[digits.length - 1]];
  })
  .map(([firstDigit, secondDigit]) => firstDigit + secondDigit)
  .map(Number)
  .reduce((acc, curr) => acc + curr);

console.log(`Sum: ${sum}`);
