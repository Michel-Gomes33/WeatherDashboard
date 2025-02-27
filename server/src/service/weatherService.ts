import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  lat: number,
  lon: number  
}
// TODO: Define an interface for the Coordinates object

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  temperature: number;
  humidity: number;
  wind: number;
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
 private baseURL: string;
 API_KEY: string;
  constructor () {
  this.baseURL = baseURL('https://openweathermap.org/forecast5');
  this.API_KEY = process.env.OPENWEATHER_API_KEY || '';
 }
  // TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
    const response= await fetch('api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}');
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    return Response.json();
   }
  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
  return {
    lat: locationData.coord.lat,
    lon: locationData.coord.lon,
  };
}
   // TODO: Create buildGeocodeQuery method
   private buildGeocodeQuery(): string {
    return `${this.baseURL}/weather?q=${city}&appid=${this.API_KEY}`;
   }
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/coordinates?q=${lat}&${lon}&appid=${this.API_KEY}`;
   }
   
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
   }
   return response.json();

  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const response= await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok)
      throw new Error('Failed to fetch location data');

  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    return {
      city: response.name;
      date: new Date().toLocaleDateString();
      icon: response.weather[0].icon;
      temperature: response.main.temp;
      humidity: response.main.humidity;
      wind: response.wind.speed;
    }
   }

  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map(data => ({
      city: currentWeather.city,
      date: new Date(data.dt * 1000).toLocaleDateString(),
      icon: data.weather[0].icon,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    }));
  }
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    try {
      const coordinates = await this.fetchAndDestructureLocationData(city);
      const weatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
      return { currentWeather, forecastArray };
    } catch (error) {
      console.error(error);
      throw new Error('Could not retrieve weather data');
    }
  }
   }
}

export default new WeatherService();
