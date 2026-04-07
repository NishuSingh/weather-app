console.log(window.getComputedStyle(document.querySelector(".weather")).display);

const apiKey ="e118e2609d0433b70f03c42bca55cb56";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(city){
    const response = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${data.main.temp}\u00B0C`; // u2103 combined degree celsius
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Debugging: Log content of <p> tags
        console.log(document.querySelector(".humidity").innerHTML);
        console.log(document.querySelector(".wind").innerHTML);

        if(data.weather[0].main == "Clouds"){
            document.querySelector(".weather-icon").src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            document.querySelector(".weather-icon").src = "images/clear.webp";
        }
        else if(data.weather[0].main == "Rain"){
            document.querySelector(".weather-icon").src = "images/rain.avif";
        }
        else if(data.weather[0].main == "Drizzle"){
            document.querySelector(".weather-icon").src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            document.querySelector(".weather-icon").src = "images/mist.jpeg";
        }
        else if(data.weather[0].main == "Snow"){
            document.querySelector(".weather-icon").src = "images/snow.png";
        }
        else if (data.weather[0].main == "Haze"){
            document.querySelector(".weather-icon").src = "images/haze.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// checkWeather("Melbourne");

document.querySelector(".search button").addEventListener("click", function(){
    checkWeather(document.querySelector(".search input").value);
});