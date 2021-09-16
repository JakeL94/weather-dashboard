// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

const currentWeather = '00bc5c26030bd1d2e8b52ee61a2efab8';

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