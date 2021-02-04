$(document).ready(function () {
    console.log("Ready!");


    var APIkey = "fa8df56b2be812e87178b515521ee95f";
    var Query;
    var searchHistory = $("#searchHistory");
    var lat;
    var long;



    $("#submit-btn").on("click", function () {
        QUERYFUNCTION();
    });

    $("input").bind("keypress", function (i) {
        if (i.keyCode == 13) {
            QUERYFUNCTION();
        }
    });

    $(".otherBtn").on("click", function () {
        console.log("this is any other button");
        Query = this.innerHTML;
        todayAPIInfo(Query);
        forecastAPIInfo(Query);
    });


    function QUERYFUNCTION() {
        console.log("This is the go button");
        Query = $("#searchBar").val();
        createCityButton(Query);
        todayAPIInfo(Query);
        forecastAPIInfo(Query);
    }



    function createCityButton(newCity) {
        console.log("Creating a button for " + newCity);

        var BTN = $("<button>").attr("class", "btn otherBtn list-group-item");
        BTN.attr("type", "button");
        var Txt = document.createTextNode(newCity);
        BTN.append(Txt);
        searchHistory.append(BTN);
    };


    function todayAPIInfo(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var CityName = $("#CName");
            var CTemp = $("#CTemp");
            var CHumid = $("#CHumid");
            var CWindSpeed = $("#CWind");
            var CIcon = $("#CIcon");

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
            var CUV = $("#CUV");
            console.log(response);

            var UVI = response.value;
            CUV.html(UVI);
            CUV.removeClass()
            if (UVI <= 2) {
                CUV.addClass("btn-success");
            } else if (UVI > 2 && UVI <= 5) {
                CUV.addClass("btn-warning");
            } else if (UVI > 5 && UVI <= 7) {
                CUV.css("background-color", "orange");
            } else if (UVI > 7) {
                CUV.addClass("btn-danger");
            }
        });
    };

    function forecastAPIInfo(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < response.list.length; i++) {
                if (i % 8 === 0) {
                    const day = response.list[i];
                    const date = $(`#${i}-date`);
                    const temp = $(`#${i}-temp`);
                    const humid = $(`#${i}-humid`);
                    const icon = $(`#${i}-icon`)

                    var DIcon = day.weather[0].icon;
                    var DTemp = day.main.temp;
                    var DHumid = day.main.humidity;

                    icon.attr(`src`, `http://openweathermap.org/img/wn/${DIcon}@2x.png`);
                    temp.html(`${DTemp} F`);
                    humid.html(`${DHumid}%`);
                };
            };
        });
    };

});