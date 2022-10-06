import './style.css'
import Weather from "./src/Weather.js"
import Meal from './src/Meal';

const weather = new Weather("c77134dc503d435bb9763002220510");
const meal = new Meal();

// if weather is less than 10 degrees, show a cold meal
// if weather is more than 10 degrees, show a warm meal

const mealImage = document.querySelector(".meal__image");

if (weather.temp > 10) {
    meal.getMealByName("soup").then((data) => {
        console.log(data);
        mealImage.src = data.strMealThumb;
    });
} else if (weather.temp > 10, weather.temp < 20) {
    meal.getMealByName("spaghetti").then((data) => {
        console.log(data);
        mealImage.src = data.strMealThumb;
    });
} else {
    meal.getMealByName("salad").then((data) => {
        console.log(data, mealImage);
        mealImage.src = data.strMealThumb;
    });
}
