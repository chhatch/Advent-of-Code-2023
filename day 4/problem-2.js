const fs = require("fs");

const matches = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map(parseCards)
  .map(findMatches);

const cardTotals = Array(matches.length).fill(1);

matches.forEach((num, i) => {
  const copiesOfCurrentCard = cardTotals[i];
  for (let j = 1; j <= num; j++) {
    cardTotals[i + j] += copiesOfCurrentCard;
  }
});

const sum = cardTotals.reduce((a, b) => a + b, 0);
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
