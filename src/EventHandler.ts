import { Canvas } from "./Canvas.ts";
import { Automata } from "./Automata.ts";
import { cellSize, msPerUpdate } from "./consts.ts";

export class EventHandler {
  public canvas: Canvas;
  public automata: Automata;
  public isPaused = true;

  public mouseDown = false;
  public sandColor: string = "#000000";
  public mouseLocation: { x: number; y: number } = { x: 0, y: 0 };

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
      this.mouseDown = true;
    });
    this.canvas.canvas.addEventListener("mouseup", () => {
      this.mouseDown = false;
    });
    this.canvas.canvas.addEventListener("mousemove", this.mouseMoveFn);

    // start rendering loop
    setInterval(this.update, msPerUpdate);
  }

  public addSand = () => {
    const offset = 2;
    if (this.mouseDown) {
      const { x, y } = this.mouseLocation;
      for (let i = -offset; i <= offset; i++) {
        for (let j = -offset; j <= offset; j++) {
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
      this.automata.saveCells();
      this.render();
    }
  };

  public mouseMoveFn = (e: MouseEvent) => {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    this.mouseLocation = { x, y };
  };

  public render = () => {
    this.automata.render(this.canvas);
  };

  public update = () => {
    if (this.mouseDown) {
      this.addSand();
    }
    if (!this.isPaused) {
      this.automata.run();
    }
    this.render();
  };

  public pauseButtonFn = (e: Event) => {
    // @ts-ignore
    e.currentTarget.innerHTML = this.isPaused ? "pause" : "start";
    this.isPaused = !this.isPaused;
  };
}
