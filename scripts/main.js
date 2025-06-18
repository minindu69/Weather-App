import {
  getUserCurrentLocation,
  getCurrentWeather,
  getForecastWeather,
  getSearchedWeather,
} from "./api.js";

import {
  displayCurrentLocation,
  displayCurrentWeather,
  displayForecast,
  displaySearchedWeather,
} from "./domManipulation.js";

console.log("This is main script");

const initApp = async () => {
  console.log("Init App...");

  //get user current location
  let userCurrentLocation = await getUserCurrentLocation();
  console.log("user current location >>", userCurrentLocation);

  //forecast weather data(also have current weather)
  const forecastWeatherData = await getForecastWeather(userCurrentLocation);
  console.log("forecastWeatherData", forecastWeatherData);
  
  //searched weather
  const searchedWeatherData = await getSearchedWeather('kandy');
  console.log("searchedWeatherData", searchedWeatherData);

  //display data
  displayCurrentLocation(forecastWeatherData.location);
  displayCurrentWeather(forecastWeatherData.current);
  displayForecast(forecastWeatherData.forecast.forecastday);
  displaySearchedWeather(searchedWeatherData);
};

initApp();
