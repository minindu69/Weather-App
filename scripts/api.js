"use strict";

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
const handleLocationError = (error) => {
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
};

export const getUserCurrentLocation = async () => {
  try {
    const location = await fetchUserLocation();
    // console.log("User Location:", location);
    return Object.values(location).join();
  } catch (error) {
    handleLocationError(error);
    return null;
  }
};

// const apiKey = '1234';
const apiKey = "436b043e571f453f84e54432251606";
const basURL = "https://api.weatherapi.com/v1";

//fetch data
const fetchWeatherData = async (endpoint, params = {}) => {
  const query = new URLSearchParams({ key: apiKey, ...params }).toString();
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

//preffered city
const prefferedCity = "Tangalla";

//get current weather
export const getCurrentWeather = async (city = prefferedCity) => {
  return await fetchWeatherData("current.json", { q: city });
};

//get forecast weather
export const getForecastWeather = async (city = prefferedCity, days = 1) => {
  const params = { q: city, days, alerts: "yes", aqi: "yes" };
  return await fetchWeatherData("forecast.json", params);
};

//search weather
// export const getSearchedWeather = async (city = prefferedCity, days = 1) => {
//   const params = { q: city, days, alerts: "yes", aqi: "yes" };
//   return await fetchWeatherData("search.json", params);
// };
export const getSearchedWeather = async (city = prefferedCity, days = 1) => await getForecastWeather(city, days);




