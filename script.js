// in the top left I want a search box so I can search for a city
// in the html provide a form tag for the search field
// give the form tag an id so it can be called in the script
// give the search a field a button
// clear the search field when the button is clicked
// create history button for the searched city
// make sure search history is persistent through loacalstorage
// populate the current weather div with required params
// create an api call with the searched city's name
// console log the api results to make sure I'm getting what's needed
// pull needed params from the api response
// put the pulled params into variables
// need lat and long to make a secondary call for UV index
// take variables and be able to return them to weather display card
// make placeholder fields in html with ids so the ids can be called from the script file when they are needed to be populated
// add the values from the pulled param variabales to the query selected dom elements
// use .textcontent property
// need conditional statement for the UV index
// create a 5 day forecast with 5 bootstrap cards

const apiKey = '00bc5c26030bd1d2e8b52ee61a2efab8';
const apiUrl = "https://api.openweathermap.org/data/2.5";

const search = document.getElementById('search');
const button = document.getElementById('button');
const history = document.getElementById('history');

const container = document.getElementById('weather-container');

const city = document.getElementById('city');
const currentDate = document.getElementById('date');

const currentTemp = document.getElementById('currentTemp');
const currentWind = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');
const uv = document.getElementById('uv');

const cardContainer = document.getElementById('cardContainer');
const numForecastDays = 5;

function getLonLat(search) {
    return fetch(`${apiUrl}/weather?q=${search}&appid=${apiKey}`)
    .then((resp) => resp.json())
    .then((data) => data.coord);
}

function getWeather(lat, long) {  
    return fetch(
      `${apiUrl}/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${apiKey}`
    )
    .then((resp) => resp.json())
    .then((data) => data);
}

function getSearchHistory() {
    let searchHistory = [];
    const storageHistory = localStorage.getItem('search.history');

    if (storageHistory) {
        searchHistory = JSON.parse(storageHistory);
    }

    return searchHistory;
}

function saveSearchHistory(searchTerm) {
    const searchHistory = getSearchHistory();

    searchHistory.push(searchTerm);

    localStorage.setItem('search.history', JSON.stringify(searchHistory));

    console.log(searchHistory);

    return searchHistory;
};

function removeSearchHistory() {
    const searchHistory = getSearchHistory();

    while (searchHistory.firstChild) {
      searchHistory.removeChild(searchHistory.firstChild);
    }
}
  
function loadSearchHistory() {
    let searchHistory = saveSearchHistory();
  
    // removeSearchHistory();
  
    searchHistory.forEach((searchTerm) => {
      let searchTermBtn = document.createElement("button");
  
      searchTermBtn.innerText = searchTerm;
  
      searchHistory.appendChild(searchTermBtn);
  
      searchTermBtn.addEventListener("click", runSearchHistory);
    });
  }
  
function runSearchHistory() {
    const searchTerm = getSearchHistory();

    if (searchTerm) {
      getLonLat(searchTerm).then((coord) => {
        console.log(coord);
        getWeather(coord.lat, coord.lon).then((weather) => {
          console.log(weather);
        });
      });
    }
}
  
function runApi() {
    const searchTerm = search.value;

    if (searchTerm) {
      getLonLat(searchTerm).then((coord) => {
        getWeather(coord.lat, coord.lon).then((weather) => {
          console.log(weather);
          // runSearchHistory(searchTerm);
          showWeather(weather, searchTerm);
          dailyWeather(weather);

          search.value = "";
        });
    });    
    }
}

function convertToFahren(kelvinTemp){
  let temp = (kelvinTemp - 273.15) * (9/5) + 32;

  let roundTemp = Math.round(temp*1)/1;
  
  return roundTemp;
}

function showWeather(weather, searchTerm) {
    city.textContent = searchTerm;
    
    let text = moment(weather.current.dt.value).format('MMM D, YYYY');
    currentDate.textContent = text;
    
    

    currentTemp.textContent = 'Temp: ' + convertToFahren(weather.current.temp) + ' °F';

    currentHumidity.textContent = 'Humidity: ' + weather.current.humidity + '%';

    currentWind.textContent = 'Wind: ' + weather.current.wind_speed + 'MPH';

    uv.textContent = 'UV: ' + weather.current.uvi;
}

function dailyWeather(weather){
  let date = '';  
  let temp = '';  
  let humid = '';
  let wind = '';

  let card = ``;

  for(let i = 0; i < numForecastDays; i++){
      date = moment(weather.daily[i].dt.value).format('MMM D, YYYY');
      temp = 'Temp: ' + convertToFahren(weather.daily[i].temp.max) + ' °F';
      humid = 'Humidity: ' + weather.daily[i].humidity + '%';
      wind = 'Wind: ' + weather.daily[i].wind_speed + 'MPH';
      
      card = `<div class="card" style="width: 11rem;">
                  <div class="card-body">
                      <h5 class="card-title" id="date1">${date}</h5>
                      <p class="card-text" id="temp1">${temp}</p>
                      <p class="card-text" id="wind1">${wind}</p>
                      <p class="card-text" id="humidity1">${humid}</p>
                  </div>
              </div>`;

      cardContainer.innerHTML += card;
  }
}

button.addEventListener("click", runApi);