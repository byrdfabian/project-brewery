// Get Brewery Location
let city = '28203 '
let name = ''
function searchName() {
let searchNameURL = `https://api.openbrewerydb.org/breweries?by_name=${name}`
return fetch(searchNameURL).then((response) => response.json())
}
function getBrewery() {
let brewURL = `https://api.openbrewerydb.org/breweries?by_city=${city}`
fetch(brewURL)
.then((response) => response.json())
.then((data) => console.log(data))
}
getBrewery()
// the link to get the map to work


// ------------------------------ FAVORITES PAGE ------------------------------
// save to favorites page
let userFavorites = localStorage.getItem('userFavorites')
? JSON.parse(localStorage.getItem('userFavorites'))
: []
function addFavorite(name, address, website) {
userFavorites.push({
name,
address,
website,
})
localStorage.setItem('userFavorites', JSON.stringify(userFavorites))
}
// delete from favorites
function removeFavorite(name) {
userFavorites = userFavorites.filter((favorite) => favorite.name !== name)
localStorage.setItem('userFavorites', JSON.stringify(userFavorites))
}
// render favorites
function renderFavorites() {
let list = []
let favoritesContainer = document.getElementById('favorites')
userFavorites.forEach((favorite) => {
list.push(`
<div class="col s12 m7">
<div class="card horizontal">
<div class="card-image">
<img class='beer-icon' src="./assets/undraw_Beer_celebration_cefj.png">
</div>
<div class="card-stacked">
<div id="content" class="card-content">
<h5>${favorite.name}</h5>
<p><strong>Address:</strong> <a target="_blank" href="http://maps.google.com/?q=${favorite.address}">${favorite.address}</a></p>
<a href="${favorite.website}" target="_blank">${favorite.website}</a>
</div>
<div class="card-action">
<button class="removeFavorite btn red" data-name="${favorite.name}" >Remove Favorite</button>
</div>
</div>
</div>
</div>
`)
})
favoritesContainer.innerHTML = list.join('')
document.querySelectorAll('.removeFavorite').forEach((btn) => {
btn.addEventListener('click', (e) => {
removeFavorite(e.target.dataset.name)
renderFavorites()
})
})
}
renderFavorites()
