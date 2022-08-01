import { Game } from "./core/Game";

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");
stdin.on("data", function (key) {
  if (key.toString() === "\u0003") {
    process.exit();
  }

  Game.canvases.forEach((canvas) => {
    canvas.entities.forEach((entity) => {
      entity.handleKeyboardEvent(key.toString());
    });
  });

});

async function main() {
  Game.setupGameEnviroment();

  const mainGameLoop = () => {
    Game.triggerAllEntitiesPassiveEvents();
    Game.triggetAllEntitiesColisionEvents();
    if (Game.time % 10 == 0) {
      Game.renderCurrentCanvas();
    }
    Game.time++;
  };
  
  setInterval(mainGameLoop, 1);
}

main();
