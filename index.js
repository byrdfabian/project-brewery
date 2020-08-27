document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav')
  var instances = M.Sidenav.init(elems)
})

// Creating script tag for Google API
let script = document.createElement('script')
let key = 'AIzaSyCA-nK8SdguDxQyi-Uj2qssUMZTw3B49DA'

let map, infoWindow
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 14,
  })
  infoWindow = new google.maps.InfoWindow()

  //HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        infoWindow.setPosition(pos)
        infoWindow.setContent('You are here.')
        infoWindow.open(map)
        map.setCenter(pos)
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter())
      }
    )
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }

  // CREATE forEach for map markers to create pins of nearby breweries returned from byZipcode brewery API
  //   var myLatLng = { lat: 35.227067, lng: -80.843159 }

  //   var marker = new google.maps.Marker({
  //     position: myLatLng,
  //     map: map,
  //     title: 'Hello World!',
  //   })
  //   marker.setMap(map)

  console.log(navigator.geolocation)
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? console.log('Error: The Geolocation service failed.')
      : console.log("Error: Your browser doesn't support geolocation.")
  )
  infoWindow.open(map)
}

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
