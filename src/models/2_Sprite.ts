import { BgColors, Colors } from "../constants/Colors";

export function setCursorPosition(x: number, y: number) {
  process.stdout.write(`\u001b[${y};${x}H`);
  process.stdout.write(`\u001b[0J`);
}

export class Sprite {
  constructor(
    public sprite: string,
    public color: string = Colors.White,
    public bgColor: string = BgColors.Black
  ) {
    this.sprite = sprite;
    this.color = color;
    this.bgColor = bgColor;
  }

  public render(): string {
    return (
      "\x1B" +
      `[${this.color}` +
      "\x1B" +
      `[${this.bgColor}` +
      `${this.sprite}` +
      "\x1B[0m"
    );
  }
}
