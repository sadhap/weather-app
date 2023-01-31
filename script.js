const searchButton = document.querySelector('Button');
const searchCity = document.querySelector('#city');
const loadingText =document.querySelector('#load');
const weatherBox = document.querySelector('#weather');
const weatherCity = document.querySelector('#weatherCity');
const weatherDescription = document.querySelector('#weatherDescription');
const weatherTemperature = document.querySelector('#weatherTemperature');
  

function Weather(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this._temperature = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
    get: function() {
        return this._temperature;
    },
    set: function(value) {
        this._temperature = (value * 1.8 + 32).toFixed(2) + 'F.';
    }
});

searchButton.addEventListener('click', searchWhether)

  function searchWhether()  {
    loadingText.style.display = "block";
    weatherBox.style.display = "none";
    const cityName = searchCity.value;
    if (cityName.trim() === 0) {
        return alert('Enter City Name!')
    }

    let http = new XMLHttpRequest();
    const apiKey = 'd597ad06fb54e459d38bcae01de70c95';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    const method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            let data = JSON.parse(http.responseText)
            let weatherData = new Weather(cityName, data.weather[0].description.toUpperCase())
            weatherData.temperature = data.main.temp;
            updatedWeather(weatherData)
            console.log(weatherData)
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something Went Wrong')
        }
    }
http.send();

}

function updatedWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData._temperature;

    loadingText.style.display = "none";
    weatherBox.style.display = "block";
}