
let weather = {
    "apikey": "90f64136d557f37479e6f345451952a4",
    fetchWeather: function (city) {
        fetch("https://weatherdbi.herokuapp.com/data/weather/" + city).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    fetchWeather_geo: function (lat, lon) {
        fetch(" https://weatherdbi.herokuapp.com/data/weather/" + lat + "," + lon).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { region } = data;
        const { temp, dayhour, precip, humidity, wind, comment, iconURL } = data.currentConditions;

        document.querySelector(".region h1").innerText = region;
        document.querySelector(".dayhour p").innerText = dayhour;
        document.querySelector(".temp h2").innerText = temp.c + "°C";
        document.querySelector(".humidity p").innerText = "Humidity: " + humidity;
        document.querySelector(".wind p").innerText = "Wind Speed: " + wind.km + "km/h";
        document.querySelector(".precip p").innerText = "Precip: " + precip;
        document.querySelector(".comment p").innerText = comment;
        document.querySelector(".iconURL img").src = iconURL;

        document.getElementById('weather-future').innerHTML = "";
        data.next_days.slice(1).map((x) => {
            weather.addForecast(x.day, x.iconURL, x.min_temp.c, x.max_temp.c, x.comment);
        })
        document.querySelector(".weather-display").classList.remove('weather-hide');

    },
    addForecast: function (dayhour, icon, min, max, comment) {
        let div = document.createElement("div");
        div.classList.add('future-forecast');
        const markup = `
        <p class="dayhour-future">${dayhour}</p>
            <img src=${icon} class="iconURL-future">
            <p class="comment-future">${comment}</p>
            <p class="min-temp">${min}°C </p> <p>to</p>
            <p class="max-temp">${max}°C</p>
            <hr />
        `
        div.innerHTML = markup;
        document.querySelector("#weather-future").appendChild(div);

    },
};



let searchClick = document.querySelector(".search-btn");
searchClick.addEventListener("click", function () {
    let search = document.querySelector(".search-box");
    if (!search.value) {
        alert("Search Field is Empty");
    }
    else {
        weather.fetchWeather(search.value);
    }
})



let geoClick = document.querySelector(".current-loc");
geoClick.addEventListener("click", function () {

    navigator.geolocation.getCurrentPosition(function (position) {

        weather.fetchWeather_geo(position.coords.latitude, position.coords.longitude);

    }, (error) => console.log(error));
})

