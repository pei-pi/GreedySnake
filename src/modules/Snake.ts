class Snake {
  // 表示蛇头的元素
  head: HTMLElement;
  //   表示蛇的身体（包括蛇头）
  bodies: HTMLCollection;
  //   获取蛇的容器
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div")!;
    this.bodies = this.element.getElementsByTagName("div")!;
  }
  //   获取蛇的坐标（蛇头）
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  //   设置蛇的坐标
  set X(value) {
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了！");
    }
    // 判断蛇是否发生掉头
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      // 如果发生掉头，让蛇往反方向移动
      if (value > this.X) {
        // 如果新value值大于旧值x，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.checkHeadBody();
    this.moveBody();
    this.head.style.left = value + "px";
  }
  set Y(value) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了！");
    }
    // 判断蛇是否发生掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // 如果发生掉头，让蛇往反方向移动
      if (value > this.Y) {
        // 如果新value值大于旧值x，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.checkHeadBody();
    this.moveBody();
    this.head.style.top = value + "px";
  }
  //   蛇增加身体的方法
  addBody() {
    // 向element中添加div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  //   蛇移动的方法
  moveBody() {
    // 将后边的身体设置为前边身体的位置
    // 遍历获取所有身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("撞到自己了！");
      }
    }
  }
}

export default Snake;
