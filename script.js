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

    //Adding event listener to my search button
    $("button").on("click", function () {
        event.preventDefault();
        //make sure event listener is working
        console.log("working")
        // create a var that holds what is typed into the search area
        var selectedCity = $("#search").val()
        console.log(selectedCity);

        // This function is just adding the cities being searched to the list
        savedSearches.push(selectedCity);
        // when entering new city im checking the savedSearches var to see if city has already been searched
        //if not the push it into the savedSearches var
        window.localStorage.setItem(selectedCity, JSON.stringify(savedSearches));
        cityList(selectedCity);
        weatherInfno(selectedCity);

    });
});