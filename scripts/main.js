import {
  displayCurrentLocation,
  displayCurrentWeather,
  displayForecast,
  displaySearchedWeather,
} from "./domManipulation.js";

console.log("This is main script");

const initApp = async () => {

  console.log("Init App...");
  displayCurrentLocation();
  displayCurrentWeather();
  displayForecast();
  // displaySearchedWeather();

};

initApp();

