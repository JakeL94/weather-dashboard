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

const apiKey = '67006a78d4e65d294f4a616989d3e745';
const apiUrl = "https://api.openweathermap.org/data/2.5";

const search = document.getElementById('search');
const button = document.getElementById('button');
const history = document.getElementById('history');
const city = document.getElementById('city');

const currentTemp = document.getElementById('currentTemp');
const currentWind = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');
const uv = document.getElementById('uv');

const temp1 = document.getElementById('temp1');
const wind1 = document.getElementById('wind1');
const humidity1 = document.getElementById('humidity1');

const temp2 = document.getElementById('temp2');
const wind2 = document.getElementById('wind2');
const humidity2 = document.getElementById('humidity2');

const temp3 = document.getElementById('temp3');
const wind3 = document.getElementById('wind3');
const humidity3 = document.getElementById('humidity3');

const temp4 = document.getElementById('temp4');
const wind4 = document.getElementById('wind4');
const humidity4 = document.getElementById('humidity4');

const temp5 = document.getElementById('temp5');
const wind5 = document.getElementById('wind5');
const humidity5 = document.getElementById('humidity5');

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

    return searchHistory;
};

function removeSearchHistory() {
    const searchHistory = getSearchHistory();

    while (searchHistory.firstChild) {
      searchHistory.removeChild(searchHistory.firstChild);
    }
}
  
function loadSearchHistory() {
    const searchHistory = getSearchHistory();
  
    removeSearchHistory();
  
    searchHistory.forEach((searchTerm) => {
      const searchTermBtn = document.createElement("button");
  
      searchTermBtn.innerText = searchTerm;
  
      searchHistory.appendChild(searchTermBtn);
  
      searchTermBtn.addEventListener("click", runSearchHistory);
    });
}
  
function runSearchHistory(event) {
    const searchTerm = event.currentTarget.innerText;

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
        // console.log(coord);
        getWeather(coord.lat, coord.lon).then((weather) => {
          console.log(weather);
          saveSearchHistory(searchTerm);

          search.value = "";
        });
      });
    }
}

button.addEventListener("click", runApi);

loadSearchHistory();