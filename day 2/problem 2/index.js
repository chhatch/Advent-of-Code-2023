const fs = require("fs");

const removeGameLabel = (line) => line.split(": ")[1];

const parseGameData = (gameEntry) =>
  gameEntry
    .split("; ")
    .map((roundEntry) =>
      roundEntry.split(", ").map((roundData) => roundData.split(" "))
    );
const initialColorCount = () => ({
  red: 0,
  green: 0,
  blue: 0,
});
const newColorMax = (current, candidate) =>
  candidate ? Math.max(current, Number(candidate)) : current;

const findGameMax = (rounds) =>
  rounds.reduce((acc, [numStr, color]) => {
    acc[color] = newColorMax(acc[color], numStr);
    return acc;
  }, initialColorCount());

const findMaxColors = (gameData) =>
  gameData.reduce((roundAcc, rounds) => {
    const maxForGame = findGameMax(rounds);
    return {
      red: Math.max(roundAcc.red, maxForGame.red),
      green: Math.max(roundAcc.green, maxForGame.green),
      blue: Math.max(roundAcc.blue, maxForGame.blue),
    };
  }, initialColorCount());

const calculatePowers = (maxColors) =>
  maxColors.red * maxColors.green * maxColors.blue;

const sum = fs
  .readFileSync("../input.txt", "utf8")
  .split("\n")
  .map(removeGameLabel)
  .map(parseGameData)
  .map(findMaxColors)
  .map(calculatePowers)
  .reduce((acc, curr) => acc + curr, 0);

console.log(sum);
