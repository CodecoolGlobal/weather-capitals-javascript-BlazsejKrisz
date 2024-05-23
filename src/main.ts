import "./style.css";
import getCountries from "./api-client/getCountries";
import getWeather from "./api-client/weather";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import getCountryDetails from "./api-client/getCountryDetails";

const app = document.querySelector<HTMLDivElement>("#app");

const freecurrencyapi = new Freecurrencyapi(
  "fca_live_OgiWprKAuMTWbBi3p3y1OvNdr4Pe4PGBKi7MZ4Ph"
);



async function main() {
  const countries = await getCountries();

  const select = document.createElement("select");
  select.innerText = "Select a country";
  select.className = "countries-capitals-list";

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  for (const country of countries) {
    const option = document.createElement("option");
    option.innerText = country.name.common;
    option.value = country.name.common;
    select.append(option);

    let capitals = country.capitals[0];

    const card = document.createElement("div");
    card.className = "card";

    const li = document.createElement("div");
    li.innerText = country.name.common;

    const p = document.createElement("p");
    p.innerText = capitals;

    option.dataset.cardId = `${country.name.common}`;
    card.id = `${country.name.common}`;
    card.style.display = "none";
    cardContainer.append(card);

    select.addEventListener("change", () => {
      const selectedOption = select.selectedOptions[0];
      const selectedCardId = selectedOption.dataset.cardId;
      const selectedCard = document.getElementById(selectedCardId);

      const existingCards = document.querySelectorAll(".card");
      existingCards.forEach((card) => {
        card.style.display = "none";
      });

      if (selectedCard) {
        selectedCard.style.display = "block";
      }
    });

    p.addEventListener("click", async () => {
      const existingP2 = app.querySelector("p.capitalWeather");
      if (existingP2) {
        app.removeChild(existingP2);
      } else {
        const weather = await getWeather(capitals);
        const p2 = document.createElement("p");
        if (capitals) {
          p2.innerText = weather.current.temp_c;
          p2.className = "capitalWeather";
        } else {
          p2.innerText = "No capital detected";
        }
        const weatherText = document.createElement("div");
        weatherText.innerText = weather.current.condition.text;

        const icon = document.createElement("img");
        icon.src = weather.current.condition.icon;

      const details = await getCountryDetails(country.cca3)
      const neighbor = document.createElement("ul")
      neighbor.innerText = "Neigbouring countries"

      for (const border of details.borders) {
      const negborLi = document.createElement("li")
      const neigborCountry = countries.find(country => country.cca3 === border)
      negborLi.className = neigborCountry?.name.common;
      negborLi.innerText = `${neigborCountry?.name.common}'s Capital city: ${neigborCountry?.capitals[0]}`
      negborLi.addEventListener('click', async () => {select.value = neigborCountry?.name.common;
        card.id = neigborCountry?.name.common
       })
      neighbor.append(negborLi)
      }

        p2.append(icon, weatherText, neighbor);
        app.append(p2);

      }
    });

    card.append(li);
    li.append(p);
    cardContainer.append(card);
  }

  app?.append(select);
  app?.append(cardContainer);
}

main();