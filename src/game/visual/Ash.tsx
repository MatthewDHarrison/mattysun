import { Box } from "@mui/material";
import React from "react";

//Get random int between two numbers
function randomRange(from: number, to: number) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
// AshClass is the function ash as a class
// function ash(o) {
//     let i,
//       j,
//       m = Math.random(),
//       p = randomRange(4, 8, m);

//     if (o && o.x) this.x = o.x;
//     else this.x = m * W;
//     if (o && o.y) this.y = o.y;
//     else this.y = m * H;
//     if (o && o.a) this.a = o.a;
//     else this.a = m * (p - 4) + 1;
//     this.r = randomRange(233, 255, m);
//     this.g = randomRange(181, 192, m);
//     this.b = randomRange(72, 88, m);

//     if (o && o.dp) this.dp = o.dp;
//     else {
//       this.dp = [{ x: 0, y: 0 }];
//       for (i = 0; i < p; i++) {
//         j = i == 0 || p / 2 > i ? 1 : -1;
//         this.dp.push({
//           x: this.dp[i].x + randomRange(5, 30) * j,
//           y: this.dp[i].y + randomRange(5, 30) * j,
//         });
//       }
//     }
//   }

interface IAsh {
  x?: number;
  y?: number;
  a?: number;
  dp?: { x: number; y: number }[];
}

class AshClass {
  x: number;
  y: number;
  a: number;
  dp: { x: number; y: number }[];
  r: number;
  g: number;
  b: number;

  constructor(o: IAsh) {
    let i, j;

    const m = Math.random();
    const p = randomRange(4, 8);

    if (o && o.x) this.x = o.x;
    else this.x = m * 0;
    if (o && o.y) this.y = o.y;
    else this.y = m * 0;
    if (o && o.a) this.a = o.a;
    else this.a = m * (p - 4) + 1;
    this.r = randomRange(233, 255);
    this.g = randomRange(181, 192);
    this.b = randomRange(72, 88);

    if (o && o.dp) this.dp = o.dp;
    else {
      this.dp = [{ x: 0, y: 0 }];
      for (i = 0; i < p; i++) {
        j = i == 0 || p / 2 > i ? 1 : -1;
        this.dp.push({
          x: this.dp[i].x + randomRange(5, 30) * j,
          y: this.dp[i].y + randomRange(5, 30) * j,
        });
      }
    }
  }
}

//Fire
export const makeAsh = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  bufferRef: React.RefObject<HTMLCanvasElement>,
) => {
  if (!canvasRef.current || !bufferRef.current) {
    return;
  }

  const canvas = canvasRef.current;
  const buffer = bufferRef.current;
  const cntr = document.getElementById("Game");
  const W = cntr?.offsetWidth || 0;
  const H = cntr?.offsetHeight || 0;
  const ctxs = [
    canvasRef.current.getContext("2d"),
    bufferRef.current.getContext("2d"),
  ];

  let C = 0;
  let angle = 0;
  let A: AshClass[] = [];

  const draw = (
    ctxs: CanvasRenderingContext2D[],
    canvas: HTMLCanvasElement,
    buffer: HTMLCanvasElement,
  ) => {
    let grad, i, j, p;
    if (C == 0) {
      //Show the canvas
      canvas.style.visibility = "visible";
      buffer.style.visibility = "hidden";
    } else {
      //Show the buffer
      buffer.style.visibility = "visible";
      canvas.style.visibility = "hidden";
      C = 0;
    }

    const ctx = ctxs[C];
    ctx.clearRect(0, 0, W, H);

    for (i = 0; i < A.length; i++) {
      p = A[i];
      grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.a);
      grad.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 1)");
      grad.addColorStop(
        0.9,
        "rgba(" +
          p.r +
          ", " +
          p.g +
          ", " +
          p.b +
          ", " +
          randomRange(1, 10) / 10 +
          ")",
      );
      grad.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      for (j = 1; j < p.dp.length; j++)
        ctx.lineTo(p.x + p.dp[j].x, p.y + p.dp[j].y);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.7;
      ctx.fill();
    }

    update();
  };

  const update = () => {
    let i, p;
    angle += 0.01;

    for (i = 0; i < A.length; i++) {
      p = A[i];

      p.y += Math.cos(angle + A.length) + 1 + p.a / 2;
      p.x += Math.sin(angle) * 2;

      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) A[i] = new AshClass({ y: -10, a: p.a, dp: p.dp });
        else {
          //Enter from the left
          if (Math.sin(angle) > 0)
            A[i] = new AshClass({ x: -5, a: p.a, dp: p.dp });
          //Enter from the right
          else A[i] = new AshClass({ x: W + 5, a: p.a, dp: p.dp });
        }
      }
    }
  };

  if (!ctxs[0] || !ctxs[1]) {
    return;
  }

  //Run
  canvas.width = W;
  canvas.height = H;
  buffer.width = W;
  buffer.height = H;

  console.log(W, H);
  for (let i = 0; i < 50; i++) A.push(new AshClass({}));
  setInterval(
    () => draw(ctxs as CanvasRenderingContext2D[], canvas, buffer),
    33,
  );
};

export const Ash = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const bufferRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    makeAsh(canvasRef, bufferRef);

    // draw cirlce on canvas
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx.stroke();
    }

  }, []);

  return (
    <Box>
      <canvas ref={canvasRef} style={{ visibility: "visible" }}></canvas>
      <canvas ref={bufferRef} style={{ visibility: "hidden" }}></canvas>
    </Box>
  );
};
