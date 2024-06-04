import { Canvas } from "./Canvas.ts";
import { Automata } from "./Automata.ts";
import { cellSize, msPerUpdate } from "./consts.ts";

export class EventHandler {
  public canvas: Canvas;
  public automata: Automata;
  public updateInterval: number | null = null;
  public mouseDown = false;
  public sandColor: string = "#000000";

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
    // @ts-ignore
    document.getElementById("color-button").addEventListener("click", (e) => {
      this.sandColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      // @ts-ignore
      e.currentTarget.style.backgroundColor = this.sandColor;
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
            y + j > this.automata.size ||
            this.automata.cells[x + i][y + j]
          ) {
            continue;
          }
          this.automata.cells[x + i][y + j] = this.sandColor;
        }
      }
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
