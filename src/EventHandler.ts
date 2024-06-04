import { Canvas } from "./Canvas.ts";
import { Automata } from "./Automata.ts";
import { cellSize, msPerUpdate } from "./consts.ts";

export class EventHandler {
  public canvas: Canvas;
  public automata: Automata;
  public updateInterval: number | null = null;
  public mouseDown = false;

  constructor(canvas: Canvas, automata: Automata) {
    this.canvas = canvas;
    this.automata = automata;

    // setup button event listeners

    // @ts-ignore
    document
      .getElementById("pause-button")
      .addEventListener("click", this.pauseButtonFn);
    // @ts-ignore
    document.getElementById("clear-button").addEventListener("click", () => {
      this.automata.clear();
      this.render();
    });

    // setup canvas event listeners
    this.canvas.canvas.addEventListener("mousedown", () => {
      console.log("mousedown");
      this.mouseDown = true;
    });
    this.canvas.canvas.addEventListener("mouseup", () => {
      console.log("mouseup");
      this.mouseDown = false;
    });
    this.canvas.canvas.addEventListener("mousemove", this.mouseMoveFn);
  }

  public mouseMoveFn = (e: MouseEvent) => {
    if (this.mouseDown) {
      const x = Math.floor(e.offsetX / cellSize);
      const y = Math.floor(e.offsetY / cellSize);
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            x + i < 0 ||
            y + j < 0 ||
            x + i > this.automata.size ||
            y + j > this.automata.size
          ) {
            continue;
          }
          this.automata.cells[x + i][y + j] = true;
        }
      }
      this.automata.cells[x][y] = true;
      this.render();
    }
  };

  public render = () => {
    this.automata.render(this.canvas);
  };

  public update = () => {
    this.automata.run();
    this.render();
  };

  public pauseButtonFn = (e: Event) => {
    if (this.updateInterval === null) {
      this.updateInterval = setInterval(this.update, msPerUpdate);
      // @ts-ignore
      e.currentTarget.innerHTML = "pause";
    } else {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      // @ts-ignore
      e.currentTarget.innerHTML = "start";
    }
  };
}
