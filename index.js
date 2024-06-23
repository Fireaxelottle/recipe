// variables
let Meals = document.getElementById("meals");
// Brain

GetRandomMeal();

    async function GetRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respJ = await resp.json();
    const RandomMeal = respJ.meals[0];

    adMeal (RandomMeal, true);}



async function GetMealById() {

    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772");
    const Meal = await response.json();

}

async function GetMealBySearch() {

    let response = await fetch("www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
    const Meals = await response.json();

}


function adMeal(mealData, random = false) {
     const meal = document.createElement("div");
    meal.classList.add('meal');

    meal.innerHTML = 
    
              `  <div class="meal-headder">
              ${random ? `<span class="random"> Random recipie </span>` : ''}
                    <img id="meal-img"  src="${mealData.strMealThumb}"
                        alt="${mealData.strMeal}" />
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn onclick="active"" >
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>  `;

      meal.querySelector(".meal-body .fav-btn").addEventListener("click" , ()=>{
        meal.querySelector(".meal-body .fav-btn").classList.toggle('active')
        meal.querySelector(".meal-body .fav-btn i").classList.toggle('fa-solid')
    }
        )

                Meals.appendChild(meal);
   
};
