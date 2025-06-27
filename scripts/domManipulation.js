import {
  searchInput,
  searchBtn,
  btnRefresh,
  weatherStatusWithLocation,
  currentTemp,
  recommendationTxt,
  fleelsLikeTxt,
  precipitationTxt,
  visibilityTxt,
  humidityTxt,
  dewPointTxt,
  dataForecastHourly,
  dataForecastDaliy,
  uvTxt,
  windSpeedTxt,
  gustsTxt,
} from "./domElements.js";

import {
  getUserCurrentLocation,
  getCurrentWeather,
  getForecastWeather,
  getSearchedWeather,
} from "./api.js";

console.log("dom manipulation executed");

const searchedLocation = 'Tangalle';
const forecastDays = 10;
  //get user current location
  // let userCurrentLocation = await getUserCurrentLocation();
  // console.log("user current location >>", userCurrentLocation);

//forecast weather data(also have current weather)
let forecastWeatherData = await getForecastWeather(searchedLocation, forecastDays);
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

//All card data
const allCardData = () => {
  const allCardData = dayForecast.flatMap((day) => day.hour);
  console.log("hourlyData", allCardData);

  //date, time and icon array
  const cardDataObj = allCardData.map((data) => {
    //destructure array
    const [date, time, temp, icon] = [
      data.time.split(" "),
      data.temp_c,
      data.condition.icon,
    ].flat();
    return { date, time, temp, icon };
  });
  console.log(cardDataObj);
  return cardDataObj;
}

//hourly forecast
const hourlyAndDailyForecast = () => {
  //get card data
  const cardDataObj = allCardData();

  let allCardHourly = "";

  //hourly data
  cardDataObj.slice(0, 24).forEach((data) => {
    console.log(data);

    let nextCard = `<div class="card card_forecast card_forecast--hourly glass-card-forecast-data d-inline-block text-light d-flex align-items-center justify-content-center">
                                      <p>${data.time}</p>
                                      <p>${data.temp}<sup >&deg;</sup>c</p>
                                      <img src="${data.icon}" alt=""style="width: 4rem; height: auto;">
      </div>;`;
    allCardHourly += nextCard;
  });

  dataForecastHourly.innerHTML = allCardHourly;

  let allCard10Days = "";

  //10 days data
  cardDataObj.forEach((data) => {
    console.log(data);

    let nextCard = `<div class="card card_forecast glass-card-forecast-data d-inline-block text-light d-flex align-items-center justify-content-center">
                        <p>${data.date}</p>
                        <p>${data.time}</p>
                        <p>${data.temp}<sup >&deg;</sup>c</p>
                        <img src="${data.icon}" alt=""style="width: 4rem; height: auto;">
                    </div>`;
    allCard10Days += nextCard;
  });
  dataForecastDaliy.innerHTML = allCard10Days;
};

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

  //set uv data
  uvTxt.textContent = currentWeather.uv;

  //set wind data
  windSpeedTxt.textContent = currentWeather.wind_mph;
  gustsTxt.textContent = currentWeather.gust_mph;
  
}

export const displayForecast = () => {
  hourlyAndDailyForecast();
}

export const displaySearchedWeather = async (location = "Tangalla") => {
  //searched weather
  let searchedWeatherData = await getSearchedWeather(location);
  console.log("searchedWeatherData", searchedWeatherData);

  updateData(searchedWeatherData);

  setAllData();
};

//all functions
const allFunctions = [
  displayCurrentLocation,
  displayCurrentWeather,
  displayForecast,
];

//update data obj
const updateData = (dataObj) => {
    currentLocation = dataObj?.location;
    currentWeather = dataObj?.current;
    dayForecast = dataObj?.forecast.forecastday;
}

//set data to UI
const setAllData = () => {
    console.log('object');
    allFunctions.forEach(func => {
        func();
    });
}

//search location
searchBtn.addEventListener('click' ,() => {
  const inputLocation = searchInput.value.trim();
  console.log(inputLocation);
  displaySearchedWeather(inputLocation);
});

//Refresh location
btnRefresh.addEventListener("click", () => {
  displaySearchedWeather((searchInput.value = ""));
});




