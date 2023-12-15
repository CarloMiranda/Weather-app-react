import React, { useEffect } from 'react';
import search from '/images/search.png';
import rain from '/images/rain.png';
import clear from '/images/clear.png';
import clouds from '/images/clouds.png';
import drizzle from '/images/drizzle.png';
import snow from '/images/snow.png';
import humidity from '/images/humidity.png';
import wind from '/images/wind.png';


function Index() {
    useEffect(() => {
        const apiKey = "0ed80f74a1626aed890e1d2dd40a8f19";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

        const searchBox = document.querySelector('.search input');
        const searchBtn = document.querySelector('.search button');
        const weatherIcon = document.querySelector('.weather-icon');

        // Function to make the API call
        async function checkWeather(city) {

            try {
            const response = await fetch(apiUrl + city + `&units=metric&appid=${apiKey}`);
                const data = await response.json();

                document.querySelector('.weather-description').innerHTML = data.weather[0].description;
                document.querySelector('.city').innerHTML = data.name;
                document.querySelector('.country').innerHTML = data.sys.country;
                document.querySelector('.temp').innerHTML = data.main.temp + ''
                document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
                document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

                const weatherStatus = data.weather[0].main;
                // Condition for the weather images
                if (weatherStatus == "Clouds") {
                    weatherIcon.src = clouds;
                } else if (weatherStatus == "Clear") {
                    weatherIcon.src = clear;
                } else if (weatherStatus == "Drizzle") {
                    weatherIcon.src = drizzle;
                } else if (weatherStatus == "Rain") {
                    weatherIcon.src = rain;
                } else if (weatherStatus == "Snow") {
                    weatherIcon.src = snow;
                }

            } catch (error) {
                console.error('Error:', error);
            }

        };

        searchBtn.addEventListener('click', function() {
            
            checkWeather(searchBox.value);

        })
    }, [])

    return(
        <div className="card">

            <div className="search">
                <input type="text" placeholder='Enter City' spellCheck='false' />
                <button><img src={ search } /></button>
            </div>

            <div className="weather">
                <h4 className="weather-description">Raining</h4>
                <img src={ rain } className='weather-icon' />
                <h1 className="temp">22°C</h1>
                <h2 className="city">New York</h2>
                <h5 className="country">USA</h5>

                <div className="details">

                    <div className="col">
                        <img src={ humidity } />
                        <div>
                            <p className="humidity">50%</p>
                            <p>Humidity</p>
                        </div>
                    </div>

                    <div className="col">
                        <img src={ wind } />
                        <div>
                            <p className="wind">15 km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                    
                </div>

            </div>

        </div>
    )
}

export default Index;