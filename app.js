const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext 會回傳一個canvas的drawing context
// drawing context 可用在canvas內畫圖
const unit = 20;
const row = canvas.height / unit; // 320 / 20 = 16
const column = canvas.width / unit; // 320 / 20 = 16
let score = 0;
let myScore = document.getElementById("myScore");
myScore.innerHTML = "Score: " + score;
let hightestScore;
let myScore2 = document.getElementById("myScore2");
loadHightScore();
myScore2.innerHTML = "Hightest Score: " + hightestScore;
let snake = [];
function creatSnake() {
  //創建一個陣列，陣列中每個元素都是一個物件，儲存身體的x, y座標

  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruits {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruits() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  changeLocation() {
    console.log("果實變換位置");
    let location = true;
    let new_x = Math.floor(Math.random() * column) * unit;
    let new_y = Math.floor(Math.random() * row) * unit;

    do {
      snake.forEach((snake) => {
        if (new_x === snake.x && new_y === snake.y) {
          new_x = Math.floor(Math.random() * column) * unit;
          new_y = Math.floor(Math.random() * row) * unit;
        } else {
          this.x = new_x;
          this.y = new_y;
          location = false;
          return;
        }
      });
    } while (location);
  }
}

//初始設定
let furit = new Fruits();
creatSnake();
window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  if (e.key === "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key === "ArrowUp" && d != "Down") {
    d = "Up";
  } else if (e.key === "ArrowRight" && d != "Left") {
    d = "Right";
  } else if (e.key === "ArrowDown" && d != "Up") {
    d = "Down";
  }
  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  //自殺公式
  for (let i = 1; i < snake.length - 1; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      clearInterval(myGame);
      alert("You lose! You ate yourself!");
      return;
    }
  }
  //console.log("正在執行draw...");
  //清空畫布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  furit.drawFruits();
  //畫出蛇
  for (let i = 0; i < snake.length; i++) {
    ctx.strokeStyle = "white"; //給外邊框做設定
    if (i === 0) {
      ctx.fillStyle = "lightgreen"; //填滿的顏色
    } else {
      ctx.fillStyle = "lightblue";
    }
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    } else if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    } else if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    } else if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit); //填滿的位置

    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit); //將邊框加到Rect上
  }
  //設定新頭部位置
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "Right") {
    snakeX += unit;
  } else if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  }
  //製作新頭部
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  //確認蛇是否吃到果實
  if (snake[0].x === furit.x && snake[0].y === furit.y) {
    furit.changeLocation(); //果實重新變換位置
    score++;
    myScore.innerHTML = "Score: " + score;
    setHightScore(score);
    //分數更新
  } else {
    snake.pop(); //不做pop身體就會變長
  }

  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 75);

//最高分設定
// localStorage.clear();
function loadHightScore() {
  if (localStorage.getItem("hightestScore") === null) {
    hightestScore = 0;
  } else {
    hightestScore = Number(localStorage.getItem("hightestScore"));
  }
}

function setHightScore(score) {
  if (score > hightestScore) {
    hightestScore = score;
    localStorage.setItem("hightestScore", hightestScore);
    myScore2.innerHTML = "Hightest Score: " + hightestScore;
  }
}
