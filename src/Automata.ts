import { maxCellIndex } from "./consts.ts";
import { Canvas } from "./Canvas.ts";
import { createCells } from "./utils.ts";

export class Automata {
  public cells: boolean[][];
  public size = maxCellIndex + 1;

  constructor() {
    this.cells = createCells(this.size);
    console.log(this.cells);
  }

  public render(canvas: Canvas, { debug } = { debug: false }) {
    canvas.clear();
    let debugText = "";
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        debugText += this.cells[x][y] ? "X" : ".";
        if (this.cells[x][y]) {
          canvas.drawCell(x, y);
        }
      }
      debugText += "\n";
    }
    if (debug) {
      console.log(debugText);
    }
  }

  public run() {
    const nextCells = createCells(this.size);

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const prevY = y === 0 ? this.size - 1 : y - 1;
        nextCells[x][y] = this.cells[x][prevY];
      }
    }

    this.cells = nextCells;
  }
}
