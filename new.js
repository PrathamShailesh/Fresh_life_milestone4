const url = "https://www.themealdb.com/api/json/v1/1/random.php"
// api(url)

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then((response)=>{
     return response.json()
    // console.log(response)

})
.then((data)=>{
    // console.log(data.meals)
    create(data)
})
.catch((error)=>{
    console.log(error)
})

const searchany=document.querySelector(".search")
searchany.addEventListener('input',function(){

    hero = searchany.value
    
    const search = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + hero

    const cat_name=document.querySelector(".categories_name")

    cat_name.innerHTML=hero
    
    searchbar(search)
})


function searchbar(search){

    
    fetch(search)
    .then((response)=>{
        return response.json()
    // console.log(response)

})
.then((data)=>{
    console.log(data.meals)
    ss(data.meals)
})
.catch((error)=>{
    console.log(error)
})


}



function create(data){
    console.log(data)
    
    if (data.meals && Array.isArray(data.meals) && data.meals.length > 0) {
        const hh = data.meals[0];
        console.log(hh)
        op=" "
        op+=`
        <img src="${hh.strMealThumb}">
        <h3>${hh.strMeal}</h3>`

        const ingredients=document.querySelector('.ingridients')
        oj=" "
        
        for(let i=0;i<=10;i++){
            const strIngredient = `${hh.strIngredient1}${i}`
            oj+=`
            <li>${strIngredient}</li>
            `
        }
        ingredients.innerHTML=oj



    }
    const random=document.querySelector(".random")
    random.innerHTML=op;
}

function ss(data){
    let searchdata=""

    const mega=document.querySelector('.mega')
    for(let i=0;i<=data.length;i++){
        console.log(data[i])
        searchdata+=`
        <div class="${data[i].idMeal}">
        <div class="images">
            <img src="${data[i].strMealThumb}" alt="" style="height: 100px;">
        </div>
        <h3>${data[i].strMeal}</h3>
    </div>`

    mega.innerHTML=searchdata


    }

}


const modal = document.querySelector('.random')













