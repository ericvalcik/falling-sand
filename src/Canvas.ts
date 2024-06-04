import { canvasSize, cellSize, maxCellIndex } from "./consts.ts";

export class Canvas {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    if (this.ctx === null) {
      throw new Error("Canvas context is null");
    }
    this.ctx.fillStyle = "black";
  }

  public drawGrid() {
    for (let i = 0; i <= canvasSize; i += cellSize) {
      // vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, canvasSize);
      this.ctx.stroke();

      // horizontal lines
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(canvasSize, i);
      this.ctx.stroke();
    }
  }

  public drawCell(x: number, y: number) {
    if (x < 0 || y < 0 || x > maxCellIndex || y > maxCellIndex) {
      return;
    }
    this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }

  public clear() {
    this.ctx.clearRect(0, 0, canvasSize, canvasSize);
  }
}
