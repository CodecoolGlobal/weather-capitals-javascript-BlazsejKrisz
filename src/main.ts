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

async function main() {
  const countries = await getCountries();

  const ul = document.createElement("ul")
  ul.className = "countries-capitals-list"

  for (const country of countries) {
    const li = document.createElement("li")
    const p = document.createElement("p")
    li.innerText = country.name.common
    p.innerText = country.capitals[0]

    li.append(p)
    ul.append(li)
  }
app?.append(ul)
}
main()