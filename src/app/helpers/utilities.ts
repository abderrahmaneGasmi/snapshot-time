export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const words = {
  fruits: [
    "apple",
    "banana",
    "orange",
    "grape",
    "pear",
    "peach",
    "kiwi",
    "mango",
    "plum",
    "melon",
  ],
  animals: [
    "dog",
    "cat",
    "bird",
    "fish",
    "rabbit",
    "turtle",
    "lion",
    "elephant",
    "zebra",
    "giraffe",
  ],
  colors: [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
  ],
  emotions: [
    "happy",
    "sad",
    "angry",
    "excited",
    "calm",
    "surprised",
    "bored",
    "nervous",
    "content",
    "lonely",
  ],
  countries: [
    "USA",
    "Canada",
    "Mexico",
    "Brazil",
    "Argentina",
    "France",
    "Germany",
    "Italy",
    "Japan",
    "Australia",
  ],
  sports: [
    "soccer",
    "basketball",
    "tennis",
    "swimming",
    "volleyball",
    "golf",
    "baseball",
    "hockey",
    "cycling",
    "running",
  ],
};
export const getrandomword = (oldwords: Array<string> = []) => {
  const keys = [
    "fruits",
    "animals",
    "colors",
    "emotions",
    "countries",
    "sports",
  ] as Array<keyof typeof words>;

  while (true) {
    const randomkey = keys[Math.floor(Math.random() * keys.length)];
    const randomword =
      words[randomkey][Math.floor(Math.random() * words[randomkey].length)];
    if (!oldwords.includes(randomword)) {
      return randomword;
    }
  }
};
export const choosedirection = (
  idx: number,
  length: number,
  oldidxs: Array<number> = []
) => {
  const directions = [
    "up",
    "down",
    "left",
    "right",
    "upleft",
    "upright",
    "downleft",
    "downright",
  ];
  const maxidx = 143;
  const minidx = 0;
  if (oldidxs.includes(idx)) return "";

  if (idx % 12 === 0) {
    directions.splice(directions.indexOf("upleft"), 1);
    directions.splice(directions.indexOf("downleft"), 1);
  }
  if (idx % 12 === 11) {
    directions.splice(directions.indexOf("upright"), 1);
    directions.splice(directions.indexOf("downright"), 1);
  }
  if (idx < 12) {
    directions.splice(directions.indexOf("up"), 1);
    directions.splice(directions.indexOf("upleft"), 1);
    directions.splice(directions.indexOf("upright"), 1);
  }
  if (idx > 131) {
    directions.splice(directions.indexOf("down"), 1);
    directions.splice(directions.indexOf("downleft"), 1);
    directions.splice(directions.indexOf("downright"), 1);
  }
  if (idx % 12 === 0 && idx < 12) {
    directions.splice(directions.indexOf("upleft"), 1);
  }
  if (idx % 12 === 0 && idx > 131) {
    directions.splice(directions.indexOf("downleft"), 1);
  }
  if (idx % 12 === 11 && idx < 12) {
    directions.splice(directions.indexOf("upright"), 1);
  }
  if (idx % 12 === 11 && idx > 131) {
    directions.splice(directions.indexOf("downright"), 1);
  }

  // check if the word future indexes are already taken
  if (directions.length > 0) {
    if (directions.includes("up")) {
      for (let i = 1; i < length; i++) {
        if (idx - i * 12 < minidx)
          directions.splice(directions.indexOf("up"), 1);

        if (oldidxs.includes(idx - i * 12)) {
          directions.splice(directions.indexOf("up"), 1);
        }
      }
    }
    if (directions.includes("down")) {
      for (let i = 1; i < length; i++) {
        if (idx + i * 12 > 131)
          directions.splice(directions.indexOf("down"), 1);

        if (oldidxs.includes(idx + i * 12)) {
          directions.splice(directions.indexOf("down"), 1);
        }
      }
    }
    if (directions.includes("left")) {
      for (let i = 1; i < length; i++) {
        if ((idx - i) % 12 > idx % 12 || idx - i < 0)
          directions.splice(directions.indexOf("left"), 1);
        if (oldidxs.includes(idx - i)) {
          directions.splice(directions.indexOf("left"), 1);
        }
      }
    }
    if (directions.includes("right")) {
      for (let i = 1; i < length; i++) {
        if ((idx + i) % 12 < idx % 12 || idx + i > maxidx)
          directions.splice(directions.indexOf("right"), 1);
        if (oldidxs.includes(idx + i)) {
          directions.splice(directions.indexOf("right"), 1);
        }
      }
    }
    if (directions.includes("upleft")) {
      for (let i = 1; i < length; i++) {
        if (idx - i * 12 - i < 0 || (idx - i * 12 - i) % 12 > idx % 12)
          directions.splice(directions.indexOf("upleft"), 1);
        if (oldidxs.includes(idx - i * 12 - i)) {
          directions.splice(directions.indexOf("upleft"), 1);
        }
      }
    }
    if (directions.includes("upright")) {
      for (let i = 1; i < length; i++) {
        if (idx - i * 12 + i < 0 || (idx - i * 12 + i) % 12 < idx % 12)
          directions.splice(directions.indexOf("upright"), 1);
        if (oldidxs.includes(idx - i * 12 + i)) {
          directions.splice(directions.indexOf("upright"), 1);
        }
      }
    }
    if (directions.includes("downleft")) {
      for (let i = 1; i < length; i++) {
        if (idx + i * 12 - i > maxidx || (idx + i * 12 - i) % 12 > idx % 12)
          directions.splice(directions.indexOf("downleft"), 1);
        if (oldidxs.includes(idx + i * 12 - i)) {
          directions.splice(directions.indexOf("downleft"), 1);
        }
      }
    }
    if (directions.includes("downright")) {
      for (let i = 1; i < length; i++) {
        if (idx + i * 12 + i > maxidx || (idx + i * 12 + i) % 12 < idx % 12)
          directions.splice(directions.indexOf("downright"), 1);
        if (oldidxs.includes(idx + i * 12 + i)) {
          directions.splice(directions.indexOf("downright"), 1);
        }
      }
    }
  }

  return directions[Math.floor(Math.random() * directions.length)];
};
