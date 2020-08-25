var blocks = [];
var scl = 100;
var emp;
function setup() {
  createCanvas(300, 300);
  //   for (var i = 0; i < 9; i++) {
  //     blocks.push(new Tile(i % 3, floor(i / 3), i));
  //   }
  emp = new Tile(0, 2, 8);
  var blocks1 = [];
  var blocks2 = [];
  var blocks3 = [];

  blocks1.push(new Tile(0, 0, 3));
  blocks1.push(new Tile(1, 0, 0));
  blocks1.push(new Tile(2, 0, 1));
  blocks2.push(new Tile(0, 1, 4));
  blocks2.push(new Tile(1, 1, 5));
  blocks2.push(new Tile(2, 1, 2));
  blocks3.push(emp);
  blocks3.push(new Tile(1, 2, 6));
  blocks3.push(new Tile(2, 2, 7));
  blocks.push(blocks1);
  blocks.push(blocks2);
  blocks.push(blocks3);
  displayblocks(blocks);
}
function displayblocks(p) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      p[i][j].show();
    }
  }
}
function draw() {
  //   background("#145374");
  //   displayblocks(blocks);
  //   noLoop();
  document.getElementById("wadup").innerHTML = "value= " + genValue(blocks);
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
