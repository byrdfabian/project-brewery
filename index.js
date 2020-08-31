document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav')
  var instances = M.Sidenav.init(elems)
})
// Get brewery by postal code

function getBrewery(postalCode) {
  let brewURL = `https://api.openbrewerydb.org/breweries?by_postal=${postalCode}`
  return fetch(brewURL).then((response) => response.json())
}

function GetAddress() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        console.log(pos)

        let myKey = 'e118d24e5b1cbaf9de643c33e44a9f77'
        let url = `http://api.positionstack.com/v1/reverse?access_key=${myKey}&query=${pos.lat},${pos.lng}`

        fetch(url)
          .then((response) => response.json())
          .then(({ data }) => {
            let confidence = data[0].confidence
            let postalCode = data[0].postal_code

            for (let i = 0; i < data.length; i++) {
              if (data[i].confidence > confidence) {
                confidence = data[i].confidence
                postalCode = data[i].postal_code
              }
            }
            getBrewery(postalCode).then((data) => {
              let list = []
              let locationResults = document.getElementById('locationResults')
              data.forEach((brewery) => {
                console.log(brewery)

                // Render brewery cards --------------

                if (brewery.street) {
                  const address = `${brewery.street} ${brewery.state}, ${brewery.postal_code}`

                  const button = userFavorites.some(
                    (b) => brewery.name === b.name
                  )
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

              locationResults.innerHTML = list.join('')

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
          })
      },
      function () {
        alert('Error getting location')
      }
    )
  } else {
    alert('Error getting location')
  }
}
GetAddress()

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
                <h5>${favorite.name} <span class="new badge" data-badge-caption="Favorited"/></h5>
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
