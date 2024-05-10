"use strict";

const list = document.querySelector(".list");

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
    if (tire === "soft" && stint < 16) {
      if (i === 58) {
        times.push(stintTimes);
      } else {
        if (stint === 15) {
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

const showList = removeDuplicates(allStrategies);

const bestTimeOverall = showList.reduce((acc, cur) => {
  if (acc > cur[2]) {
    acc = cur[2];
    return acc;
  } else {
    return acc;
  }
}, showList[0][2]);

const bestStrategy = showList.find((el) => el[2] === bestTimeOverall);
console.log(bestStrategy);
console.log(`Total number of strategies: ${showList.length}`);
