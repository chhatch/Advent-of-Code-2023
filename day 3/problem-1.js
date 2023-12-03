const fs = require("fs");

const schematic = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((row) => row.split(""));
const partNumbers = [];
const rows = schematic.length;
const columns = schematic[0].length;
const isDigit = (char) => /\d/.test(char);
const isSymbol = (char) => !/\d|\./.test(char);

let digits = [];
let touchingSymbol = false;

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < columns; x++) {
    const char = schematic[y][x];
    const charIsDigit = isDigit(char);

    if (charIsDigit) {
      // we only care about symbols touching numbers
      if (!touchingSymbol) {
        touchingSymbol = isTouchingSymbol(x, y);
      }
      digits.push(char);
    }
    // if the character isn't a digit, we've reached the end of a number
    // or the end of the row
    if (!charIsDigit || x === columns - 1) {
      if (touchingSymbol && digits.length) {
        // if the number is touching a symbol it's a part number
        partNumbers.push(Number(digits.join("")));
      }
      // either way we need to reset the digits array and touchingSymbol flag
      digits = [];
      touchingSymbol = false;
    }
  }
}

console.log(partNumbers.reduce((a, b) => a + b, 0));

function isTouchingSymbol(x, y) {
  const topIsSymbol = y > 0 ? isSymbol(schematic[y - 1][x]) : false;
  const bottomIsSymbol = y < rows - 1 ? isSymbol(schematic[y + 1][x]) : false;
  const leftIsSymbol = x > 0 ? isSymbol(schematic[y][x - 1]) : false;
  const rightIsSymbol = x < columns - 1 ? isSymbol(schematic[y][x + 1]) : false;
  const topLeftIsSymbol =
    y > 0 && x > 0 ? isSymbol(schematic[y - 1][x - 1]) : false;
  const topRightIsSymbol =
    y > 0 && x < columns - 1 ? isSymbol(schematic[y - 1][x + 1]) : false;
  const bottomLeftIsSymbol =
    y < rows - 1 && x > 0 ? isSymbol(schematic[y + 1][x - 1]) : false;
  const bottomRightIsSymbol =
    y < rows - 1 && x < columns - 1 ? isSymbol(schematic[y + 1][x + 1]) : false;

  return (
    topIsSymbol ||
    bottomIsSymbol ||
    leftIsSymbol ||
    rightIsSymbol ||
    topLeftIsSymbol ||
    topRightIsSymbol ||
    bottomLeftIsSymbol ||
    bottomRightIsSymbol
  );
}
