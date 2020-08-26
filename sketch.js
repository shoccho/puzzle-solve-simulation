//global stuffs
var blocks = [];
var scl = 100;
var emp;
var moves = 0;
document.getElementById("loadExam").onclick = genExamBoard;
document.getElementById("loadNormal").onclick = genBoard;
document.getElementById("randomize").onclick = randomize;

// necessary functions
function setup() {
  createCanvas(300, 300);
}
function draw() {}

// randomizing the grid
function randomize() {
  for (i = 0; i < 200; i++) {
    let p = Math.floor(Math.random() * 4);
    console.log(p);
    if (p == 0 && emp.x < 2) {
      emp = swapRight(blocks, emp);
    } else if (p == 1 && emp.x > 0) {
      emp = swapLeft(blocks, emp);
    } else if (p == 2 && emp.y > 0) {
      emp = swapUp(blocks, emp);
    } else if (p == 3 && emp.y < 2) {
      emp = swapDown(blocks, emp);
    }
  }
  moves = 0;
  displayblocks(blocks);
}

// generating a solved grid
function genBoard() {
  moves = 0;
  blocks = [];
  emp = null;
  for (var i = 0; i < 3; i++) {
    var blocks1 = [];
    for (var j = 0; j < 3; j++) {
      if (i == 2 && j == 2) {
        emp = new Tile(2, 2, 8);
        blocks1.push(emp);
      } else blocks1.push(new Tile(j, i, i * 3 + j));
    }
    blocks.push(blocks1);
  }
  displayblocks(blocks);
}

// generating the puzzle that was given in our exam
function genExamBoard() {
  moves = 0;
  blocks = [];
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

// displaying the puzzle
function displayblocks(p) {
  background("#145374");
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      p[i][j].show();
    }
  }
  if (genValue(blocks) == 0 && moves != 0) {
    document.getElementById("solved").innerHTML = "You've solved the puzzle !";
  }
  document.getElementById("moves").innerHTML =
    "Total number of moves = " + moves;
}

// handle mouse clicks or touches
function mouseClicked() {
  var my = floor(mouseY / scl);
  var mx = floor(mouseX / scl);
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

// handle keyboard inputs
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

// updating score and puzzle and text
function updateDisplay() {
  genValue(blocks);
  displayblocks(blocks);
  document.getElementById("wadup").innerHTML =
    "Pieces out of place = " + genValue(blocks);
}

// generating pieces out of place or heurisitc
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

// movement of empty tile

function swapUp(bocks, emp) {
  temp = bocks[emp.y - 1][emp.x].v;
  bocks[emp.y - 1][emp.x].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y - 1][emp.x];
  moves += 1;
  return emp;
}
function swapDown(bocks, emp) {
  temp = bocks[emp.y + 1][emp.x].v;
  bocks[emp.y + 1][emp.x].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y + 1][emp.x];
  moves += 1;
  return emp;
}
function swapLeft(bocks, emp) {
  temp = bocks[emp.y][emp.x - 1].v;
  bocks[emp.y][emp.x - 1].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y][emp.x - 1];
  moves += 1;
  return emp;
}
function swapRight(bocks, emp) {
  temp = bocks[emp.y][emp.x + 1].v;
  bocks[emp.y][emp.x + 1].v = emp.v;
  emp.v = temp;
  emp = bocks[emp.y][emp.x + 1];
  moves += 1;
  return emp;
}

// tile object
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
      // selected the 9th tile as the empty tile for convienece
      text(this.v + 1, this.x * scl + scl / 3, this.y * scl + scl / 3, scl);
  }
}
