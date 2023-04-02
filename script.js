const weather = {
    API: "e2ba981bb15ab33bc9fc40a1fdd354c1",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.API + "&units=metric").then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { visibility } = data;
        // console.log(name,icon,description,temp,humidity,speed,visibility)
        document.querySelector("#city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind_speed").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".visibility").innerText = "Visibility: " + visibility / 1000 + " km";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search_bar").value);
    },
    localWeather: function () {
        navigator.geolocation.getCurrentPosition(getposition);
        function getposition(position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon=" + long + "&appid=" + weather.API + "&units=metric").then((response) => response.json()).then((data) => weather.displayWeather(data));
        }
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search_bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})
weather.localWeather()