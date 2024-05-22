const apiEndpoint = 'https://api.weatherapi.com/v1/current.json';
const apiKey = '1b797a9764314473a1a83500242205';



 export default async function getWeather(city: string) {
    const url = `${apiEndpoint}?q=${city}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.current.temp_c;
}

