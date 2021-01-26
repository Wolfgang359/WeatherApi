

var APIkey = "fa8df56b2be812e87178b515521ee95f";
var Query;
var CityName = $("#CName");
var CTemp = $("#CTemp");
var CHumid = $("#CHumid");
var CWindSpeed = $("#CWind");
var CUV = $("#CUV");
var CIcon = $("#CIcon");
var lat;
var long;
var otherBtns;



$("#submit-btn").on("click", function () {
    Query = $("#searchBar").val();
    createCityButton(Query);
    todayAPIInfo(Query);
    forecastAPIInfo(Query);
});


// $(".otherBtn").on("click", function () {
//     Query = this.text;
//     createCityButton(Query);
//     todayAPIInfo(Query);
//     forecastAPIInfo(Query);
// });

function createCityButton() {

};


function todayAPIInfo(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + Query + "&appid=" + APIkey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        CityName.html(response.name + ", " + response.sys.country);
        CIcon.attr(`src`, `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        CTemp.html(response.main.temp);
        CHumid.html(response.main.humidity);
        CWindSpeed.html(response.wind.speed);

        lat = response.coord.lat;
        long = response.coord.lon;

        UVAPIInfo();
    });
};

function UVAPIInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var UVI = response.value;
        CUV.html(UVI);
        CUV.removeClass()
        if (UVI <= 2) {
            CUV.addClass("btn-success");
        } else if (UVI > 2 && UVI <= 5) {
            CUV.addClass("btn-warning");
        } else if (UVI > 5 && UVI <= 7) {
            CUV.addClass("btn");
            CUV.style("background-color", "orange");
        } else if (UVI > 7) {
            CUV.addClass("btn-danger");
        }
    });
};

function forecastAPIInfo(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + Query + "&appid=" + APIkey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};

