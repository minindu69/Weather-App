import {
  searchInput,
  searchBtn,
  weatherStatusWithLocation,
  currentTemp,
  recommendationTxt,
  fleelsLikeTxt,
  precipitationTxt,
  visibilityTxt,
  humidityTxt,
  dewPointTxt,
} from "./domElements.js";

import {
  getUserCurrentLocation,
  getCurrentWeather,
  getForecastWeather,
  getSearchedWeather,
} from "./api.js";

console.log("dom manipulation executed");

  //get user current location
  // let userCurrentLocation = await getUserCurrentLocation();
  // console.log("user current location >>", userCurrentLocation);

//forecast weather data(also have current weather)
let forecastWeatherData = await getForecastWeather();
console.log("forecastWeatherData", forecastWeatherData);

let currentLocation = forecastWeatherData.location;
let currentWeather = forecastWeatherData.current; // current status
let dayForecast = forecastWeatherData.forecast.forecastday;

console.log("Display current location", currentLocation);
console.log("Display current weather", currentWeather);
console.log("Display forecast", dayForecast);

//recommendation text
const loadRecommendationTxt = () => {
    const dayForecastInfo = dayForecast[0].day;

    recommendationTxt.innerHTML = `Today, expect a ${
      dayForecastInfo.condition.text
    } day with temperatures reaching a maximum of ${
      dayForecastInfo.maxtemp_c
    }<sup>o</sup>c.Make sure to grab your ${
      dayForecastInfo.condition.text.includes("rain")
        ? "umbrella and raincoat"
        : "water bottle"
    } before heading out.`;
}

//card data-left
const setleftSideCardData = () => {
    fleelsLikeTxt.textContent = currentWeather.feelslike_c;
    precipitationTxt.textContent = currentWeather.precip_mm;
    visibilityTxt.textContent = currentWeather.vis_miles;
    humidityTxt.textContent = currentWeather.humidity;
    dewPointTxt.textContent = currentWeather.dewpoint_c;
}


export const displayCurrentLocation = () => {
    weatherStatusWithLocation.innerHTML = `${currentLocation.name}
    <p class="fs-2">${currentWeather.condition.text}</p>
    <img src="${currentWeather.condition.icon}" style="width: 5rem; height: auto;"> 
    `;    
}

export const displayCurrentWeather = () => {
    currentTemp.innerHTML = `${currentWeather.temp_c}<sup >&deg;</sup>c`;
    loadRecommendationTxt();
    setleftSideCardData();
}

export const displayForecast = () => {

}

export const displaySearchedWeather = async (location = "Tangalla") => {
  //searched weather
  let searchedWeatherData = await getSearchedWeather(location);
  console.log("searchedWeatherData", searchedWeatherData);

  updateData(searchedWeatherData);

  setAllData();
};

//all functions
const allFunctions = [displayCurrentLocation, displayCurrentWeather];

//update data obj
const updateData = (dataObj) => {
    currentLocation = dataObj.location;
    currentWeather = dataObj.current;
    dayForecast = dataObj.forecast.forecastday;
}

//set data to UI
const setAllData = () => {
    console.log('object');
    allFunctions.forEach(func => {
        func();
    });
}


















