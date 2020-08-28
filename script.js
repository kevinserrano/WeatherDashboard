var savedSearches = JSON.parse(window.localStorage.getItem("selectedCity")) || [];
console.log(savedSearches);
for (var i = 0; i < savedSearches.length; i++) {
    makelist(savedSearches)
}
var apiKey = "trilogy";


//Added header with some css stying just to show I can
var title = $("header").text("Weather Dashboard")
title.attr("style",
    "background-color: rgb(47, 47, 48); color: white; text-align: center; height: 70px; font-size: xx-large; padding-top: .5%"
)
$("body").prepend(title)


$(document).ready(function () {

    //Adding event listener to my search button
    $("#button").on("click", function () {
        event.preventDefault();
        //make sure event listener is working
        console.log("working")
        //Create a var that holds what is typed into the search area
        var selectedCity = $("#search").val()
        console.log(selectedCity);

        //This function is just adding the cities being searched to the list
        savedSearches.push(selectedCity);
        //When entering new city im checking the savedSearches var to see if city has already been searched
        //If not then push it into the savedSearches var
        window.localStorage.setItem(selectedCity, JSON.stringify(savedSearches));

        weatherInfo(selectedCity);
        cityList(selectedCity);
    });
});
// Calling weatherInfo function
function weatherInfo(selectedCity) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        selectedCity + "&units=imperial&appid=" + apiKey;


    // Here we are running the call to OpenWeather
    $.ajax({
            url: queryURL,
            method: "GET"
        })

        //Making a function that stores everything from the API 
        .then(function (response) {
            console.log("hi")
            console.log(response)

            //Add div that contains the response
            var newInfo = $("<div>").attr("class", "card bg-light");
            $("#main").append(newInfo);


            var cardRow = $("<div>").attr("class", "row-info");
            newInfo.append(cardRow);

            //Get icon displayed
            var Icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            var imgDiv = $("<div>").attr("class", "col-md-3").append($("<img>").attr("src", Icon).attr("class", "card-img"));

            //Transfer content to HTML
            var textDiv = $("<div>").attr("class", "col-md-9");
            var cardBody = $("<div>").attr("class", "card-body");
            textDiv.append(cardBody);
            var todaysDate = moment().format('l');
            cardBody.append($("<h3>").attr("class", "card-title").text(response.name + " " + "(" + todaysDate + ")").append(imgDiv));


            //display Temperature
            cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp + " &#8457;"));
            //display Humidity
            cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
            //display Wind Speed
            cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));


            // Call for UV Index
            var lat = response.coord.lat
            var lon = response.coord.lon
            $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" +
                        lat + "& lon = " + lon + "& appid = " + APIKey,
                    method: "GET"
                })
                .then(function (uvIndexResponse) {
                    var uvNumber = uvIndexResponse.value;
                    var uvColor;
                    if (uvNumber <= 3) {
                        uvColor = "green";
                    } else {
                        uvColor = "red";
                    }
                    var uvDiv = $("<p>").attr("class", "card-text").text("UV Index: ");
                    uvDiv.append($("<span>").attr("class", "uvIndex").attr("style", ("background-color:" + uvColor)).text(uvNumber));
                    cardBody.append(uvDiv);
                });

        });
    cardRow.append(textDiv);

    // //Call for 5 Day Forecast
    var cityID = response.id
    getForecast(cityID)

}



// function uvIndex(lat, lon) {
// };

// 5 Day Forcast Function
function getForecast(cityID) {
    $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&units=imperial&appid=" + APIKey,
            method: "GET"
        })
        .then(function (fiveDayResponse) {
            var fiveDays = $("<div>").attr("class", "forecast");
            $("#main").append(fiveDays);

            //array for 5 Day forecasts at 12:00
            for (var i = 0; i < fiveDayResponse.list.length; i++) {
                if (fiveDayResponse.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    var newCol = $("<div>").attr("class", "fivecards");
                    fiveDays.append(newCol);

                    var newCard = $("<div>").attr("class", "card text-white bg-primary");
                    newCol.append(newCard);

                    var cardHead = $("<div>").attr("class", "card-header").text(moment(fiveDayResponse.list[i].dt, "X").format("MMM Do"));
                    newCard.append(cardHead);

                    var cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + fiveDayResponse.list[i].weather[0].icon + "@2x.png");
                    newCard.append(cardImg);

                    var bodyDiv = $("<div>").attr("class", "card-body");
                    newCard.append(bodyDiv);

                    bodyDiv.append($("<p>").attr("class", "card-text").html("Temp: " + fiveDayResponse.list[i].main.temp + " &#8457;"));
                    bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + fiveDayResponse.list[i].main.humidity + "%"));

                }
            }
        });
};



function cityList(name) {
    var li = $("<li>").addClass("list-group-item").text(name);
    $("#new-info").append(li)
}
$("#new-info").on("click", "li", function () {
    console.log($(this).text());
    weatherInfo($(this).text())
    clear();
})

function clear() {
    //clear all the weather
    $("#main").empty();
}