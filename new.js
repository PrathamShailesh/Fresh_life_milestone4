const ingredients = document.querySelector(".ingridients");
const searchBox = document.querySelector(".search");
const category_name = document.querySelector(".categories_name");
const allSearchedItems = document.querySelector(".searchItems");



//fetching api for the random food item
fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    create(data);
  })
  .catch((error) => {
    console.log(error);
  });



//creating the random food item
function create(data) {
  if (data.meals && Array.isArray(data.meals) && data.meals.length > 0) {
    const mealDetails = data.meals[0];
    randomMeal = " ";
    randomMeal += `
        <img src="${mealDetails.strMealThumb}" class="random_image">
        <h3>${mealDetails.strMeal}</h3>`;
    ingredientName = " ";
    for (let i = 1; i <= 8; i++) {
      const strIngredient = `${mealDetails["strIngredient" + i]}`;
      if(strIngredient==""){
        break
      }
      ingredientName += `
            <li>${strIngredient}</li>
            `;
            
    }
    ingredients.innerHTML = ingredientName;
  }
  const random = document.querySelector(".random");
  //pushing the fetched data of the food item to html
  random.innerHTML = randomMeal;
}



//search box
searchBox.addEventListener("input", function () {
  const hero = searchBox.value;
  const search = `https://www.themealdb.com/api/json/v1/1/search.php?s=` + hero;
  category_name.innerHTML = hero;
  searchbar(search);
});



//fetching input data from the search box 
function searchbar(search) {
  fetch(search)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      searchElements(data.meals);
    })
    .catch((error) => {
    });
}



//creating searched elements and pushing it to html
function searchElements(data) {
  let searchdata = "";

  for (let i = 0; i <= data.length; i++) {
    searchdata += `
        <div class="">
        <div class="images">
        <img src="${data[i].strMealThumb}" alt="${data[i].strMeal}"  class="image">
        </div>
        <h3>${data[i].strMeal}</h3>
        </div>`;

    allSearchedItems.innerHTML = searchdata;
  }
}




const modal = document.querySelector(".modal");
const blur=document.querySelector(".blur")

//ingridients box for all the food items
allSearchedItems.addEventListener("click", function (event) {
  const element = event.target;
  if (element.tagName === "IMG") {
    modal.style.display = "block";
    blur.style.filter="blur(5px)"
    const foodName = element.alt;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meal = data.meals[0];

        let ingredientName = ""

        for (let i = 1; i <= 10; i++) {
          const strIngredient = `${meal["strIngredient" + i]}`;
          if(strIngredient==""){
            break
          }
          ingredientName += `
                    <li class="remove">${strIngredient}</li>
                    `;
        }
        ingredients.innerHTML = ingredientName;
      })
      .catch((error) => {
        console.error(error);
      });
  }
});





//opening popup box for indridients
function popupOpen() {
  modal.style.display = "block";
  modal.classList.add("open_popup");
  blur.style.filter="blur(5px)"
}



// closing popup box for indridients
function popupClose() {
  modal.style.display = "none";
  blur.style.filter="blur(0px)"
}
