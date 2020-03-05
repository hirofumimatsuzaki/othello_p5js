let board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
let turn = 1;
let s = 50;
let col;
let row;
let kururi = 0;
let count = 60;
let white = 0;
let black = 0;

function setup() {
  createCanvas(400, 400);

  textSize(32);
}

function draw() {
  background(0, 140, 0);
  print(count);
  // print(kururi);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      line(j * 50, 0, j * 50, height);
      line(0, i * 50, width, i * 50);
      if (board[i][j] == 1) {
        fill(255);
        ellipse(i * 50 + 25, j * 50 + 25, 40, 40);
      }
      if (board[i][j] == 2) {
        fill(0);
        ellipse(i * 50 + 25, j * 50 + 25, 40, 40);
      }
    }
  }
  if (count == 0) {
    result();
  }
}

function getpos(x, y) {
  let xin = x >= 0 && x < 8;
  let yin = y >= 0 && y < 8;
  if (xin && yin) {
    return board[x][y];
  } else {
    return 0;
  }
}

function setpos(x, y, num) {
  let xin = x >= 0 && x < 8;
  let yin = y >= 0 && y < 8;
  if (xin && yin) {
    board[x][y] = num;
  }
}

function serachReverse(x, y, vx, vy) {
  let state = getpos(x, y);
  let Opponent;
  if (state == 1) {
    Opponent = 2;
  } else {
    Opponent = 1;
  }
  let hit = false;
  let step = 0;
  let stepx = x + vx;
  let stepy = y + vy;
  while (!hit) {
    if (getpos(stepx, stepy) == 0) {
      hit = true;
    }

    if (getpos(stepx, stepy) == Opponent) {
      stepx += vx;
      stepy += vy;
      step++;
    }
    if (step == 0) {
      if (getpos(stepx, stepy) == state) {
        hit = true;
      }
    }
    if (step >= 1) {
      if (getpos(stepx, stepy) == state) {
        hit = true;
        kururi++;
        let fillx = stepx;
        let filly = stepy;
        for (let i = 0; i < step; i++) {
          fillx -= vx;
          filly -= vy;
          setpos(fillx, filly, state);
        }
      }
    }
  }
}


function mousePressed() {
  row = floor(mouseX / s);
  col = floor(mouseY / s);
  if (getpos(row, col) == 0) {
    if (turn == 1) {
      kururi = 0;
      board[row][col] = 1;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          serachReverse(row, col, i, j);
        }
      }
      turn = 2;

      if (kururi == 0) {
        board[row][col] = 0;
        turn = 1;
        count++;
      }
      count--;

    } else if (turn == 2) {
      kururi = 0;
      board[row][col] = 2;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          serachReverse(row, col, i, j);
        }
      }
      turn = 1;

      if (kururi == 0) {
        board[row][col] = 0;
        turn = 2;
        count++;
      }
      count--;
    }


  }
}

function result() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let c = getpos(i, j);
      if (c == 1) {
        white++;
      } else if (c == 2) {
        black++;
      }
    }
  }
  if (white > black) {
    fill(255, 0, 0);
    text("White Win!", 120, 200);
  } else {
    fill(255, 0, 0);
    text("Black Win!", 150, 200);
  }
}

function keyPressed() {
  if (key == 's') {
    turn++;
  }
}
