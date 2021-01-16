var APIkey = "fa8df56b2be812e87178b515521ee95f";
var Query;
var CityName = $("#CName");
var CTemp = $("#CTemp");
var CHumid = $("#CHumid");
var CWindSpeed = $("#CWind");
var CUV = $("#CUV");


//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

$("button").on("click", function () {
    Query = $("#searchBar").val();
    createCityButton(Query);
    todayAPIInfo(Query);
    forecastAPIInfo(Query);
});




function createCityButton() {

};

function todayAPIInfo(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + Query + "&appid=" + APIkey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        CityName.html(response.name);
        CTemp.html(response.main.temp);
        CHumid.html(response.main.humidity);
        CWindSpeed.html(response.wind.speed);
    });
};

function forecastAPIInfo(city) {
    console.log("Grab that forecast, GRAB IT")
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + Query + "&appid=" + APIkey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};