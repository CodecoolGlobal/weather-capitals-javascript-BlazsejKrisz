import "./style.css";
import getCountries from "./api-client/getCountries";
import getWeather from "./api-client/weather";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const app = document.querySelector<HTMLDivElement>('#app')

const freecurrencyapi = new Freecurrencyapi('fca_live_OgiWprKAuMTWbBi3p3y1OvNdr4Pe4PGBKi7MZ4Ph')

freecurrencyapi.latest({
  base_currency: 'USD',
  currencies: 'EUR'
}).then(response => {
  console.log(response);
});


async function main() {
  const countries = await getCountries();

  const ul = document.createElement("ul");
  ul.className = "countries-capitals-list";

  for (const country of countries) {
    let capitals = country.capitals[0];

    const li = document.createElement("li");
    li.innerText = country.name.common;

    const p = document.createElement("p");
    p.innerText = country.capitals[0];
    
    p.addEventListener("click", async () => {
      const existingP2 = p.querySelector("p.capitalWeather");
      if (existingP2) {
        p.removeChild(existingP2);
      } else {
        const weather = await getWeather(capitals);
        const p2 = document.createElement("p");
        if (capitals) {
          p2.innerText = weather.current.temp_c;
          p2.className = "capitalWeather";
        } else {
          p2.innerText = "No capital detected";
        }
        const weatherText = document.createElement("div")
        weatherText.innerText = weather.current.condition.text;
        const icon = document.createElement("img")
        icon.src = weather.current.condition.icon;
        p2.append(icon);
        p2.append(weatherText);
        p.append(p2);
        
      }
    });
    li.append(p);
    ul.append(li);
  }
  app?.append(ul);
}
main();
