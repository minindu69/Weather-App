"use strict";

const searchBtn = document.querySelector('.search_btn');

//get user Geolocation
const fetchUserLocation = async () => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not available.");
    throw new Error("Geolocation is not available.");
  }

  console.log("Geolocation is available!");

  return new Promise((resolve, reject) => {
    //async fuction(use callback patterns)
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
      }
    );
  });
};

//handle location error
const handleLocationError = error =>{
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
    default:
      console.error("An unknown error occurred.");
      break;
  }
}

const getUserLocation = async () => {
    try {
        const location = await fetchUserLocation();
        // console.log("User Location:", location);
        return location;
    } catch (error) {
        handleLocationError(error);
        return null;
    }
};

// (async() => {
//   const location = await getUserLocation();
//   console.log('user location', location);
// })();

// https://api.weatherapi.com/v1/forecast.json?q=tangalla&days=1&alerts=yes&aqi=yes&key=1234

// const apiKey = '1234';
const apiKey = '436b043e571f453f84e54432251606';
const basURL = "https://api.weatherapi.com/v1";

//fetch data
const fetchWeatherData = async (endpoint, params = {}) => {
  const query = new URLSearchParams({key: apiKey, ...params}).toString();
  const url = `${basURL}/${endpoint}?${query}`;
  console.log(url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    // console.log("response", response.json());
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null;
  }

};

// {
//   city: "Tangalle",
//   latitude: 6.024,
//   longitude: 80.7911,
// }

//get current weather
const getCurrentWeather =  async city => {
  return await fetchWeatherData("current.json", {q: city});
}

//get forecast weather
const getForecastWeather = async (city, days = 1) => {
  const params = { q: city, days, alerts: "yes", aqi: "yes" };
  return await fetchWeatherData("forecast.json", params);
};

//search weather
const getSearchedWeather = async (city, days = 1) => {
  const params = { q: city, days, alerts: "yes", aqi: "yes" };
  return await fetchWeatherData("search.json", params);
};

//initially load data
(async () => {
  const currentWeatherData = await getCurrentWeather('Tangalla');
  console.log(currentWeatherData);

  const forecastWeatherData = await getForecastWeather('Tangalla');
  console.log(forecastWeatherData);
})();

//when clicked the search button
const searchedWeatherData = async () => await getSearchedWeather('Tangalla');

// searchBtn.addEventListener('click', searchedWeatherData);




