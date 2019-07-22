let palette = {
  "blue": "#0078bf",
  "green": "#00aa5b",
  "purple": "#702269",
  "orange": "#ed312f",
  "brown": "#5f3c25",

};

export function getRandomColor() {
  let colors = Object.keys(palette);
  let randomIndex = Math.floor(Math.random() * colors.length);
  return palette[colors[randomIndex]]
}
