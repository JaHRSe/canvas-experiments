import { RectangleRotation } from "./Rectangle-rotation";
import { SliderControl } from "./slider-control";

function container() {
  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h3");
  title.innerText = "Experiments with HTML Canvas Element";

  const rectangleRotation = RectangleRotation();
  const sliderControl = SliderControl({
    width: 100,
    height: 10,
    sliderColor: "#e6ce8e",
    handleColor: "#403e1d",
  });

  //container.appendChild(title);
  //container.appendChild(rectangleRotation);
  container.appendChild(sliderControl);

  return container;
}

const comp = container();
document.body.appendChild(comp);
