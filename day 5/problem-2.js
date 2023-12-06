const fs = require("fs");
const { performance } = require("perf_hooks");
const { get } = require("http");

const seedMap = fs.readFileSync("input.txt", "utf8").split("\n\n");

const seedData = seedMap.shift().split(": ")[1].split(" ").map(Number);

const mapSets = seedMap.map(parseMap);

let seedSetsProcessed = 0;
const minimum = seedData
  .reduce(mapToSeedStartAndRange, [])
  .reduce(findMinimumLocation, null);

console.log(minimum);

function findMinimumLocation(currentMin, [start, range]) {
  console.log("Processing seed set", ++seedSetsProcessed);
  console.log(`Time elapsed: ${Math.round(performance.now()) / 1000}s`);
  for (let i = start; i < start + range; i++) {
    const seedLocation = getSeedLocation(i);
    if (currentMin === null) currentMin = seedLocation;
    else currentMin = Math.min(currentMin, seedLocation);
  }
  return currentMin;
}

function getSeedLocation(seedId) {
  return mapSets.reduce((resourceId, mapSet) => {
    let mappingFound = false;
    mapSet.forEach(
      ([destinationRangeStart, sourceRangeStart, rangeLength], i) => {
        if (mappingFound) return;
        if (
          resourceId >= sourceRangeStart &&
          resourceId < sourceRangeStart + rangeLength
        ) {
          resourceId = destinationRangeStart + (resourceId - sourceRangeStart);
          mappingFound = true;
        }
      }
    );
    return resourceId;
  }, seedId);
}

function mapToSeedStartAndRange(acc, val, i) {
  const index = Math.floor(i / 2);
  if (!acc[index]) acc[index] = [];
  acc[index].push(val);
  return acc;
}

function parseMap(text) {
  return text
    .split(":\n")[1]
    .split("\n")
    .map((row) => row.split(" ").map(Number));
}
