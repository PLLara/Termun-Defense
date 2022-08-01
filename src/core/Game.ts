import { green } from "./../../node_modules/iohook/node_modules/colorette/index.d";
import { BgColors, Colors } from "../constants/Colors";
import { Movement } from "../models/1_Movement";
import { Position } from "../models/1_Position";
import {
  ColisionEvent,
  ColisionEventProps,
  Entitie,
} from "../models/2_Entitie";
import { setCursorPosition, Sprite } from "../models/2_Sprite";
import { Player } from "../models/3_Player";

export class Canvas {
  constructor(
    public width: number,
    public height: number,
    public background: Sprite = new Sprite(" ", Colors.Black, BgColors.Black),
    public wall = new Sprite("#", Colors.White, BgColors.Black),
    public foreground: Entitie[] = [],
    public entities: Entitie[] = []
  ) {
    this.width = width;
    this.height = height;
  }

  produceBgAndFg(frame: string[]): string[] {
    for (var row = 0; row < this.height; row++) {
      for (var column = 0; column < this.width; column++) {
        frame.push(this.background.render());
      }
    }
    return frame;
  }

  produceFrame(): string[] {
    // ! Declaring variables
    var frame: string[] = [];

    // ! Executing logic

    // * Render background
    frame = this.produceBgAndFg(frame);

    // * Render entities
    for (var row = 0; row < this.height; row++) {
      for (var column = 0; column < this.width; column++) {
        const line = row * this.width;
        const position = line + column;

        if (
          row == 0 ||
          column == 0 ||
          row == this.height - 1 ||
          column == this.width - 1
        ) {
          frame[position] = this.wall.render();
        }

        var entitiesAtPosition = this.entities.filter(
          (entity) => entity.position.x === column && entity.position.y === row
        );

        entitiesAtPosition.sort((a, b) => {
          return a.drawPriority - b.drawPriority;
        });

        if (entitiesAtPosition.length > 0) {
          frame[position] = entitiesAtPosition[0].sprite.render();
        }
      }
    }
    return frame;
  }
}

export class Game {
  static time = 0;
  static sleep = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  // * Game assets
  static canvases: Canvas[] = [
    new Canvas(
      80,
      15,
      new Sprite(" ", Colors.Black, BgColors.Black),
      new Sprite("#", Colors.White, BgColors.Black),
      [],
      [
        new Player(),

        new Entitie(
          new Position(13, 4),
          new Sprite(" ", Colors.Blue, BgColors.Green),
          true,
          1,
          new Movement(true, true, true, true)
        ),

        new Entitie(
          new Position(12, 7),
          new Sprite(" ", Colors.Blue, BgColors.Green),
          true,
          1,
          new Movement(true, true, true, true)
        ),

        new Entitie(
          new Position(9, 10),
          new Sprite(" ", Colors.Blue, BgColors.Green),
          true,
          1,
          new Movement(true, true, true, true)
        ),

        new Entitie(
          new Position(9, 15),
          new Sprite(" ", Colors.Blue, BgColors.Green),
          true,
          1,
          new Movement(true, true, true, true)
        ),

        new Entitie(
          new Position(9, 20),
          new Sprite(" ", Colors.Blue, BgColors.Green),
          true,
          1,
          new Movement(true, true, true, true)
        ),

        new Entitie(
          new Position(9, 25),
          new Sprite(" ", Colors.Blue, BgColors.Green),
          true,
          1,
          new Movement(true, true, true, true)
        ),

        // new Entitie(
        //   new Position(3, 4),
        //   new Sprite(" ", Colors.Blue, BgColors.Green),
        //   true,
        //   1,
        //   new Movement(true, true, true, true)
        // ),
        // new Entitie(
        //   new Position(6, 7),
        //   new Sprite(" ", Colors.Blue, BgColors.Green),
        //   true,
        //   1,
        //   new Movement(true, true, true, true)
        // ),
        // new Entitie(
        //   new Position(3, 11),
        //   new Sprite(" ", Colors.Blue, BgColors.Green),
        //   true,
        //   1,
        //   new Movement(true, true, true, true)
        // ),
        // new Entitie(
        //   new Position(7, 30),
        //   new Sprite(" ", Colors.Blue, BgColors.Green),
        //   true,
        //   1,
        //   new Movement(true, true, true, true)
        // ),
        // new Entitie(
        //   new Position(7, 45),
        //   new Sprite(" ", Colors.Blue, BgColors.Green),
        //   true,
        //   1,
        //   new Movement(true, true, true, true)
        // ),
        // new Entitie(
        //   new Position(6, 45),
        //   new Sprite(" ", Colors.Blue, BgColors.Green),
        //   true,
        //   1,
        //   new Movement(true, true, true, true)
        // ),
      ]
    ),
  ];
  static currentCanvasIndex = 0;
  static get currentCanvas() {
    return Game.canvases[Game.currentCanvasIndex];
  }

