let palette = {
  "blue": "#0078bf",
  "aqua": "#00bccd",
  "green": "#00aa5b",
  "purple": "#702269",
  "maroon": "#b51b58",
  "red": "#ed312f",
  "orange": "#f58a33",
  "brown": "#5f3c25",
};

export function getRandomColor() {
  let colors = Object.keys(palette);
  let randomIndex = Math.floor(Math.random() * colors.length);
  return palette[colors[randomIndex]]
}
