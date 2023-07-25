function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    return `${day} ${hours}:${minutes}`;
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  ////displays the temp and city if "current" button is pressed
  function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}`;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = `${response.data.name}`;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity:${response.data.main.humidity}%`;
    let descriptionElement = document.querySelector("#weather");
    descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  }
  ///retrievePosition function
  function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
  ///getCurrentPosition function
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  
  ///set up event listener for the current location
  let button = document.querySelector("button");
  button.addEventListener("click", getCurrentPosition);
  
  //searches city citySearch funciton
  function citySearch(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
    let apiKey = "abd19514e3c99e53954d6bbc7508f5f4";
    let city = cityInput.value;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }
  ///if they search for a city add event listener
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", citySearch);
  