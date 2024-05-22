import './style.css'
import getCountries from './api-client/getCountries'
import Freecurrencyapi from '@everapi/freecurrencyapi-js'

const app = document.querySelector<HTMLDivElement>('#app')

const freecurrencyapi = new Freecurrencyapi('fca_live_OgiWprKAuMTWbBi3p3y1OvNdr4Pe4PGBKi7MZ4Ph')

freecurrencyapi.latest({
  base_currency: 'USD',
  currencies: 'EUR'
}).then(response => {
  console.log(response);
});
import getWeather from './api-client/weather';

const app = document.querySelector<HTMLDivElement>('#app')

async function convertString(inputString: string): Promise<string> {
 
  return inputString.replace(/[^\w\s]/gi, '');
}



async function main() {
  const countries = await getCountries();

  const ul = document.createElement("ul")
  ul.className = "countries-capitals-list"

  for (const country of countries) {
    let capitals = await convertString(country.capitals[0])

    const li = document.createElement("li")
    const p = document.createElement("p")
    li.innerText = country.name.common
    p.innerText = country.capitals[0]
    const p2 = document.createElement("p")
    if (capitals) {
    p2.innerText = await getWeather(capitals)
    } 
    li.append(p)
    ul.append(li)
    p.append(p2);
  }
app?.append(ul)
}
main()