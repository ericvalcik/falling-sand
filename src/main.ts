import "./style.css";
import { canvasSize } from "./consts.ts";
import { Canvas } from "./Canvas.ts";
import { Automata } from "./Automata.ts";
import { EventHandler } from "./EventHandler.ts";

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
new EventHandler(canvas, automata);

automata.render(canvas);
