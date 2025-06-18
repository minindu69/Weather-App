import {searchInput, searchBtn} from './domElements.js';

export const displayCurrentLocation = (locationDataObj) => {
    console.log('Display current location', locationDataObj);    
}

export const displayCurrentWeather = (currentDataObj) => {
    console.log('Display current weather', currentDataObj);    
}

export const displayForecast = (forecastDataArry) => {
    console.log('Display forecast', forecastDataArry);
}

export const displaySearchedWeather = (searchedDataObj) => {
    console.log("Display searched weather", searchedDataObj);
}


