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
let city = ' '

function getBrewery() {
  let brewURL = `https://api.openbrewerydb.org/breweries?by_city=${city}`
  fetch(brewURL)
    .then((response) => response.json())
    .then((data) => console.log(data))
}
getBrewery()

// function getRating() {
//   let ratingURL =
//     'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating&key=YOUR_API_KEY'

//   fetch(ratingURL)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }
