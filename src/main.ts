import "./style.css";
import { canvasSize } from "./consts.ts";
import { Canvas } from "./Canvas.ts";
import { Automata } from "./Automata.ts";

// Create canvas
// @ts-ignore
document.getElementById("app").innerHTML = `
<canvas
  id="main-canvas"
  width="${canvasSize}"
  height="${canvasSize}"
  style="border: 1px solid #000000"
>
</canvas>`;

const canvas = new Canvas();
const automata = new Automata();

canvas.canvas.addEventListener("click", (e) => {
  const x = Math.floor(e.offsetX / 40);
  const y = Math.floor(e.offsetY / 40);
  console.log(x, y);
  automata.cells[x][y] = true;
  automata.render(canvas, { debug: true });
});

const update = setInterval(() => {
  console.log("running update");
  automata.run();
  automata.render(canvas);
}, 200);
