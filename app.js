const spinner = document.getElementById('spinner')
spinner.style.display = 'none'
const drinkDetals = document.getElementById('drink-details')
const allDrink = document.getElementById('all-drink')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const errorMessage = document.getElementById('error-message')

// search button event handler
searchBtn.addEventListener('click', function(){
    allDrink.innerHTML = ''
    drinkDetals.innerHTML = ''
    spinner.style.display = 'block'
    const searchText = searchInput.value
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(searchText === '') {
            errorMessage.innerText = `Search box can't be empty`
            spinner.style.display = 'none'
        }else{
            errorMessage.innerText = ''
            displayDrink(data.drinks)
        }
    })
    .catch(error => displayError())
    searchInput.value = ''
})

// display error message
function displayError() {
    errorMessage.innerText = 'No result found'
}

// display drink function
const displayDrink = (drinks) => {
    spinner.style.display = 'none'
    drinks.forEach(drink => {
        // console.log(drink)

        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <button onclick="displayDetails(${drink.idDrink})" class="btn btn-secondary">Details</button>
                </div>
            </div>
        `
        allDrink.appendChild(div)

    })
}

// display drink details
const displayDetails = (drinkId) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.drinks[0]))
}

const showDetails = (drink) => {
    console.log(drink)

    drinkDetals.innerHTML = `
        <div class="col">
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h1 class="card-title text-center text-info">${drink.strDrink}</h1>
                    <h5><span class="text-success">Category:</span> ${drink.strCategory}</h5>
                    <h5><span class="text-success">Glass:</span> ${drink.strGlass}</h5>
                    <p><h5 class="text-success">Introductions:</h5> <p>${drink.strInstructions}</p></p>
                    <p class="card-text"></p>
                </div>
            </div>
        </div>
    `
}