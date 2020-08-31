var brewery = ["Primal Brewery", "Eleven Brewing Company"];

function displayBreweryInfo() {
    var brewery=$(this).attr("data-name");
}
function searchName (){
var queryURL = 'https://api.openbrewerydb.org/breweries?by_name=${name}';
return fetch((queryURL).then((response) => response.json())

};
.then(function(response) {
    var breweryDiv = $ ("<div class='brewery'>");
    var name = response.name;
    var pOne = $ ("<p>").text("Name:" + name);
    breweryDiv.append(pOne);

    var street =response.street;
    var pTwo = ("<p>").text("Street:" + street);
    breweryDiv.append(pTwo);

    var city = response.city;
    var pThree=$ ("<p>").text("City:" + city);
    breweryDiv.append(pThree);

    var state = response.state;
    var pFour=$ ("<p>").text("State:" + state);
    breweryDiv.append(pFour);

    $("#brewery-view").prepend(breweryDiv);
})

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < brewery.length; i++) {

        var a = $("<button");
        a.addClass ("brewery-btn");
        a.attr("data-name", brewery[i]);
        a.text(brewery[i]);
        $("#buttons-view").apend(a);
    }
}

$("#add-brewery").on ("click", function(event) {
    event.preventDefault();
    var brewery = $("#brewery-input").val().trim();
    brewery.post(brewery);
    renderButtons();
});

$(document).on("click", ".brewery-btn", displayBreweryInfo);
renderButtons();