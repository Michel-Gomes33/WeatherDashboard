import { Router,  type Request, type Response  } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const city = req.body.cityName;
  // TODO: GET weather data from city name
  new WeatherService(city);
  // TODO: save city to search history
  HistoryService.addCity(city);
  const weather =new WeatherService(city);
  res.json(await weather.getWeatherForCity())
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  const cities = await HistoryService.getCities()
  res.send(cities)
  console.log(req);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  HistoryService.removeCity(req.params.id)
  res.send(`search deleted`)
});

export default router;
