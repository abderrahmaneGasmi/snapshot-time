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
