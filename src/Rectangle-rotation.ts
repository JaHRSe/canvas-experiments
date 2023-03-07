//copy from https://stackoverflow.com/questions/36946204/rotate-individual-objects-in-canvas
type drawRectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  angleInRads: number;
  alpha: number;
  color: string;
};

type rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  angle: number;
  dr: number;
  ds: number;
  da: number;
  color: string;
};

const canvas = document.createElement("canvas");
let rects: rectangle[] = [];

export function RectangleRotation() {
  canvas.style.position = "absolute";
  canvas.style.zIndex = "1000";
  rects = generateRects();
  requestAnimationFrame(update);
  return canvas;
}

function drawRect(props: drawRectProps) {
  const { x, y, width, height, scale, angleInRads, alpha, color } = props;
  const ctx = canvas.getContext("2d");
  // Overrides current transfrm to identity matrix and then invokes given transformation
  ctx.setTransform(scale, 0, 0, scale, x, y);
  ctx.rotate(angleInRads);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.strokeRect(-width / 2, -height / 2, width, height);
}

function generateRects() {
  for (let i = 0; i < 200; i++) {
    rects.push({
      x: Math.random(),
      y: Math.random(),
      width: Math.random() * 0.1,
      height: Math.random() * 0.1,
      scale: 1,
      angle: 0,
      dr: (Math.random() - 0.5) * 0.1, //rotation rate
      ds: Math.random() * 0.01, // scale vary rate
      da: Math.random() * 0.01,
      color: "hsl(" + Math.floor(Math.random() * 360) + ",100%,50%)",
    });
  }
  return rects;
}

function update(time: number) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.clearRect(0, 0, width, height); // clear the canvas

  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i];
    drawRect({
      x: rect.x * width,
      y: rect.y * height,
      width: rect.width * width,
      height: rect.height * height,
      scale: rect.scale + Math.sin(time * rect.ds) * 0.4,
      angleInRads: (rect.angle += rect.dr),
      alpha: Math.sin(time * rect.da) * 0.5 + 0.5,
      color: rect.color,
    });
  }
  requestAnimationFrame(update);
}
