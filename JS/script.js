const apikey = "5f97e5e729e1d1009c619db0339bf245"; 
const apiCountryURL = "https://flagcdn.com/16x12/br.png";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

//variables
const cityInput = document.querySelector(".search-field")
const searchBtn = document.querySelector("#search-btn")
const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature")
const description = document.querySelector("#description-sky")
const weatherIconElement = document.querySelector("#weather-icon")
const flagElement = document.querySelector("#country")
const humidityElement = document.querySelector(".humidity span")
const windElement = document.querySelector(".wind span")

const weatherInformations = document.querySelector("#weather-informations-container")

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");


//Loading
const toggleLoader = () => {
    loader.classList.toggle("hide");
  };


// functions

const getWeatherData = async(city) =>{

    toggleLoader();
   
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();
    console.log(data)

    return data
}

//error 

const showErrorMessage = () => {

    errorMessageContainer.classList.remove("hide");

};

const hideInformation = () => {

    errorMessageContainer.classList.add("hide");
    weatherInformations.classList.add("hide");


};

const showWeatherData = async(city) =>{

    hideInformation();

    const data = await getWeatherData(city);
  
    if (data.cod === "404") {
      showErrorMessage();
      return;
    }

    cityElement.innerText = data.name

    tempElement.innerText = `${parseInt(data.main.temp)}°C`

    description.innerText = data.weather[0].description

    humidityElement.innerText = `${data.main.humidity}%`

    windElement.innerText = `${data.wind.speed} Km/h`

    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

    
   flagElement.setAttribute("src", `https://flagcdn.com/16x12/${data.sys.country.toLowerCase()}.png` )

     // Change bg image
    
        document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    
  
   weatherInformations.classList.remove("hide")

}





//events 

searchBtn.addEventListener("click", (e)=>{

    try{
        e.preventDefault();

        const city = cityInput.value
    
        showWeatherData(city)
    }catch{
        console.log("error")
    }
   


})

cityInput.addEventListener("keyup", (e)=>{
   if(e.code === "Enter"){
    const city = e.target.value;
    showWeatherData(city)
   }

})