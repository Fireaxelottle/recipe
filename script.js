// variables
let mealsElement = document.getElementById("meals"); // Get element with ID "meals"
let favMealsContainer = document.getElementById("fav-meals"); // Get element with ID "fav-meals"
const mealPopup = document.getElementById('meal-popup');
const closePopup = document.getElementById('close-popup')
const Recpie = document.querySelector('#meal-info h1')
// Brain

// Get random meal and add it to the screen
for (let i = 0; i < 5; i++) {
  GetRandomMeal();
}


// Get favorite meals from local storage and add them to the screen
getFavMeals();

// Fetch random meal from API and add it to the screen
async function GetRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respJ = await resp.json();
  const RandomMeal = respJ.meals[0];

  // Add meal to the screen
  addMeal(RandomMeal, true);
}

// Fetch meal by ID from API and return it
async function GetMealById(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const data = await response.json();
  const meal = data.meals[0]

  return meal;
}

// Fetch meals by search term from API
async function GetMealBySearch(mealname) {
  let resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealname
  );
  const respData = await resp.json();
  const SearchMeal = respData.meals[0];

  addMeal(SearchMeal);


}



// Add meal to the screen
function addMeal(mealData, random = false) {
  const mealContainer = document.getElementById('meals');
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `  <div class="meal-header">
             
                <img id="meal-img"  src="${mealData.strMealThumb}"
                        alt="${mealData.strMeal}" />
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="more-btn" id="more-btn">
                        Show More
                    </button>
                    <button class="fav-btn" id="fav-btn">
                        <i class="fa-regular fa-heart" id="fav-btn-icon"></i>
                    </button>

                </div>  `;

  // some variables
  const favBtn = meal.querySelector(".fav-btn");
  const favBtnIcon = meal.querySelector("#fav-btn-icon");
  const moreBtn = meal.querySelector(".more-btn");

  // show recpie button
  moreBtn.addEventListener("click", () => {
    mealPopup.classList.remove('hidden');
    Recpie.innerHTML = mealData.strInstructions;
  });

  // Add event listener to favorite button
  favBtn.addEventListener("click", () => {
    if (favBtn.classList.contains("active")) {
      removeMeal_LocalStorage(mealData.idMeal); // Remove meal from local storage

      favBtnIcon.classList.add('fa-regular')
      favBtnIcon.classList.remove('fa-solid')
      favBtn.classList.remove("active");

    } else {
      addMeal_LocalStorage(mealData.idMeal); // Add meal to local storage
      favBtnIcon.classList.remove('fa-regular')
      favBtnIcon.classList.add('fa-solid')
      favBtn.classList.add("active");
    }

    getFavMeals(); // Get favorite meals and add them to the screen

    // show recpie

  });



  mealsElement.appendChild(meal);
}

// Add meal to local storage
function addMeal_LocalStorage(mealID) {
  let mealIDs = getMeals_LocalStorage();
  localStorage.setItem("mealIDs", JSON.stringify([...mealIDs, mealID]));
}

// Remove meal from local storage
function removeMeal_LocalStorage(mealID) {
  let mealIDs = getMeals_LocalStorage();
  localStorage.setItem(
    "mealIDs",
    JSON.stringify(mealIDs.filter((id) => id !== mealID))
  );
}

// Get meals from local storage
function getMeals_LocalStorage() {
  let mealIDs = JSON.parse(localStorage.getItem("mealIDs"));
  return mealIDs === null ? [] : mealIDs;
}

// Get favorite meals from local storage and add them to the screen
async function getFavMeals() {

  favMealsContainer.innerHTML = "";

  let mealIDs = getMeals_LocalStorage();

  mealIDs.forEach(async (mealID) => {
    const mealId = mealID;

    meal = await GetMealById(mealId);
    addFavMeal(meal);

  });
}

// Add favorite meal to the screen
async function addFavMeal(mealData) {

  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
      <img
          src="${mealData.strMealThumb}"
          alt="${mealData.strMeal}"
      /><span>${mealData.strMeal}</span>
      <button class="clear"><i class="fas fa-window-close"></i></button>
  `;

  const btn = favMeal.querySelector(".clear");
  const imgbtn = favMeal.querySelector('img');

  imgbtn.addEventListener('click', () => {
    mealPopup.classList.remove('hidden');
    Recpie.innerHTML = mealData.strInstructions;

  })
  // Add event listener to clear button
  btn.addEventListener("click", () => {
    removeMeal_LocalStorage(mealData.idMeal); // Remove meal from local storage

    getFavMeals(); // Get favorite meals and add them to the screen


  });


  favMealsContainer.appendChild(favMeal);

};


// getmealbysearch

const input = document.getElementById('search-term');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  GetMealBySearch(input.value);


})


// closePopup button function

closePopup.addEventListener('click', () => {
  mealPopup.classList.add('hidden');
  Recpie.innerHTML = "";
});