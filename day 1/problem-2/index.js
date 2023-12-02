const fs = require("fs");

const getDigitFromWord = (word) => {
  switch (word) {
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
    default:
      return word;
  }
};

const sum = fs
  // read input
  .readFileSync("../input.txt", "utf8")
  // split lines
  .split("\n")
  // map each line to an array of the first and last digit
  .map((value) => {
    const firstDigit = value.match(
      /one|two|three|four|five|six|seven|eight|nine|\d/g
    )[0];
    // overlapping digit words are tricky
    const secondDigit = value
      .split("")
      .reverse()
      .join("")
      .match(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d/g)[0]
      .split("")
      .reverse()
      .join("");
    return [firstDigit, secondDigit];
  })
  // map each digit to its string representation
  .map(([firstString, secondString]) => [
    getDigitFromWord(firstString),
    getDigitFromWord(secondString),
  ])
  // join the strings
  .map(([firstDigit, secondDigit]) => firstDigit + secondDigit)
  .map((value) => {
    console.log(value);
    return value;
  })
  // convert to number
  .map(Number)
  // sum
  .reduce((acc, curr) => acc + curr);

console.log(sum);
