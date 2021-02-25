document.getElementById("mealSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    let s = document.getElementById('selector');
    let type = s.options[s.selectedIndex].value;
    let value = document.getElementById("mealInput").value;
    console.log(type);
    console.log(value);
    if (type === "dish") {
        if (value === "") {
            value = "random.php";
        } else {
            value = "search.php?s=" + value;
        }
        const url = "https://www.themealdb.com/api/json/v1/1/" + value;
        fetch(url)
            .then(function (response) {
                if (response.status != 200) {
                    return {
                        text: "Error calling the Numbers API service: " + response.statusText
                    }
                }
                return response.json();
            }).then(function (json) {
                console.log(json);
                if (json.meals === null) {
                    alert("Not a listed dish, please try a different option (Chili, lasagne, etc.)");
                }
                let results = "<div class='meal-recipes'>";
                for (let i = 0; i < json.meals.length; i++) {
                    results += "<div class='a-meal-recipe'>";
                    results += '<h2>' + json.meals[i].strMeal + "</h2>";
                    results += '<img src="' + json.meals[i].strMealThumb + '/preview"/>';
                    //Ingredients
                    results += '<ul>';
                    for (let j = 1; j <= 20; ++j) {
                        let ingredient = "strIngredient" + j.toString();
                        let ingredientAmount = "strMeasure" + j.toString();
                        if (json.meals[i][ingredient] === "" || json.meals[i][ingredient] === null) {
                            break;
                        } else {
                            results += "<li>" + json.meals[i][ingredientAmount] + " " + json.meals[i][ingredient] + "</li>";
                        }

                    } results += '</ul>';

                    results += "<p>To see a youtube video of this recipe click <a href='" + json.meals[i].strYoutube + "' target='_blank'>here</a></p>"
                    results += "<p>Directions: " + json.meals[i].strInstructions + "</p>";

                    results += "</div>";
                }

                results += "</div>";

                document.getElementById("mealResults").innerHTML = results;
            });
    } else if (type === "category") { //Seafood, vegetarian, desserts
        const url2 = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + value;
        fetch(url2)
            .then(function (response) {
                if (response.status != 200) {
                    return {
                        text: "Error calling the Numbers API service: " + response.statusText
                    }
                }
                return response.json();
            }).then(function (json) {
                console.log(json);
                if (json.meals === null) {
                    alert("Not a listed category, please try a different option (Vegetarian, dessert, etc.)");
                }
                let results = "<div class='id-info'>";
                results += "<h3>If you find a meal that you want the recipe for, copy the id and search under the id tab</h3>";
                results += "</div>";

                results += "<div class='meal-recipes'>";
                for (let i = 0; i < json.meals.length; i++) {
                    results += "<div class='a-meal-recipe'>";
                    results += '<h2>' + json.meals[i].strMeal + "</h2>";
                    results += '<img src="' + json.meals[i].strMealThumb + '/preview"/>';

                    //Output id, then add another tab to call with id
                    results += '<p>ID: ' + json.meals[i].idMeal + '</p>';

                    results += "</div>";

                }

                results += "</div>";

                document.getElementById("mealResults").innerHTML = results;
            });
    } else if (type === "ingredient") {
        const url3 = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + value;
        fetch(url3)
            .then(function (response) {
                if (response.status != 200) {
                    return {
                        text: "Error calling the Numbers API service: " + response.statusText
                    }
                }
                return response.json();
            }).then(function (json) {
                console.log(json);
                if (json.meals === null) {
                    alert("Not a listed ingredient, please try a different option (Tomato, cheese, egg, etc.)");
                }
                let results = "<div class='id-info'>";
                results += "<h3>If you find a meal that you want the recipe for, copy the id and search under the id tab</h3>";
                results += "</div>";
                
                results += "<div class='meal-recipes'>";
                for (let i = 0; i < json.meals.length; i++) {
                    results += "<div class='a-meal-recipe'>";
                    results += '<h2>' + json.meals[i].strMeal + "</h2>";
                    results += '<img src="' + json.meals[i].strMealThumb + '/preview"/>';

                    results += '<p>ID: ' + json.meals[i].idMeal + '</p>';

                    results += "</div>";
                }

                results += "</div>";

                document.getElementById("mealResults").innerHTML = results;
            });
    } else { //id meal locator
        const url4 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + value;
        fetch(url4)
            .then(function (response) {
                if (response.status != 200) {
                    return {
                        text: "Error calling the Numbers API service: " + response.statusText
                    }
                }
                return response.json();
            }).then(function (json) {
                console.log(json);
                if (json.meals === null) {
                    alert("Not a listed id, please try a valid id");
                }
                let results = "<div class='meal-recipes'>";
                results += "<div class='a-meal-recipe'>";
                results += '<h2>' + json.meals[0].strMeal + "</h2>";
                results += '<img src="' + json.meals[0].strMealThumb + '/preview"/>';

                //Ingredients
                results += '<ul>';
                for (let j = 1; j <= 20; ++j) {
                    let ingredient = "strIngredient" + j.toString();
                    let ingredientAmount = "strMeasure" + j.toString();
                    if (json.meals[0][ingredient] === "" || json.meals[0][ingredient] === null) {
                        break;
                    } else {
                        results += "<li>" + json.meals[0][ingredientAmount] + " " + json.meals[0][ingredient] + "</li>";
                    }

                } results += '</ul>';
                
                results += "<p>To see a youtube video of this recipe click <a href='" + json.meals[0].strYoutube + "' target='_blank'>here</a></p>"
                results += "<p>Directions: " + json.meals[0].strInstructions + "</p>";

                results += "</div>";

                results += "</div>";

                document.getElementById("mealResults").innerHTML = results;
            });
    }
});
