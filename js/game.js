const colors = [
  "#2d3436",
  "#d63031",
  "#0984e3",
  "#fab1a0",
  "#fdcb6e",
  "#00b894",
  "#6c5ce7",
  "#dfe6e9",
];

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const gridWidth = 12;
const gridHeight = 24;

let score = 0;

class Brick {
  constructor() {
    this.y = 0;
    this.x = 6;
    this.y2 = 0;
    this.x2 = 5;
    this.y3 = 0;
    this.x3 = 7;
    this.color = Math.floor(Math.random() * 6) + 1;
    this.turn = false;
  }

  moveLeft(grid) {
    if (
      grid[this.y][this.x - 1] === 0 &&
      grid[this.y2][this.x2 - 1] === 0 &&
      grid[this.y3][this.x3 - 1] === 0
    ) {
      this.x--;
      this.x2--;
      this.x3--;
    }
  }

  moveRight(grid) {
    if (
      grid[this.y][this.x + 1] === 0 &&
      grid[this.y2][this.x2 + 1] === 0 &&
      grid[this.y3][this.x3 + 1] === 0
    ) {
      this.x++;
      this.x2++;
      this.x3++;
    }
  }

  moveDown(grid) {
    if (
      grid[this.y + 1][this.x] === 0 &&
      grid[this.y2 + 1][this.x2] === 0 &&
      grid[this.y3 + 1][this.x3] === 0
    ) {
      this.y++;
      this.y2++;
      this.y3++;
    } else {
      return false;
    }
    return true;
  }

  rotate(grid) {
    if (this.turn) {
      this.y2++;
      this.x2--;
      this.y3--;
      this.x3++;
      this.turn = false;
    } else {
      this.y2--;
      this.x2++;
      this.y3++;
      this.x3--;
      this.turn = true;
    }
  }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const grid = Array.from({ length: gridHeight }, () =>
  Array(gridWidth + 2).fill(0)
);

// 벽 만들기
for (let i = 0; i < gridHeight; i++) {
  grid[i][0] = grid[i][gridWidth + 1] = 7;
}
grid.push(new Array(gridWidth + 2).fill(7));

let brick = null;
let gameRunning = false;

document.addEventListener("keydown", (event) => {
  if (!brick) return;
  if (event.key === "ArrowLeft") brick.moveLeft(grid);
  if (event.key === "ArrowRight") brick.moveRight(grid);
  if (event.key === " ") brick.rotate(grid);
});

const drawGrid = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const top = 50;
  const left = 50;
  const cellSize = 22;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const screenX = left + x * cellSize;
      const screenY = top + y * cellSize;

      ctx.fillStyle =
        y === 3 && grid[y][x] === 7 ? "#d63031" : colors[grid[y][x]];
      ctx.fillRect(screenX, screenY, cellSize, cellSize);
      ctx.strokeRect(screenX, screenY, cellSize, cellSize);
    }
  }

  if (brick) {
    ctx.fillStyle = colors[brick.color];
    ctx.fillRect(
      left + brick.x * cellSize,
      top + brick.y * cellSize,
      cellSize,
      cellSize
    );
    ctx.fillRect(
      left + brick.x2 * cellSize,
      top + brick.y2 * cellSize,
      cellSize,
      cellSize
    );
    ctx.fillRect(
      left + brick.x3 * cellSize,
      top + brick.y3 * cellSize,
      cellSize,
      cellSize
    );
  }
};

const drawScore = () => {
  ctx.fillStyle = "black";
  ctx.font = "20px Courier";
  ctx.fillText("Puyo Puyo Game", 120, 30);
  ctx.font = "15px Courier";
  ctx.fillText("Score", 400, 100);
  ctx.fillText(score.toString().padStart(4, "0"), 410, 120);
};

const DFS = (y, x, color, visited, blank) => {
  visited[y][x] = true;
  blank.push([y, x]);
  for (let i = 0; i < 4; i++) {
    let yy = y + dy[i];
    let xx = x + dx[i];
    if (
      yy >= 0 &&
      yy < 24 &&
      xx >= 1 &&
      xx < 13 &&
      !visited[yy][xx] &&
      grid[yy][xx] === color
    ) {
      DFS(yy, xx, color, visited, blank);
    }
  }
};

