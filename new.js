const ingredients = document.querySelector(".ingridients");
const searchBox = document.querySelector(".search");
const category_name = document.querySelector(".categories_name");
const mega = document.querySelector(".searchItems");




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




function create(data) {
  console.log(data);
  if (data.meals && Array.isArray(data.meals) && data.meals.length > 0) {
    const mealDetails = data.meals[0];
    randomMeal = " ";
    randomMeal += `
        <img src="${mealDetails.strMealThumb}" class="random_image">
        <h3>${mealDetails.strMeal}</h3>`;
    ingredientName = " ";
    for (let i = 1; i <= 5; i++) {
      const strIngredient = `${mealDetails["strIngredient" + i]}`;
      ingredientName += `
            <li>${strIngredient}</li>
            `;
    }
    ingredients.innerHTML = ingredientName;
  }
  const random = document.querySelector(".random");
  random.innerHTML = randomMeal;
}




searchBox.addEventListener("input", function () {
  const hero = searchBox.value;
  const search = `https://www.themealdb.com/api/json/v1/1/search.php?s=` + hero;
  category_name.innerHTML = hero;
  searchbar(search);
});




function searchbar(search) {
  fetch(search)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      searchElements(data.meals);
    })
    .catch((error) => {
      console.log(error);
    });
}




function searchElements(data) {
  let searchdata = "";

  for (let i = 0; i <= data.length; i++) {
    console.log(data[i]);
    searchdata += `
        <div class="${data[i].idMeal}">
        <div class="images">
        <img src="${data[i].strMealThumb}" alt="${data[i].strMeal}"  class="image">
        </div>
        <h3>${data[i].strMeal}</h3>
        </div>`;

    mega.innerHTML = searchdata;
  }
}




const modal = document.querySelector(".modal");


mega.addEventListener("click", function (event) {
  const element = event.target;
  if (element.tagName === "IMG") {
    // ingredients.innerHTML=" "
    modal.style.display = "block";
    const foodName = element.alt;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meal = data.meals[0];
        for (let i = 1; i <= 5; i++) {
          const strIngredient = `${meal["strIngredient" + i]}`;
          ingredientName += `
                    <li class="remove">${strIngredient}</li>
                    `;
          console.log(strIngredient);
        }
        ingredients.innerHTML = ingredientName;
      })
      .catch((error) => {
        console.error(error);
      });
  }
});




function popupOpen() {
  modal.style.display = "block";
  modal.classList.add("open_popup");
  // ingredients.innerHTML=oj
}




function popupClose() {
  modal.style.display = "none";
  // ingredients.remove()
}
