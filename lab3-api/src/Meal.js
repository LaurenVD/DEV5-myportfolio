const MEAL_URI = 'https://www.themealdb.com/api/json/v1/1/';

export default class Meal {
    async getMealByName(name) {
        const response = await fetch(`${MEAL_URI}search.php?s=${name}`);
        const data = await response.json();
        return data.meals[1];
    }
}

