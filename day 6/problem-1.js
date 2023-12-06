const fs = require("fs");
const { performance } = require("perf_hooks");
const { get } = require("http");

const product = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map(parseRaceData)
  .reduce(toPairs, [])
  .map(findTimesToEqualDistance)
  .map(roundTimes)
  .map(quantifyWaysToWin)
  .reduce((acc, val) => acc * val, 1);

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
  return line.split(":")[1].match(/(\d+)/g).map(Number);
}

console.log(product);
