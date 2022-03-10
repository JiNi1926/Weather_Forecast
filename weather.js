const time1 = document.getElementById("time");
const date1 = document.getElementById("date");
const currentwether1 = document.getElementById("border-one");
const imezone1 = document.getElementById("timezone");
const weatherforecast1 = document.getElementById("weather-forecast");

const days = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];

const API_KEY = 'c646b88ae9204bf2cbad6a7ff457ff17';
const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    var hourseint12hrsFormat = hour >= 13 ? hour % 12 : hour;
    var minute = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    if (hourseint12hrsFormat <= 9) hourseint12hrsFormat = "0" + hourseint12hrsFormat
    if (minute <= 9) minute = "0" + minute

    time1.innerHTML = `${hourseint12hrsFormat}:${minute} ${ampm}`
    date1.innerHTML = `${days[day]} ${date}, ${months[month]}`
}, 1000);


/// HERE FOR INIT DELHI DATA
const initData = async (cityName) => {
    var cityLat = 0.0;
    var cityLon = 0.0;

    document.getElementById('cityName').innerHTML = cityName[0].toUpperCase() + cityName.substring(1, cityName.length) + ", IN";
    fetch(BASE_URL + `weather?units=metric&appid=${API_KEY}&q=${cityName+',IN'}`,).then(response => response.json()).then(json => { 
        console.log(json);
        document.getElementById("temp_value").innerHTML = json['main']['temp'] + " °C";
        document.getElementById("weather_value").innerHTML = json['weather'][0]['main'];
        document.getElementById("humidity_value").innerHTML = json['main']['humidity'] + "%";
        document.getElementById("wind_value").innerHTML = json['wind']['speed'] + " km/h";
        cityLat = json['coord']['lat'];
        cityLon = json['coord']['lon'];
        fetch(BASE_URL + `onecall?units=metric&appid=${API_KEY}&lat=${cityLat}&lon=${cityLon}&cnt=7&exclude=current,minutely,hourly,alerts`).then(response => response.json()).then(json => { 
            console.log(json);

            for (let index = 1; index <= 7; index++) {
                document.getElementById(`day${index}`).innerHTML = days[(new Date().getDay() + index) % 7];
                document.getElementById(`d${index}`).innerHTML = "Day : " + json["daily"][index]['temp']['day'] + " °C";
                document.getElementById(`n${index}`).innerHTML = "Night : " + json["daily"][index]['temp']['night'] + " °C";
                /*document.getElementById(`n${index}`).innerHTML = "Icon : " + json["daily"][index]['weather']['0']['icon'];*/
            } 
        });
    });

    

    
}

initData('delhi');

function city() 
{
    var city = document.getElementById("search").value;

    initData(city);

}