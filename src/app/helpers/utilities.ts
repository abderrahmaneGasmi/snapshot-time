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
export const choosedirection = (idx: number, length: number) => {
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
  const maxidx = 144;
  const minidx = 0;

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
  return directions[Math.floor(Math.random() * directions.length)];
};
