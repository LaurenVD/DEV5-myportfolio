import Meal from './Meal.js'

export default class Weather {
    constructor(api_key) {
        this.apiKey = api_key;

        // check if there is data in local storage
        
        // check if timestamp is older than 10 minutes

        if (
            localStorage.getItem("weather") &&
            Date.now() - localStorage.getItem("timestamp") < 1000*60*10
        ) {
            // get data from local storage
            const weatherData = JSON.parse(localStorage.getItem("weather"));
            this.displayWeather(weatherData);
            console.log("CACHE!!!!");
        }

        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getWeather(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                
                // save to local storage
                localStorage.setItem("weather", JSON.stringify(data));
                // save timestamp
                localStorage.setItem("timestamp", Date.now()); //1620000000000 1970-01-01 00:00:00

                this.displayWeather(data);
            });
    }

    displayWeather(data) {
        const temp = data.current.temp_c;
        document.querySelector(".weather__temp").innerText = "It's " + temp + "°C outside! We suggest to eat...";

        const weather = data.current.condition.text;
        document.querySelector(".weather__summary").innerText = "Omg it's " + weather;

        const icon = data.current.condition.icon;
        //create an image element
        const img = document.createElement("img");
        img.src = icon;
        //append the image to the weather__icon div
        document.querySelector(".weather__icon").appendChild(img);

        const mealImage = document.querySelector(".meal__image");

        if (temp <= 10) {
            this.getMealByName("soup").then((data) => {
                mealImage.src = data.strMealThumb;
            });
         }
         else if (temp > 10, temp <= 20) {
            this.getMealByName("spaghetti").then((data) => {
                mealImage.src = data.strMealThumb;
            });
        }
         else {
            this.getMealByName("salad").then((data) => {
                mealImage.src = data.strMealThumb;
            });
        };
    }
}