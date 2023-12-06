const fs = require("fs");
const { performance } = require("perf_hooks");
const { get } = require("http");
const { flow } = require("lodash");

const raceData = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map(parseRaceData);

const product = flow(
  findTimesToEqualDistance,
  roundTimes,
  quantifyWaysToWin
)(raceData);

function quantifyWaysToWin([time1, time2]) {
  return time2 - time1 + 1;
}

function roundTimes([firstTime, secondTime]) {
  // first time mapped to next integer greater than it
  // second time mapped to next integer less than it
  return [Math.floor(firstTime) + 1, Math.ceil(secondTime) - 1];
}

function findTimesToEqualDistance([t, d]) {
  const firstTime = (t - (t ** 2 - 4 * d) ** 0.5) / 2;
  const secondTime = (t + (t ** 2 - 4 * d) ** 0.5) / 2;
  return [firstTime, secondTime];
}

function toPairs(acc, arr) {
  arr.forEach((val, i) => {
    if (!acc[i]) acc[i] = [];
    acc[i].push(val);
  });
  return acc;
}

function parseRaceData(line) {
  const digitStr = line
    .split(":")[1]
    .match(/(\d+)/g)
    .reduce((accStr, numberDigits) => accStr + numberDigits, "");

  return Number(digitStr);
}

console.log(product);
