type sliderControlProps = {
  width: number;
  height: number;
  sliderColor: string;
  handleColor: string;
};

type drawHandleProps = {
  canvas: HTMLCanvasElement;
  handleColor: string;
  handleLocation: { x: number; y: number };
  handleSize: number;
};

type drawSliderProps = {
  canvas: HTMLCanvasElement;
  sliderColor: string;
  sliderLocation: { x: number; y: number };
  width: number;
  height: number;
};

type handleClickProps = {
  canvas: HTMLCanvasElement;
  ev: MouseEvent;
  handleLocation: { x: number; y: number };
  handleSize: number;
};

export function SliderControl(props: sliderControlProps) {
  const { width, height, sliderColor, handleColor } = props;

  let isSliding = false;
  let mouseMoveStart = 0; //on mouse Move hold starting position needed to calc delta
  let mouseDelta = 0; // change in mouselocation since beginning of move interction

  const sizeUnit = Math.floor(height / 2);
  const handleSize = sizeUnit * 4;
  const buffer = 5;
  const hardStopRight = width + buffer - handleSize;
  const hardStopLeft = buffer;
  const canvas = document.createElement("canvas");
  canvas.width = width + buffer * 2;
  canvas.height = handleSize + buffer * 2;
  canvas.style.backgroundColor = "#ADD8E6";

  const sliderLocation = { x: buffer, y: sizeUnit + buffer }; // center slider in canvas
  let handleLocation = { x: buffer, y: buffer };

  function draw() {
    clear(canvas);
    drawSlider({ canvas, height, sliderColor, sliderLocation, width });
    let newX = handleLocation.x + mouseDelta;
    if (newX < hardStopLeft) newX = hardStopLeft;
    if (newX > hardStopRight) newX = hardStopRight;
    drawHandle({
      canvas,
      handleColor,
      handleLocation: {
        x: newX,
        y: handleLocation.y,
      },
      handleSize,
    });
  }

  const mouseLeaveUp = () => {
    isSliding = false;
    handleLocation.x = handleLocation.x + mouseDelta;
    mouseDelta = 0;
  };

  // Handle move events
  canvas.addEventListener("mouseup", (_ev) => {
    mouseLeaveUp();
  });
  canvas.addEventListener("mouseleave", (_ev) => {
    mouseLeaveUp();
  });
  canvas.addEventListener("mousedown", (ev) => {
    isSliding = handleClick({ canvas, ev, handleLocation, handleSize });
    mouseMoveStart = ev.x;
  });
  canvas.addEventListener("mousemove", (ev) => {
    if (isSliding) {
      mouseDelta = ev.x - mouseMoveStart;
      draw();
    }
  });
  draw();
  return canvas;
}

function drawSlider(props: drawSliderProps) {
  const { canvas, sliderColor, sliderLocation, width, height } = props;
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = sliderColor;
  ctx.rect(sliderLocation.x, sliderLocation.y, width, height);
  ctx.fill();
}

function drawHandle(props: drawHandleProps) {
  const { canvas, handleColor, handleLocation, handleSize } = props;
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.fillStyle = handleColor;
  ctx.rect(handleLocation.x, handleLocation.y, handleSize, handleSize);
  ctx.fill();
}

// convert screencords in canvas to coord relative to canvais origin
function screenToCanvasCords(
  canvas: HTMLCanvasElement,
  screenCords: { x: number; y: number }
) {
  const rect = canvas.getBoundingClientRect();
  return { x: screenCords.x - rect.x, y: screenCords.y - rect.y };
}

// Return if click is within handle area
function handleClick(props: handleClickProps) {
  const { canvas, ev, handleLocation, handleSize } = props;
  const location = screenToCanvasCords(canvas, {
    x: ev.clientX,
    y: ev.clientY,
  });
  const xInRange =
    location.x > handleLocation.x && location.x < handleLocation.x + handleSize;
  const yInRange =
    location.y > handleLocation.y && location.y < handleLocation.y + handleSize;
  return xInRange && yInRange;
}

function clear(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
