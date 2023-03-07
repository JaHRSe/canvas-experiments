import { RectangleRotation } from "./Rectangle-rotation";
function container() {
  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h3");
  title.innerText = "Experiments with HTML Canvas Element";

  const rectangleRotation = RectangleRotation();

  container.appendChild(title);
  container.appendChild(rectangleRotation);

  return container;
}

const comp = container();
document.body.appendChild(comp);
