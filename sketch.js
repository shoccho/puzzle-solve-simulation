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
  genValue(blocks);
}
function displayblocks(p) {
  background("#145374");
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
  //   document.getElementById("wadup").innerHTML = "value= " + genValue(blocks);
  if (genValue(blocks) == 0) {
    alert("congrats! you have no life!");
  }
}
function mouseClicked() {
  var my = floor(mouseY / scl);
  var mx = floor(mouseX / scl);
  //   console.log(mx, my);
  if (abs(mx - emp.x) + abs(my - emp.y) == 1) {
    if (emp.x + 1 == mx) {
      emp = swapRight(blocks, emp);
    } else if (emp.x - 1 == mx) {
      emp = swapLeft(blocks, emp);
    } else if (emp.y - 1 == my) {
      emp = swapUp(blocks, emp);
    } else if (emp.y + 1 == my) {
      emp = swapDown(blocks, emp);
    }
  }
  updateDisplay();
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    emp = swapUp(blocks, emp);
  } else if (keyCode === DOWN_ARROW) {
    emp = swapDown(blocks, emp);
  } else if (keyCode === LEFT_ARROW) {
    emp = swapLeft(blocks, emp);
  } else if (keyCode === RIGHT_ARROW) {
    emp = swapRight(blocks, emp);
  }
  updateDisplay();
}
function updateDisplay() {
  genValue(blocks);
  displayblocks(blocks);
}
function genValue(blocks) {
  var value = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var pos = 3 * i + j;
      if (blocks[i][j].v != pos) value += 1;
    }
  }
  return value;
}
function swapUp(bocks, emp) {
  temp = bocks[emp.y - 1][emp.x].v;
  bocks[emp.y - 1][emp.x].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y - 1][emp.x];
  return emp;
}

function swapDown(bocks, emp) {
  temp = bocks[emp.y + 1][emp.x].v;
  bocks[emp.y + 1][emp.x].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y + 1][emp.x];
  return emp;
}

function swapLeft(bocks, emp) {
  temp = bocks[emp.y][emp.x - 1].v;
  bocks[emp.y][emp.x - 1].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y][emp.x - 1];
  return emp;
}

function swapRight(bocks, emp) {
  temp = bocks[emp.y][emp.x + 1].v;
  bocks[emp.y][emp.x + 1].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y][emp.x + 1];
  return emp;
}

class Tile {
  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
  }
  show() {
    fill("#206a5d");
    square(this.x * scl + 3, this.y * scl + 3, scl - 6);
    fill(255);
    textSize(50);
    textAlign(LEFT);
    if (this.v != 8)
      text(this.v + 1, this.x * scl + scl / 3, this.y * scl + scl / 3, scl);
  }
}
