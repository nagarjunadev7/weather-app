let mytempurature = document.querySelector(".tempurature");
let myfeels_like = document.querySelector(".feels_like");
let myskydata = document.querySelector(".skydata");
let myname = document.querySelector(".name");
let mycountry = document.querySelector(".country");
let myicon = document.querySelector(".icon");
let myerror = document.querySelector(".error");

//Taking a weather Object to Store Weather Data
const weather = {};
const key = "fd8b2626060756b3f21ab244add8d240";
const KELVIN = 273;

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        myerror.innerHTML = "Opps! We Are Unable to Find the Location "
    }
}
function showPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getDataFromApi(lat, lon);
}
function getDataFromApi(lat,lon){
    let weather_api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    getWeatherReport(weather_api);
}
function getWeatherReport(weather_api){
    fetch(weather_api).then(function(response){
        let data = response.json();
        return data;
    }).then(function(data){
        weather.tempurature = (Math.floor(data.main.temp-KELVIN));
        weather.feels_like = (Math.floor(data.main.feels_like-KELVIN))
        weather.name = data.name;
        weather.country = data.sys.country;
        weather.skydata = data.weather[0].description;
        weather.icon = data.weather[0].icon;
        displayData();
    })
}
function displayData(){
    mytempurature.innerHTML = `${weather.tempurature} &#8451;`;
    myfeels_like.innerHTML =  `Feels Like : ${weather.feels_like} &#8451;`;
    myskydata.innerHTML = weather.skydata;
    myname.innerHTML = weather.name;
    mycountry.innerHTML = weather.country;
    myicon.src = "http://openweathermap.org/img/w/"+ weather.icon+".png";
}

getLocation();