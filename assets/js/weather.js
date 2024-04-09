let city = "";
let APIkey = "7df238c4ef760a31797f63b196af2539";
let cities = JSON.parse(localStorage.getItem("cities")) || [];
const citiesDiv = document.getElementById("searched_cities_container");

init();

function init() {
    renderButtons();
}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function renderButtons() {
    citiesDiv.innerHTML = "";
    [...new Set(cities)].forEach(cityName => {
        const buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.classList.add("listbtn");
        citiesDiv.appendChild(buttonEl);
    });
    listClicker();
}

function listClicker() {
    $(".listbtn").on("click", function(event) {
        event.preventDefault();
        city = $(this).text().trim();
        APIcalls();
    });
}

function searchClicker() {
    $("#searchbtn").on("click", function(event) {
        event.preventDefault();
        city = $(this).prev().val().trim();
        if (city === "") return;
        cities.push(city);
        if (cities.length > 8) cities.shift();
        APIcalls();
        storeCities();
        renderButtons();
    });
}

function APIcalls() {
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const queryurl = `${url}${city}&appid=${APIkey}`;
    const current_weather_url = `${currenturl}${city}&appid=${APIkey}`;

    $("#name_of_city").text(`Current Weather in ${city}`);
    $.ajax({
        url: queryurl,
        method: "GET",
    }).then(function(response) {
        let day_number = 0;
        for (const item of response.list) {
            if (item.dt_txt.includes("15:00:00")) {
                const [date, time] = item.dt_txt.split(" ");
                const [year, month, day] = date.split("-");
                $(`#${day_number}date`).text(`${month}/${day}/${year}`);
                const temp = Math.round(((item.main.temp - 273.15) * 9 / 5 + 32));
                $(`#${day_number}five_day_temp`).text(`Temp: ${temp}°F`);
                $(`#${day_number}five_day_humidity`).text(`Humidity: ${item.main.humidity}`);
                $(`#${day_number}five_day_icon`).attr("src", `http://openweathermap.org/img/w/${item.weather[0].icon}.png`);
                day_number++;
            }
        }
    });

    $.ajax({
        url: current_weather_url,
        method: "GET",
    }).then(function(current_data) {
        const temp = Math.round(((current_data.main.temp - 273.15) * 9 / 5 + 32));
        $("#today_temp").text(`Temperature: ${temp}°F`);
        $("#today_humidity").text(`Humidity: ${current_data.main.humidity}`);
        $("#today_wind_speed").text(`Wind Speed: ${current_data.wind.speed}`);
        $("#today_icon_div").attr({
            "src": `http://openweathermap.org/img/w/${current_data.weather[0].icon}.png`,
            "height": "100px",
            "width": "100px"
        });
    });
}

