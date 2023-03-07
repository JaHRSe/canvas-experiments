function container() {
  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h3");
  title.innerText = "Experiments with HTML Canvas Element";

  container.appendChild(title);

  return container;
}

const comp = container();
document.body.appendChild(comp);
