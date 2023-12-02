const fs = require("fs");

colorLimits = { red: 12, green: 13, blue: 14 };

const removeGameLabel = (line) => line.split(": ")[1];

const parseGameData = (gameEntry) =>
  gameEntry
    .split("; ")
    .map((roundEntry) =>
      roundEntry.split(", ").map((roundData) => roundData.split(" "))
    );

const roundIsPossible = (acc, [numStr, color]) =>
  acc && Number(numStr) <= colorLimits[color];

const gameIsPossible = (game) =>
  game.reduce((acc, round) => acc && round.reduce(roundIsPossible, true), true);

const sum = fs
  .readFileSync("../input.txt", "utf8")
  .split("\n")
  .map(removeGameLabel)
  .map(parseGameData)
  .map(gameIsPossible)
  .reduce(
    (acc, gameIsPossible, index) => (gameIsPossible ? acc + index + 1 : acc),
    0
  );

console.log(sum);
