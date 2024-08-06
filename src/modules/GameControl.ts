import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其他所有类
class GameControl {
  // 定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  // 存储蛇的移动方向
  direction: string = "";
  //   创建一个属性记录游戏是否结束
  isLive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }
  // 游戏的初始化方法
  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    this.run();
  }
  // 创建键盘按下的响应函数
  keyDownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }

  // 创建一个控制蛇移动的方法
  run() {
    // 根据this.direction来使蛇的位置改变
    let x = this.snake.X;
    let y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
    }

    // 检查蛇是否吃到了食物
    this.checkEat(x, y);

    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (e) {
      alert((e as Error).message + "Game over!");
      this.isLive = false;
    }

    // 开启一个定时调用
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  //   定义一个方法，用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }
}

export default GameControl;
