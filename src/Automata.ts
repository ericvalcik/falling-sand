import { maxCellIndex } from "./consts.ts";
import { Canvas } from "./Canvas.ts";
import { createCells } from "./utils.ts";

export class Automata {
  public cells: (string | undefined)[][];
  public size = maxCellIndex + 1;

  constructor() {
    if (localStorage.getItem("cells")) {
      this.cells = JSON.parse(localStorage.getItem("cells") as string);
    } else {
      this.cells = createCells(this.size);
    }
  }

  public saveCells() {
    localStorage.setItem("cells", JSON.stringify(this.cells));
  }

  public render(canvas: Canvas, { debug } = { debug: false }) {
    canvas.clear();
    let debugText = "";
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        debugText += this.cells[x][y] ? "X" : ".";
        if (this.cells[x][y]) {
          canvas.drawCell(x, y, this.cells[x][y]);
        }
      }
      debugText += "\n";
    }
    if (debug) {
      console.log(debugText);
    }
  }

  public clear() {
    this.cells = createCells(this.size);
    this.saveCells();
  }

  // In this function call the chosen simulating function
  public run() {
    // Runs the simulation for the whole matrix at once
    // that means that in the following grid:
    //     . . x . .
    //     . . x . .
    //     . . . . .
    // the x (sand) on the top is efectively blocked
    // by the bottom one, even though the bottom one
    // is falling (or should be in a normal world)
    // this.run_sync();

    // An attempt to fix the previous issue
    this.run_inplace();
  }

  public run_inplace() {
    for (let y = this.size - 1; y >= 0; y--) {
      for (let x = 0; x < this.size; x++) {
        if (this.cells[x][y]) {
          if (y === maxCellIndex) {
            continue;
          }
          if (!this.cells[x][y + 1]) {
            this.cells[x][y + 1] = this.cells[x][y];
            this.cells[x][y] = undefined;
            continue;
          }
          if (x > 0 && !this.cells[x - 1][y + 1]) {
            this.cells[x - 1][y + 1] = this.cells[x][y];
            this.cells[x][y] = undefined;
            continue;
          }
          if (x < maxCellIndex && !this.cells[x + 1][y + 1]) {
            this.cells[x + 1][y + 1] = this.cells[x][y];
            this.cells[x][y] = undefined;
            continue;
          }
        }
      }
    }

    this.saveCells();
  }

  public run_sync() {
    const nextCells = createCells(this.size);

    for (let y = this.size - 1; y >= 0; y--) {
      for (let x = 0; x < this.size; x++) {
        if (this.cells[x][y]) {
          if (y === maxCellIndex) {
            nextCells[x][y] = this.cells[x][y];
            continue;
          }
          if (!this.cells[x][y + 1]) {
            nextCells[x][y + 1] = this.cells[x][y];
            continue;
          }
          if (x > 0 && !this.cells[x - 1][y + 1]) {
            nextCells[x - 1][y + 1] = this.cells[x][y];
            continue;
          }
          if (x < maxCellIndex && !this.cells[x + 1][y + 1]) {
            nextCells[x + 1][y + 1] = this.cells[x][y];
            continue;
          }
          nextCells[x][y] = this.cells[x][y];
        }
      }
    }

    this.cells = nextCells;
    this.saveCells();
  }
}
