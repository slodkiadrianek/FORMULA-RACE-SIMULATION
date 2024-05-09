"use strict";

// const driver = {
//   name: "Max Verstappen",
//   averageRacePace: 1000 + 350 + 6,
// };

function raceSim() {
  const tires = ["soft", "hard"];

  let times = [];

  let stint = 0;

  let stintTimes = [];

  const strategy = [];

  let laps = 0;

  const tireChoice = () => {
    let randomIndex = Math.floor(Math.random() * tires.length);
    return tires[randomIndex];
  };

  function pitStop() {
    times.push(stintTimes);
    stintTimes = [];
    tire = tireChoice();
    strategy.push(tire);
    switch (tire) {
      case "soft":
        stintTimes.push(135600 - laps);
        break;
      case "hard":
        stintTimes.push(136600 - laps);
        break;
    }
  }

  let tire;
  if (stint === 0) {
    tire = "soft";
    strategy.push(tire);
    switch (tire) {
      case "soft":
        stintTimes = [135600];
        break;
      case "hard":
        stintTimes = [136600];
        break;
    }
  }

  for (let i = 1; i < 59; i++) {
    if (tire === "soft" && stint < 17) {
      if (i === 58) {
        times.push(stintTimes);
      } else {
        if (stint === 16) {
          pitStop();
          stint = 0;
        } else {
          laps += 94;
          const actualTime = stintTimes[stintTimes.length - 1] + 70 - 94;
          stintTimes.push(actualTime);
          stint++;
        }
      }
    }
    if (tire === "hard" && stint < 25) {
      if (i === 58) {
        times.push(stintTimes);
      } else {
        if (stint === 24) {
          pitStop();
          stint = 0;
        } else {
          laps += 98;
          const actualTime = stintTimes[stintTimes.length - 1] + 40 - 98;
          stintTimes.push(actualTime);
          stint++;
        }
      }
    }
  }

  let totalTime = 0;
  const sortedTimes = [];

  let count = 1;
  for (const el of times) {
    el.flatMap((time) => {
      count++;
      if (count < 60) {
        sortedTimes.push(time);
      }
    });
  }
  for (const el of sortedTimes) {
    totalTime += el;
  }
  totalTime += 24000 * strategy.length - 1;
  // console.log(laps);
  return [sortedTimes, strategy, totalTime];
}

const allStrategies = [raceSim()];

for (let i = 0; i < 50; i++) {
  allStrategies.push(raceSim());
}

function removeDuplicates(arr) {
  const uniqueArray = [];
  const soFar = {};
  for (let i = 0; i < arr.length; i++) {
    if (!soFar[arr[i]]) {
      uniqueArray.push(arr[i]);
      soFar[arr[i]] = true;
    }
  }
  // console.log(soFar);
  // console.log(uniqueArray);
  return uniqueArray;
}

const allSortedStrategies = new Set([...allStrategies]);

console.log(removeDuplicates(allStrategies));
// console.log(sortedTimes);
// console.log(strategy);

// console.log(`Laps Done ${times.length}`, `Next lap time: ${el / 100000}s`);
// console.log(`Time of the race: ${totalTime / 100000}s`);
