// Get Brewery Location

let name = ''
function searchName() {
  let searchNameURL = `https://api.openbrewerydb.org/breweries?by_name=${name}`
  return fetch(searchNameURL).then((response) => response.json())
}

// render favorites
function renderBreweries() {
  searchName(name).then((data) => {
    let list = []
    let searchResults = document.getElementById('searchResults')
    data.forEach((brewery) => {
      // Render brewery cards --------------

      if (brewery.street) {
        const address = `${brewery.street} ${brewery.state}, ${brewery.postal_code}`

        const button = userFavorites.some((b) => brewery.name === b.name)
          ? `<button class="btn green" disabled>Favorited</button>`
          : `<button class="addFavorite btn green" data-name="${brewery.name}" data-address="${address}" data-website="${brewery.website_url}" >Add Favorite</button>`

        list.push(`
              <div class="col s12 m7">
                  <div class="card horizontal">
                      <div class="card-image">
                      <img class='beer-icon' src="./assets/undraw_Beer_celebration_cefj.png">
                      </div>
                      <div class="card-stacked">
                      <div id="content" class="card-content">
                          <h5>${brewery.name} <span class="new badge" data-badge-caption="${brewery.brewery_type}"/></h5>
                          <p><strong>Address:</strong> <a target="_blank" href="http://maps.google.com/?q=${address}">${address}</a></p>
                          <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>
                      </div>
                      <div class="card-action">
                          ${button}
                      </div>
                      </div>
                  </div>
              </div>
          `)
      }
    })

    searchResults.innerHTML = list.join('')

    // if not in favorites
    document.querySelectorAll('.addFavorite').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        addFavorite(
          e.target.dataset.name,
          e.target.dataset.address,
          e.target.dataset.website
        )
        e.target.disabled = true
        e.target.textContent = 'Favorited'
      })
    })
  })
}

// Add event listener to input to update name variable
document.getElementById('brewery-input').addEventListener('change', (e) => {
  name = e.target.value
})
// Add event listener to button to call Renderbreweries function
document.getElementById('brewery-form').addEventListener('submit', (e) => {
  e.preventDefault()
  renderBreweries()
})
