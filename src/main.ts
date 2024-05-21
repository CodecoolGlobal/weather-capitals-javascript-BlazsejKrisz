import './style.css'
import getCountries from './api-client/getCountries'

const app = document.querySelector<HTMLDivElement>('#app')


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
app.append(ul)
}
main()