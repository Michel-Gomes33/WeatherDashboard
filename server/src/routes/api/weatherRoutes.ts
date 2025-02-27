import { Router, type Request, type Response } from 'express';
import historyService from '../../service/historyService';
import weatherService from '../../service/weatherService';

const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const ${city} = req.body;
  try {
    const weatherData = await WeatherService.getWeatherByCity(city);
    await HistoryService.saveCity(city); 
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data'});
  }
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getSearchHistory(); // Get search history
    res.status(200).json(history); // Respond with the search history
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params; // Get the city ID from the request parameters

  try {
    await HistoryService.deleteCity(id); // Delete the city from search history
    res.status(204).send(); // Respond with no content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;
