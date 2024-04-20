export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getrandomsnakefood = (
  takenlocations: { x: number; y: number }[],
  vars: { canvaswidth: number; canvasheight: number; wormsize: number }
) => {
  let x =
    Math.floor((Math.random() * vars.canvaswidth) / vars.wormsize) *
    vars.wormsize;
  let y =
    Math.floor((Math.random() * vars.canvasheight) / vars.wormsize) *
    vars.wormsize;
  while (takenlocations.some((loc) => loc.x == x && loc.y == y)) {
    x =
      Math.floor((Math.random() * vars.canvaswidth) / vars.wormsize) *
      vars.wormsize;
    y =
      Math.floor((Math.random() * vars.canvasheight) / vars.wormsize) *
      vars.wormsize;
  }
  return { x, y };
};
export const getrandomcolorforsnake = () => {
  return "#1fa67e";
  // return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
export function calculateDelay(speed: number) {
  // Define the input and output ranges
  const inputMin = 1;
  const inputMax = 10;
  const outputMin = 600;
  const outputMax = 25;

  // Calculate the output based on the input
  const output =
    outputMin +
    ((outputMax - outputMin) * (speed - inputMin)) / (inputMax - inputMin);

  // Return the calculated output
  console.log(output);
  return output;
}
export function isPrime(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3, sqrt = Math.sqrt(num); i <= sqrt; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
export function getnextdirection(
  direction: "right" | "up" | "left" | "down",
  Dtype = "anticlockwise" as "clockwise" | "anticlockwise"
) {
  if (Dtype === "clockwise") {
    switch (direction) {
      case "right":
        return "down";
      case "down":
        return "left";
      case "left":
        return "up";
      case "up":
        return "right";
    }
  } else {
    switch (direction) {
      case "right":
        return "up";
      case "up":
        return "left";
      case "left":
        return "down";
      case "down":
        return "right";
    }
  }
}
