import { Location } from "./1_Position";

export class Movement {
  constructor(
    public left: boolean,
    public right: boolean,
    public up: boolean,
    public down: boolean
  ) {
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
  }

  public moveLeft(position: Location, delta = 1) {
    if (position.x > 1 && this.left) {
      position.x -= 1;
    }
    if (delta > 1) {
      this.moveLeft(position, delta - 1);
    }
  }
  public moveUp(position: Location, delta = 1) {
    if (position.y > 1 &&this.up) {
      position.y -= 1;
    }
    if (delta > 1) {
      this.moveUp(position, delta - 1);
    }
  }

  public moveRight(position: Location, delta = 1) {
    if (this.right) {
      position.x += 1;
    }
    if (delta > 1) {
      this.moveRight(position, delta - 1);
    }
  }

  public moveDown(position: Location, delta = 1) {
    if (this.down) {
      position.y += 1;
    }
    if (delta > 1) {
      this.moveDown(position, delta - 1);
    }
  }
}
