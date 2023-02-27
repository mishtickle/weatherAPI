let input = document.querySelector("input");
let button = document.querySelector("button");

input.placeholder = "Please enter a location"

button.addEventListener("click", () => {
    let location = getLocation();
    //if (!location) input.placeholder = "Please enter a location";
    weatherAPI(location);
})

async function weatherAPI(location){
    let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=dc6d3cd86eb154f68b7d943d9fd9313c&units=metric`, {mode: "cors"})
    if (weather.status === 200){
        let json = await weather.json();
        console.log(json);
        let infoContainer = document.querySelector('.infoContainer');
        let theCity = document.createElement('h3');
        infoContainer.appendChild(theCity).textContent = json.name + ' Weather';
    }
}

function getLocation(){
    let location = input.value;
    return location;
}