const applyGravity = () => {
  for (let x = 1; x < 13; x++) {
    for (let y = 23; y > 0; y--) {
      if (grid[y][x] === 0) {
        let tmpY = y;
        while (tmpY > 0 && grid[tmpY - 1][x] !== 7) {
          grid[tmpY][x] = grid[tmpY - 1][x];
          grid[tmpY - 1][x] = 0;
          tmpY--;
        }
      }
    }
  }
};

const removeBlocks = () => {
  let visited = Array.from({ length: gridHeight }, () =>
    Array(gridWidth).fill(false)
  );

  let removed = false;

  for (let y = 0; y < 24; y++) {
    for (let x = 1; x < 13; x++) {
      if (grid[y][x] !== 0 && grid[y][x] !== 7 && !visited[y][x]) {
        let blank = [];
        DFS(y, x, grid[y][x], visited, blank);
        if (blank.length >= 4) {
          blank.forEach(([yy, xx]) => (grid[yy][xx] = 0));
          removed = true;
          score += blank.length * 10;
        }
      }
    }
  }
  return removed;
};

const maxHeight = (grid) => {
  for (let y = 1; y < 24; y++) {
    for (let x = 1; x < 13; x++) {
      if (grid[y][x] !== 0) {
        return y;
      }
    }
  }
  return 24;
};

const continualRemove = () => {
  while (true) {
    let removed = false;
    let visited = Array.from({ length: gridHeight }, () =>
      Array(gridWidth).fill(false)
    );

    for (let y = 23; y > 15; y--) {
      for (let x = 1; x < 13; x++) {
        if (grid[y][x] !== 0 && !visited[y][x]) {
          let blank = [];
          DFS(y, x, grid[y][x], visited, blank);
          if (blank.length >= 6) {
            gridUpdate(grid, blank);
            removed = true;
            score +=
              blank.length >= 10 ? blank.length * 100 : blank.length * 25;
            drawScore();
            drawGrid();
          }
        }
      }
    }
    if (!removed) break;
  }
};

const gridUpdate = (grid, blank) => {
  blank.forEach(([y, x]) => (grid[y][x] = 0));
  let height = maxHeight(grid);
  applyGravity(height);
};

const gameLoop = () => {
  if (!gameRunning) return;

  if (brick) {
    if (!brick.moveDown(grid)) {
      // 바닥에 닿으면 고정
      grid[brick.y][brick.x] = brick.color;
      grid[brick.y2][brick.x2] = brick.color;
      grid[brick.y3][brick.x3] = brick.color;

      let visited = Array.from({ length: gridHeight }, () =>
        Array(gridWidth).fill(false)
      );

      let blank = [];
      DFS(brick.y, brick.x, brick.color, visited, blank);

      if (blank.length >= 6) {
        gridUpdate(grid, blank);
        score += blank.length >= 10 ? blank.length * 100 : blank.length * 25;
        drawScore();
        continualRemove();
      }

      let height = maxHeight(grid);
      applyGravity(height);

      if (height <= 3) {
        gameOver();
        return;
      }
      if (score >= 2000) {
        drawGrid();
        youWin();
        return;
      }

      brick = new Brick();
      if (!brick.moveDown(grid)) {
        console.log("Game Over");
        gameRunning = false;
        return;
      }
    }
  } else {
    brick = new Brick();
  }

  drawGrid();
  drawScore();
  //   requestAnimationFrame(gameLoop);
  setTimeout(gameLoop, 500);
};

const openGame = () => {
  if (!gameRunning) {
    gameRunning = true;
    brick = new Brick();
    gameLoop();
  }
};

// const closeGame = () => {
//   document.getElementById("gameOverlay").style.display = "none";
// };

const gameStartBtn = document.querySelector("#game-start-btn");
document.getElementById("game-start-btn").addEventListener("click", openGame);
