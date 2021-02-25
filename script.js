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
                return response.json();
            }).then(function (json) {
                console.log(json);
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

                    results += "<p>Directions: " + json.meals[i].strInstructions + "</p>";


                    results += "</div>";
                }

                results += "</div>";

                document.getElementById("mealResults").innerHTML = results;
            });
    } else if (type === "category") { //Seafood, vegetarian
        const url2 = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + value;
        fetch(url2)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let results = "<div class='meal-recipes'>";
                for (let i = 0; i < json.meals.length; i++) {
                    results += "<div class='a-meal-recipe'>";
                    results += '<h2>' + json.meals[i].strMeal + "</h2>";
                    results += '<img src="' + json.meals[i].strMealThumb + '/preview"/>';
                    //Output id, then add another tab to call with id

                    results += "</div>";
                    
                }
                
                results += "</div>";

                document.getElementById("mealResults").innerHTML = results;
        });
    } else {
        const url3 = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + value;
        fetch(url3)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let results = "<div class='meal-recipes'>";
                for (let i = 0; i < json.meals.length; i++) {
                    results += "<div class='a-meal-recipe'>";
                    results += '<h2>' + json.meals[i].strMeal + "</h2>";
                    results += '<img src="' + json.meals[i].strMealThumb + '/preview"/>';

                    results += "</div>";
                }

                results += "</div>";

                document.getElementById("mealResults").innerHTML = results;
        });
    }
});
