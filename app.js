let input = document.querySelector("input");
let button = document.querySelector("button");

input.placeholder = "Please enter a location"

button.addEventListener("click", () => {
    let location = input.value;
    weatherAPI(location);
})

async function weatherAPI(location){
    let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=dc6d3cd86eb154f68b7d943d9fd9313c&units=metric`, {mode: "cors"})
    if (weather.status === 200){
        let json = await weather.json();
        displayTodayLocation(json);
        let latitude = json.coord.lat;
        let longitude = json.coord.lon;
        let forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=dc6d3cd86eb154f68b7d943d9fd9313c&units=metric`)
        if (forecast.status === 200){
            let forecastJson = await forecast.json();
            console.log(forecastJson.list[10])
            tomorrowDisplay(forecastJson);
        } 
    }
}

function displayTodayLocation(json){
    let infoContainer = document.querySelector('.infoContainer');
    while (infoContainer.firstChild){
        infoContainer.removeChild(infoContainer.firstChild);
    }
    let theCity = document.createElement('h3');
    infoContainer.appendChild(theCity).textContent = json.name + ' Weather';

    let theNow = document.createElement('h3');
    theNow.textContent = 'Now';
    infoContainer.appendChild(theNow)
    
    let icon = json.weather[0].icon;
    let weatherIconAddress = `http://openweathermap.org/img/w/${icon}.png`;
    let imageIcon = document.createElement('img');
    imageIcon.src = weatherIconAddress;
    infoContainer.appendChild(imageIcon);

    let weather = json.weather[0].description;
    let weatherNode = document.createElement('h3');
    weatherNode.textContent = weather;
    infoContainer.appendChild(weatherNode);

    let temperature = json.main.temp;
    let temperatureNode = document.createElement('h3');
    temperatureNode.textContent = `${temperature} Degrees Celcius`
    infoContainer.appendChild(temperatureNode);
}

function tomorrowDisplay(forecastJson){
    let container = document.querySelector(".forecast");

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    let lineBreak = document.createElement('br');
    container.appendChild(lineBreak);
    
    let tomorrowNode = document.createElement('h3');
    tomorrowNode.innerText = "Tomorrow";
    container.appendChild(tomorrowNode);

    let icon = forecastJson.list[13].weather[0].icon;
    let iconAddress = `http://openweathermap.org/img/w/${icon}.png`
    let imageIcon = document.createElement('img');
    imageIcon.src = iconAddress;
    container.appendChild(imageIcon);

    let weatherDescription = forecastJson.list[13].weather[0].description;
    let weatherNode = document.createElement('h3');
    weatherNode.textContent = weatherDescription;
    container.appendChild(weatherNode);

    let highText = forecastJson.list[11].main.temp_max;
    let lowText = forecastJson.list[14].main.temp_min;
    if (Number(highText) < Number(lowText)){
        z = highText;
        highText = lowText;
        lowText = z;
    }
    let highNode = document.createElement('h3');
   
    highNode.textContent = `High: ${highText} Degrees Celcius`;
    console.log(highNode);
    container.appendChild(highNode);

    
    let lowNode = document.createElement('h3');
    lowNode.textContent = `Low: ${lowText} Degrees Celcius`;
    console.log(lowNode);
    container.appendChild(lowNode);
}



