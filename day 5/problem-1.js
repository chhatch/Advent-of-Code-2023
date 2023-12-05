const fs = require("fs");

const seedMap = fs.readFileSync("input.txt", "utf8").split("\n\n");

const seeds = seedMap.shift().split(": ")[1].split(" ").map(Number);

const mapSets = seedMap.map(parseMap);

const seedLocations = seeds.map((seed) =>
  mapSets.reduce((resourceId, mapSet) => {
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
  }, seed)
);

console.log(Math.min(...seedLocations));

function parseMap(text) {
  return text
    .split(":\n")[1]
    .split("\n")
    .map((row) => row.split(" ").map(Number));
}
