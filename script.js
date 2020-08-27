var savedSearches = JSON.parse(window.localStorage.getItem("selectedCity")) || [];
console.log(savedSearches);
for (var i = 0; i < savedSearches.length; i++) {
    makelist(savedSearches)
}
var apiKey = "6441e6e31c53654c07024f7ffc57d21a";


// added header with some css stying just to show I can
var title = $("header").text("Weather Dashboard")
title.attr("style",
    "background-color: rgb(47, 47, 48); color: white; text-align: center; height: 70px; font-size: xx-large; padding-top: .5%"
)
$("body").prepend(title)


$(document).ready(function () {


    $("button").on("click", function () {
        event.preventDefault();
        console.log("working")

        var selectedCity = $("#search").val()
        console.log(selectedCity);





    });
});
// when opening page I need to display current location weather

//add button and/click to search button
// when opening page i need to display current location weather
//gather APIs on weather
//local storage
//big display of current weather
//5day forcast of surrent search

//I search for a city
//I am presented with current and future conditions for that city and that city is added to the search history
//I view current weather conditions for that city
//I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//I view the UV index
//I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//I view future weather conditions for that city
//I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//I click on a city in the search history
//I am again presented with current and future conditions for that city
//I open the weather dashboard
//I am presented with the last searched city forecast