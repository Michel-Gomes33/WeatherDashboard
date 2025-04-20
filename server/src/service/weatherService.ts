import dotenv from 'dotenv';
import dayjs, {type Dayjs} from 'dayjs';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor (city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) 
  { 
    this.city = city,
    this.date = date,
    this.icon = icon,
    this.iconDescription = iconDescription,
    this.tempF = tempF,
    this.windSpeed = windSpeed,
    this.humidity = humidity}
    
}
// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
class WeatherService {
  baseURL: string;
  apiKey: string;
  cityName: string;
  constructor (cityName: string) 
  {
    this.baseURL = process.env.API_BASE_URL || "";
    this.apiKey = process.env.API_KEY || "";
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?${query}`);

    if (!response.ok) {
      console.log("could not fetch location data");
      return [];
    } else {
      const coordinates: Coordinates[] = await response.json();
      return coordinates;
    }
  }
  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]): Coordinates {
    try {
      const lat = locationData[0].lat;
      const lon = locationData[0].lon;
      return { lat: lat, lon: lon };
    } catch (error) {
      console.error(`location not found`);
      this.cityName = `location not found`;
      return { lat: 90, lon: 0 };
    }
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((data)=> 
      this.destructureLocationData(data));
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const currentWeather = 
      await fetch(this.buildWeatherQuery(coordinates)).then(
        (res) => res.json());

    if (!currentWeather)
    {
      return Error('Current weather not found');
    } 
    const weather: Weather = this.parseCurrentWeather(currentWeather.list[0]);
    const forecast: Weather[] = this.buildForecastArray(weatherArray.list[0])
    //forecast is the array with 7 days for the whole object
  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const current = response;
    const parseDate = dayjs.unix(current.dt).format('MM/DD/YYYY');
    
    return new Weather(
      this.cityName, 
      parseDate,
      current.weather[0].icon,
      current.weather[0].description,
      current.main.temp,
      current.wind.speed,
      current.main.humidity
    );
  }
  private parseForecast(response: any) {
    const daysUnfiltered: any[] = response.list
    const days: any[] = daysUnfiltered.filter((entry: any) => entry.dt_txt.includes(`12:00:00`))
    const forecast: Weather[] = []
    let name
    if (this.cityName === `location not found`) { name = `Location not found` }
    else { name = response.name }
    for (const day of days) {
      const weather = new Weather(name, day.dt_txt.slice(0, -9), day.weather[0].icon, day.weather[0].description, day.main.temp, day.wind.speed, day.main.humidity)
      forecast.push(weather)
    }
    return forecast
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherArray: Weather[] = [currentWeather]
    weatherArray.push(...weatherData)
    return weatherArray
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity() {
    try {
      const locationData = await this.fetchAndDestructureLocationData()
      const combinedWeatherData = await this.fetchWeatherData(locationData)

      const current = this.parseCurrentWeather(combinedWeatherData.currentWeather)
      const forecast = this.parseForecast(combinedWeatherData.forecast)

      const weather = this.buildForecastArray(current, forecast)
      return weather;


    } catch (error) {
      console.error(`there was an error getting weather data`)
      return
    }
  }
}

export default  WeatherService;
