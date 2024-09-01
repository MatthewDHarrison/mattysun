import React, { useEffect, useRef } from "react";
import { gameTheme } from "../../../game/GameTheme";
import { generateRGBKs, generateTintImage } from "./encounters.helpers";

function colorizeImage(
  ctx: CanvasRenderingContext2D,
  colors: { r: number; g: number; b: number }[],
) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Assuming grayscale, r, g, and b are the same
    const grayValue = r;

    // console.log(grayValue)

    // Map the gray value to a color from your theme
    let newColor;
    if (grayValue < 30) newColor = colors[0];
    else if (grayValue < 60) newColor = colors[1];
    else if (grayValue < 110) newColor = colors[2];
    else if (grayValue < 150) newColor = colors[3];
    else if (grayValue < 250) newColor = colors[4];
    else newColor = colors[5];

    data[i] = newColor.r;
    data[i + 1] = newColor.g;
    data[i + 2] = newColor.b;
  }

  ctx.putImageData(imageData, 0, 0);
}

const colors = [
  gameTheme.palette.dark,
  gameTheme.palette.dark1,
  gameTheme.palette.light2,
  gameTheme.palette.light1,
  gameTheme.palette.light,
  gameTheme.palette.red,
];

const rgbColors = colors.map((color) => {
  if (!color) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };
});

const rgbColorsWithRed = colors.map((color) => {
  if (!color) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(color.slice(1, 3), 16) + 50,
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };
});

interface IEnemyCanvasProps {
  src: string;
  isDamaged: boolean;
}

export const EnemyCanvas = ({ src, isDamaged }: IEnemyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const image = new Image();
    image.src = src;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Process the image
      if (isDamaged) {
        colorizeImage(ctx, rgbColorsWithRed);
        return
      }
      colorizeImage(ctx, rgbColors);
    };
  }, [src, isDamaged]);

  return <canvas ref={canvasRef} />;
};
