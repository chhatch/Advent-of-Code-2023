const fs = require("fs");

const sum = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map(parseCards)
  .map(findMatches)
  .map(scoreGame)
  .reduce((a, b) => a + b, 0);

console.log(sum);

function parseCards(row) {
  const gameData = row.split(": ")[1];
  // using regex because single digit numbers are padded with a space
  return gameData.split(" | ").map((data) => data.match(/\d+/g).map(Number));
}

function findMatches(game) {
  const [winningNumber, yourNumbers] = game;
  const matches = yourNumbers.filter((num) => winningNumber.includes(num));
  return matches.length;
}

function scoreGame(matches) {
  return matches ? 2 ** (matches - 1) : 0;
}
