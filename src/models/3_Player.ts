import { BgColors, Colors } from "../constants/Colors";
import { Game } from "../core/Game";
import { Movement } from "./1_Movement";
import { Position } from "./1_Position";
import { ColisionEvent, Entitie } from "./2_Entitie";
import { setCursorPosition, Sprite } from "./2_Sprite";

export class Player extends Entitie {
  constructor(public lastJump = 0) {
    super(
      new Position(),
      new Sprite(" ", Colors.Blue, BgColors.Blue),
      true,
      1,
      new Movement(true, true, true, true)
    );
    this.lastJump = 0;
  }

  public handleKeyboardEvent(event: string): void {
    switch (event) {
      case "w":
        if (!this.movement.down) {
          this.movement.moveUp(this.position, 4);
        }
        this.lastJump = parseInt(Game.time.toPrecision(2)) +1 ;
        break;
      case "s":
        this.movement.moveDown(this.position, 1);
        break;
      case "a":
        this.movement.moveLeft(this.position);
        break;
      case "d":
        this.movement.moveRight(this.position);
        break;
    }
  }

  public handlePassiveEvent(): void {
    this.movement.right = true;
    this.movement.left = true;
    this.movement.up = true;
    this.movement.down = true;
    setCursorPosition(0, 20);

    this.colisionEvents.forEach((event) => {
      this.handleColisionEvent(event);
    });
    if ((Game.time - this.lastJump) % 100 == 0) {
      this.movement.moveDown(this.position, 1);
    }
  }

  public handleColisionEvent(event: ColisionEvent): void {
    if (event.entity == null || event.entity.colision) {
      if (event.middleRight) {
        this.movement.right = false;
      }
      if (event.bottom) {
        this.movement.down = false;
      }
      if (event.middleLeft) {
        this.movement.left = false;
      }
      if (event.top) {
        this.movement.up = false;
      }
    }
  }
}
