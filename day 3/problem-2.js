const fs = require("fs");

const schematic = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((row) => row.split(""));
const rows = schematic.length;
const columns = schematic[0].length;
const isDigit = (char) => /\d/.test(char);
const isGear = (char) => char === "*";

let digits = [];
let touchingGear = false;

const updatedSchematic = schematic.map((row) => [...row]);

// update schematic with part numbers
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < columns; x++) {
    const char = schematic[y][x];
    const charIsDigit = isDigit(char);

    if (charIsDigit) {
      // we only care about gears touching numbers
      if (!touchingGear) {
        touchingGear = isTouchingGear(x, y);
      }
      digits.push(char);
    } else if (!isGear(char)) {
      // if it's not a gear or a digit set it to false
      updatedSchematic[y][x] = false;
    }
    // if the character isn't a digit, we've reached the end of a number
    // or the end of the row
    if (!charIsDigit || x === columns - 1) {
      if (digits.length) {
        // if we've reached the end of a number, update the schematic
        updateNumber(digits.join(""), x - 1, y, touchingGear);
      }
      // either way we need to reset the digits array and touchingGear flag
      digits = [];
      touchingGear = false;
    }
  }
}

// console.log(updatedSchematic);

const gearRatios = [];
// get gear ratios
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < columns; x++) {
    const element = updatedSchematic[y][x];
    if (element !== "*") continue;

    const adjacentNumbers = getAdjacentNumbers(x, y);
    const uniqueNumbers = [...new Set(adjacentNumbers)];

    if (uniqueNumbers.length === 2) {
      gearRatios.push(uniqueNumbers[0] * uniqueNumbers[1]);
    }
  }
}

console.log(gearRatios.reduce((a, b) => a + b, 0));

function updateNumber(numStr, x, y, touchingGear) {
  const number = Number(numStr);
  const replacement = touchingGear ? number : false;

  for (let i = 0; i < numStr.length; i++) {
    updatedSchematic[y][x - i] = replacement;
  }
}

function getAdjacentNumbers(x, y) {
  const topIsNumber =
    y > 0 ? Number.isFinite(updatedSchematic?.[y - 1][x]) : false;
  const bottomIsNumber =
    y < rows - 1 ? Number.isFinite(updatedSchematic?.[y + 1][x]) : false;
  const leftIsNumber =
    x > 0 ? Number.isFinite(updatedSchematic?.[y][x - 1]) : false;
  const rightIsNumber =
    x < columns - 1 ? Number.isFinite(updatedSchematic?.[y][x + 1]) : false;
  const topLeftIsNumber =
    y > 0 && x > 0 ? Number.isFinite(updatedSchematic?.[y - 1][x - 1]) : false;
  const topRightIsNumber =
    y > 0 && x < columns - 1
      ? Number.isFinite(updatedSchematic?.[y - 1][x + 1])
      : false;
  const bottomLeftIsNumber =
    y < rows - 1 && x > 0
      ? Number.isFinite(updatedSchematic?.[y + 1][x - 1])
      : false;
  const bottomRightIsNumber =
    y < rows - 1 && x < columns - 1
      ? Number.isFinite(updatedSchematic?.[y + 1][x + 1])
      : false;

  return [
    topIsNumber ? updatedSchematic[y - 1][x] : false,
    bottomIsNumber ? updatedSchematic[y + 1][x] : false,
    leftIsNumber ? updatedSchematic[y][x - 1] : false,
    rightIsNumber ? updatedSchematic[y][x + 1] : false,
    topLeftIsNumber ? updatedSchematic[y - 1][x - 1] : false,
    topRightIsNumber ? updatedSchematic[y - 1][x + 1] : false,
    bottomLeftIsNumber ? updatedSchematic[y + 1][x - 1] : false,
    bottomRightIsNumber ? updatedSchematic[y + 1][x + 1] : false,
  ].filter((num) => num);
}

function isTouchingGear(x, y) {
  const topIsGear = y > 0 ? isGear(schematic[y - 1][x]) : false;
  const bottomIsGear = y < rows - 1 ? isGear(schematic[y + 1][x]) : false;
  const leftIsGear = x > 0 ? isGear(schematic[y][x - 1]) : false;
  const rightIsGear = x < columns - 1 ? isGear(schematic[y][x + 1]) : false;
  const topLeftIsGear =
    y > 0 && x > 0 ? isGear(schematic[y - 1][x - 1]) : false;
  const topRightIsGear =
    y > 0 && x < columns - 1 ? isGear(schematic[y - 1][x + 1]) : false;
  const bottomLeftIsGear =
    y < rows - 1 && x > 0 ? isGear(schematic[y + 1][x - 1]) : false;
  const bottomRightIsGear =
    y < rows - 1 && x < columns - 1 ? isGear(schematic[y + 1][x + 1]) : false;

  return (
    topIsGear ||
    bottomIsGear ||
    leftIsGear ||
    rightIsGear ||
    topLeftIsGear ||
    topRightIsGear ||
    bottomLeftIsGear ||
    bottomRightIsGear
  );
}
