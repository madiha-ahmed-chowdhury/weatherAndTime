
// function createNewDiv() {
//   var newDiv = document.createElement("div");
  
//   // Set some text content to the new div
//   // newDiv.textContent = "This is the dynamically created div!";
  
//   // Optionally, you can add some styles to the new div
//   newDiv.style.backgroundColor = "lightblue";
//   newDiv.style.padding = "10px";
//   newDiv.style.marginTop = "10px";
//   newDiv.style.marginLeft = "5vw";
//   newDiv.style.width = "30vw";
//   // Get the existing div where you want to append the new div
  
//  let existingDiv=document.querySelector(".main");
  
//   // Append the new div under the existing div
//   existingDiv.appendChild(newDiv);
//   existingDiv.classList.add("my");
//  // newDiv.classList.add("newDivStyle");
//  newDiv.setAttribute("id", "dynamicDiv");
// }
// function deleteNewDiv() {
//   var newDiv = document.querySelector("#dynamicDiv");
//   if (newDiv) {
//     newDiv.remove();
// }
// }
// let btn=document.querySelector("#btn");
// btn.addEventListener("click",()=>{
//   createNewDiv();
// });
// let btn2=document.querySelector("#btn2");
// btn2.addEventListener("click",()=>{
//   deleteNewDiv();
// });
let baseURL="https://api.openweathermap.org/data/2.5/weather?q=";
// let city=document.querySelector(".input input").value;
// console.log(city);
//var cityValue = city.value;
let timezone;
let apiKey="1122eab74b61ad941555e604571ab764";
let temp;
let humidity;
let pressure;
let temp_max;
let temp_min;
let country;
let weatherDescription;
let weatherMain;
let longitude;
let latitude;
async function checkWeather(){
    let city = document.querySelector(".input-box input").value;
    console.log(city);
    if(city=="") city="dhaka";
    let URL=baseURL+`${city}&appid=${apiKey}`;
    let response=await fetch(URL);
    let data=await response.json();
    console.log(data);
    temp=Math.ceil(data.main.temp-273.15);
    console.log(temp);
    document.querySelector(".temperature").innerHTML=`${temp} <sup>°C</sup>` ;
    country=data.sys.country;
    updateFlag();
    weatherDescription=data.weather[0].description;
    weatherMain=data.weather[0].main;
    humidity=data.main.humidity;
    document.querySelector("#humidity").innerHTML=`${humidity}%` ;
    console.log(weatherDescription);
    
    document.querySelector(".description").innerText=weatherDescription;
    timezone=data.timezone;
    latitude=data.coord.lat;
    longitude=data.coord.lon;
    // if(weather_data.weather[0].main=='Clouds')weather_img.src = "/cloud.png";
    // else if(weather_data.weather[0].main=='Rain')weather_img.src = "/rain.png";
    // else if(weather_data.weather[0].main=='Mist')weather_img.src = "/mist.png";
    // else if(weather_data.weather[0].main=='Snow')weather_img.src = "/snow.png";
    // else weather_img.src = "/clear.png";
    
    updateFlag();
    getCurrentTime();
    changeImage();
    // console.log(data[weather][temp]);
}
const updateFlag = () => {
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img=document.querySelector("#country-img");
    console.log(country);
    
    img.src = newSrc;
}
document.querySelector("#search").addEventListener("click",()=>{
    checkWeather(); 
});
async function getCurrentTime() {
    // Get the current UTC time in milliseconds                    Q3CQ4Z0GDEKR
    let timeURL=`https://api.timezonedb.com/v2.1/get-time-zone?key=Q3CQ4Z0GDEKR&format=json&by=position&lat=${latitude}&lng=${longitude}`;
    console.log(timeURL);
    let response=await fetch(timeURL);
    let data=await response.json();
    let ss=data.formatted;
    console.log(data.formatted);
    let countryTime=document.querySelector("#country-time");
    let countryDate=document.querySelector("#country-date");
    let dateString="";
    let timeString="";
    let count=0;
    for(let i=0;i<ss.length;i++){
        if(dateString.length ==10) count=1;
        //if(ss[i]=" " && i>=5) {count=1;}
        if(count==1) timeString+=ss[i];
        else dateString+=ss[i];
    }
    countryDate.innerText=dateString;
    countryTime.innerText=timeString;
}
const changeImage= ()=>{
    let weatherImage=document.querySelector("#weather-img");
    if(weatherMain=="Rain" ){
        weatherImage.src="./images/rain.png";
    }else if(weatherMain=="Cloud" || weatherMain=="Clouds"){
        weatherImage.src="./images/cloud.png";
    }else if(weatherMain=="Drizzle" ){
        weatherImage.src="./images/drizle.png";
    }else if(weatherMain=="Snow" ){
        weatherImage.src="./images/snow.png";
    }else if(weatherMain=="Mist" ){
        weatherImage.src="./images/mist.png";
    }else if(weatherMain=="Storm" || weatherMain=="Thunderstorm" || weatherMain=="lightning"){
        weatherImage.src="./images/storm.png";
    }else if(weatherMain=="Clear" ){
        weatherImage.src="./images/rain.png";
    }else if(weatherMain=="Haze" ){
        weatherImage.src="./images/haze.png";
    }else{
        weatherImage.src="./images/notKnown.png";
    }
    console.log(weatherMain);
};
document.addEventListener("DOMContentLoaded",()=>{
    checkWeather();
});
window.addEventListener("load", () => {
    checkWeather();
})

 