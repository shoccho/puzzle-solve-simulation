var blocks = [];
var scl = 100;
function setup() {
  createCanvas(300, 300);
  for (var i = 0; i < 9; i++) {
    blocks.push(new Tile(i % 3, floor(i / 3), i));
  }
  //   blocks.push();
}

function draw() {
  background("#145374");
  for (var i = 0; i < 9; i++) {
    blocks[i].show();
  }
}
function mouseClicked() {
  console.log(genValue(blocks));
}
class Tile {
  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
  }
  show() {
    fill("#EE6F57");
    square(this.x * scl + 3, this.y * scl + 3, scl - 6);
    fill(255);
    textSize(50);
    textAlign(LEFT);
    if (this.v != 8)
      text(this.v + 1, this.x * scl + scl / 3, this.y * scl + scl / 3, scl);
  }
}

function genValue(blocks) {
  var val = 0;
  for (var i = 0; i < 9; i++) {
    val += abs(blocks[i].v - i);
  }
  return val;
}
