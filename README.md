# WeatherDashboard

# ReadMe Generator

No license.

## Description

This Weather Dashboard is a full-stack application that retrieves and displays current and forecasted weather conditions for any city using the OpenWeather API. While the front end has already been developed, the focus of this project is to build the back end, connect it to the user interface, and deploy the complete application to Render.

By making POST requests to the server with a city name, the app fetches weather data and renders it in the browser. It also saves previously searched cities into a local history for easy access. This project simulates a real-world developer task: consuming an external API from a server, managing data persistence, and delivering an integrated user experience.

The app uses the OpenWeather 5-day forecast endpoint and includes functionality for:

Fetching current and future weather for searched cities

Displaying data such as temperature, humidity, wind speed, and weather icons

Managing and deleting search history on the server

This project demonstrates how external APIs can be integrated into a full-stack workflow to build functional and interactive applications.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#Demo)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To locally modify this app, you will need to clone the repo to then be able to use the Vehicle Management CLI.

<h3>First, clone the repo:</h3>

```
git clone https://github.com/Michel-Gomes33/WeatherDashboard
 ``` 

<h3>Second, you will need to install dependencies. Here, I'm working with NodeJS, so at the root you'll want to run start to install dependencies on both server and client:</h3>

```
npm run start
```
<h3>Finally, to launch the localhost, run the dev command on the client file: </h3>

```
npm run dev
```


## Usage

The app allows the user to view weather forecast of cities and store the search history:

<h3>Search for Weather</h3>

Enter a city name into the search input field on the front end.

Click the Search button to fetch and display:

Current weather: city name, date, temperature, humidity, wind speed, and weather icon with alt description.

5-day forecast: daily temperature, humidity, wind speed, and icon.

<h3>Search History</h3>


Each searched city is saved to your local search history.

Click on any saved city to reload its weather information instantly.

<h3>Delete History</h3>


Use the trash/delete icon (if available in your UI) to remove a city from the search history.

This sends a DELETE request to the server to update your saved searches.


## Demo

Perfect! Here's a complete set of additions for your `README.md`:

---

## 🎥 Demo

Here's how the Weather Dashboard works in action:

- 🌦 **Search for a city** to retrieve real-time weather and a 5-day forecast.
- 📜 **View past searches** and click them to reload forecasts instantly.
- 🗑️ **Remove cities** from your history (optional bonus feature).

---

## 🧪 API Routes

Here’s a quick overview of the API endpoints used in the backend:

### `POST /api/weather`
Fetches weather data for a city.

**Request Body:**
```json
{
  "cityName": "London"
}
```

**Response:**
Returns current weather and 5-day forecast data.

---

### `GET /api/weather/history`
Retrieves the list of previously searched cities.

**Response:**
```json
["London", "Tokyo", "New York"]
```

---

### `DELETE /api/weather/history/:id`
Removes a city from the search history by ID or city name (based on your implementation).

---

Let me know if you'd like to include example JSON responses or a section on environment setup like `.env` variables for the API key!

<h3>Home Page:</h3>

![IHome Page](./assets/img1.png)

<h3>Build Options:</h3>

![Weather History](./assets/img2.png)

## Deployement Link:

## License

N/A.

## Contributing

Make sure to cite my github

## Link to demo

https://app.screencastify.com/v3/watch/B0G3bJ5V5zvAruIvZcgW

## Questions

For any questions, please contact me at [N/A](mailto:N/A).

Check out my GitHub profile: [Michel-Gomes33](https://github.com/Michel-Gomes33)
    