  static triggerAllEntitiesPassiveEvents() {
    Game.canvases.forEach((canvas) => {
      canvas.entities.forEach((entity) => {
        entity.handlePassiveEvent();
      });
    });
  }

  static triggetAllEntitiesColisionEvents() {
    Game.canvases.forEach((canvas) => {
      setCursorPosition(0, this.currentCanvas.height + 2);

      canvas.entities.forEach((entity) => {
        // console.log(entity.toString());
        var colisions: ColisionEvent[] = [];

        // ! Detecting colisions with walls
        if (entity.position.x === this.currentCanvas.width - 2) {
          var colisionProps: ColisionEventProps = {
            top: false,
            topLeft: false,
            topRight: false,
            samePosition: false,
            middleLeft: false,
            middleRight: true,
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
          };
          colisions.push(new ColisionEvent(colisionProps));
        }
        if (entity.position.y === this.currentCanvas.height - 2) {
          var colisionProps: ColisionEventProps = {
            top: false,
            topLeft: false,
            topRight: false,
            samePosition: false,
            middleLeft: false,
            middleRight: false,
            bottom: true,
            bottomLeft: false,
            bottomRight: false,
          };
          colisions.push(new ColisionEvent(colisionProps));
        }

        // ! Detecting colisions with other entities
        canvas.entities.forEach((entity2) => {
          if (entity == entity2) {
            return;
          }

          const sameX = entity2.position.x === entity.position.x;
          const sameY = entity2.position.y === entity.position.y;
          const left = entity2.position.x - entity.position.x === -1;
          const right = entity2.position.x - entity.position.x === 1;

          const top = sameX && entity2.position.y - entity.position.y === -1;
          const topLeft =
            entity2.position.x - entity.position.x === -1 &&
            entity2.position.y - entity.position.y === -1;
          const topRight =
            entity2.position.x - entity.position.x === 1 &&
            entity2.position.y - entity.position.y === -1;

          const samePosition = sameY && sameX;
          const middleLeft = sameY && left;
          const middleRight = sameY && right;

          const bottom = sameX && entity2.position.y - entity.position.y === 1;
          const bottomLeft =
            entity2.position.x - entity.position.x === -1 &&
            entity2.position.y - entity.position.y === 1;
          const bottomRight =
            entity2.position.x - entity.position.x === 1 &&
            entity2.position.y - entity.position.y === 1;

          if (
            top ||
            topRight ||
            topLeft ||
            samePosition ||
            middleRight ||
            middleLeft ||
            bottom ||
            bottomRight ||
            bottomLeft
          ) {
            var colisionProps: ColisionEventProps = {
              top: top,
              topLeft: topLeft,
              topRight: topRight,
              samePosition: samePosition,
              middleLeft: middleLeft,
              middleRight: middleRight,
              bottom: bottom,
              bottomLeft: bottomLeft,
              bottomRight: bottomRight,
              entity: entity2,
            };
            colisions.push(new ColisionEvent(colisionProps));
          }
        });
        entity.colisionEvents = colisions;
      });
      console.log(Game.time);
    });
  }

  // ! Frame
  static frameRenderCount = 0;
  static lastFrame: string[] = [];
  static renderCurrentCanvas() {
    // * Variables
    const currentCanvas = Game.currentCanvas;
    const frame = currentCanvas.produceFrame();

    // * Executing logic
    for (var row = 0; row < currentCanvas.height; row++) {
      for (var column = 0; column < currentCanvas.width; column++) {
        const position = row * currentCanvas.width + column;
        const currentPixel = frame[position];
        const lastPixel = Game.lastFrame[position];
        try {
          if (currentPixel === lastPixel) {
            continue;
          }
        } catch {}
        process.stdout.write(
          "\x1B" + `[${row + 1};${column + 1}H` + currentPixel
        );
      }
    }
    Game.lastFrame = frame;
    Game.frameRenderCount++;
  }

  // !
  static setupGameEnviroment() {
    process.stdout.write("\x1B[?25l");
    console.clear();
  }
}
