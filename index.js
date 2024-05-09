"use strict";

// const driver = {
//   name: "Max Verstappen",
//   averageRacePace: 1000 + 350 + 6,
// };

let averageRacePace = 135600;
const tires = ["soft", "hard"];
// 600ms = 0.6s
//35000ms = 35s
// 60000 = 1s

let times = [];

let stint = 0;

let stintTimes = [];

const strategy = [];

const tireChoice = () => {
  let randomIndex = Math.floor(Math.random() * tires.length);
  return tires[randomIndex];
};

function pitStop() {
  stintTimes.pop();
  times.push(stintTimes);
  stintTimes = [];
  tire = tireChoice();
  strategy.push(tire);
  switch (tire) {
    case "soft":
      stintTimes.push(135600);
      break;
    case "hard":
      stintTimes.push(136600);
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
      }
      const actualTime = stintTimes[stintTimes.length - 1] + 70 - 94;
      stintTimes.push(actualTime);
      stint++;
    }
  }
  if (tire === "hard" && stint < 25) {
    if (i === 58) {
      times.push(stintTimes);
    } else {
      if (stint === 24) {
        pitStop();
        stint = 0;
      }
      const actualTime = stintTimes[stintTimes.length - 1] + 40 - 98;
      stintTimes.push(actualTime);
      stint++;
    }
  }
}

let totalTime = 0;

const allTimes = [];

let count = 1;
for (const el of times) {
  el.map((time) => allTimes.push(time));
}
const sortedTimes = [];

for (const el of allTimes) {
  count++;
  if (count < 60) {
    sortedTimes.push(el);
  }
}

console.log(sortedTimes);
console.log(strategy);

// console.log(`Laps Done ${times.length}`, `Next lap time: ${el / 100000}s`);
// console.log(`Time of the race: ${totalTime / 100000}s`);
