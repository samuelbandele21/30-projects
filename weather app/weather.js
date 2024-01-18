const apiKey = "f3160602ebff7d73b26d111c2cc957fd"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

//Code to send an API get request from weatherMap and check for wrong city
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    if (response.status == 404 ) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        
        var data = await response.json()
        
        
        // updating weather app with fields from response received
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"
        
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "imgs/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "imgs/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "imgs/rain.png"
        }    
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "imgs/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "imgs/mist.png"
        }
        document.querySelector(".error").style.display = "none"

        document.querySelector(".weather").style.display = "block"

    }

}

searchbtn.addEventListener("click", ()=>{
    
    checkWeather(searchBox.value)
})

//activate search button when "enter key is pressed on search box"
searchBox.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        searchbtn.click()
    }
})
