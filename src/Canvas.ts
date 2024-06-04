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

  public drawCell(x: number, y: number, color?: string) {
    if (x < 0 || y < 0 || x > maxCellIndex || y > maxCellIndex) {
      return;
    }
    if (color) {
      this.ctx.fillStyle = color;
    }
    this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }

  public clear() {
    this.ctx.clearRect(0, 0, canvasSize, canvasSize);
  }
}
