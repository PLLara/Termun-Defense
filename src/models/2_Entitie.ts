import { Movement } from "./1_Movement";
import { Position } from "./1_Position";
import { Sprite } from "./2_Sprite";

export type ColisionEventProps = {
  // ! top
  top: boolean;
  topLeft: boolean;
  topRight: boolean;
  // ! middle
  samePosition: boolean;
  middleLeft: boolean;
  middleRight: boolean;
  // ! bottom
  bottom: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
  entity?: Entitie | null | undefined;
};

export class ColisionEvent {
  top: boolean;
  topLeft: boolean;
  topRight: boolean;

  bottom: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;

  middleLeft: boolean;
  middleRight: boolean;
  samePosition: boolean;
  entity: Entitie | null | undefined;

  constructor(props: ColisionEventProps) {
    const {
      top,
      topLeft,
      topRight,
      bottom,
      bottomLeft,
      bottomRight,
      middleLeft,
      middleRight,
      samePosition,
      entity,
    } = props;
    this.top = top;
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottom = bottom;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
    this.middleLeft = middleLeft;
    this.middleRight = middleRight;
    this.samePosition = samePosition;
    this.entity = entity;
  }

  toString() {
    return `ColisionEvent: ${this.middleLeft} ${this.middleRight} ${this.bottom} ${this.top} ${this.samePosition} ${this.entity}`;
  }
}

interface EntitieEvents {
  handleKeyboardEvent(event: string): void;
  handlePassiveEvent(): void;
  handleColisionEvent(event: ColisionEvent): void;
}

export class Entitie implements EntitieEvents {
  constructor(
    public position: Position,
    public sprite: Sprite,
    public colision = false,
    public drawPriority = 0,
    public movement = new Movement(false, false, false, false),
    public colisionEvents = new Array<ColisionEvent>()
  ) {
    this.position = position;
    this.sprite = sprite;
    this.colision = colision;
  }
  // toString
  public toString(): string {
    var colisions = `${this.colisionEvents
      .map(
        (event) =>
          (event.entity?.sprite.render() || "#") +
          `->${event.top == true ? "top" : ""}${
            event.topLeft == true ? "tLeft" : ""
          }${event.topRight == true ? "tRight" : ""}${
            event.samePosition == true ? "same" : ""
          }${event.middleLeft == true ? "mLeft" : ""}${
            event.middleRight == true ? "mRight" : ""
          }${event.bottom == true ? "bottom" : ""}${
            event.bottomLeft == true ? "bLeft" : ""
          }${event.bottomRight == true ? "bRight" : ""}`
      )
      .join(" AND ")}`;
    return `${this.sprite.render()} ${JSON.stringify(
      this.position
    )} |  c: ( ${colisions} )`;
  }

  public handleKeyboardEvent(event: string): void {}
  public handlePassiveEvent(): void {}
  public handleColisionEvent(event: ColisionEvent): void {}
}
