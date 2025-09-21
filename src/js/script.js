import { searchCatsRandom } from "./searchCatsApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCreate");
  const container = document.querySelector(".displayImage");
  const counter = document.querySelector(".numberCreate");

  let currentImg = null;
  let currentSpinner = null;
  let clickCount = 0;

  if (counter) counter.textContent = clickCount;

  btn.addEventListener("click", async () => {
   
    clickCount++;
    if (counter) counter.textContent = clickCount;

    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.6";

    const spinner = document.createElement("div");
    spinner.className = "spinner";
    container.appendChild(spinner);
    currentSpinner = spinner;

    try {

      const imgUrl = await searchCatsRandom();

      const img = document.createElement("img");
      img.src = imgUrl;

      img.onload = () => {

        if (currentImg) currentImg.remove();

        container.appendChild(img);
        requestAnimationFrame(() => img.classList.add("show"));

        if (currentSpinner) currentSpinner.remove();

        

        currentImg = img;
        currentSpinner = null;

        btn.style.pointerEvents = "";
        btn.style.opacity = "";
      };

      img.onerror = () => {
        if (currentSpinner) currentSpinner.remove();
        const p = document.createElement("p");
        p.className = "error";
        p.textContent = "Erro ao carregar a imagem.";
        container.appendChild(p);
      };
    } catch (err) {
      if (currentSpinner) currentSpinner.remove();
      const p = document.createElement("p");
      p.className = "error";
      p.textContent = "Erro na requisição: " + (err.message || "unknown");
      container.appendChild(p);
    }
  });
});
