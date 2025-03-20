const WEATHER_API_KEY = 'f8c7a64b80ff4734b15221030242410';  // Replace with your actual API key
const city = 'Chapel Hill';  // Dynamic location
const WEATHER_API_URL = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`;

async function displayWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error ? data.error.message : "API request failed");
        }

        const weatherInfo = document.getElementById('weather-info');
        const temp = data.current.temp_c;
        const description = data.current.condition.text;
        const icon = data.current.condition.icon;

        weatherInfo.innerHTML = `
            <p class="location">${data.location.name}</p>
            <p class="temp">${temp}°C</p>
            <p class="description">${description}</p>
            <img src="https:${icon}" alt="Weather Icon">
        `;
    } catch (error) {
        document.getElementById('weather-info').innerHTML = '<p>Unable to load weather</p>';
    }
}

displayWeather();

const TIMEZONEDB_API_KEY = 'Z6GJI9E4YPT8'; 

async function displayWorldTime(zone, elementId) {
    try {
        const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONEDB_API_KEY}&format=json&by=zone&zone=${zone}`);
        const data = await response.json();

        if (response.status !== 200 || data.status !== "OK") {
            throw new Error(data.message || "Failed to fetch time");
        }

        const currentTime = new Date(data.formatted).toLocaleTimeString();
        document.getElementById(elementId).textContent = currentTime;
    } catch (error) {
        console.error(`Error fetching time for ${zone}:`, error);
        document.getElementById(elementId).textContent = 'Unable to load time';
    }
}

function updateClocks() {
    displayWorldTime('America/New_York', 'time-durham');
    setTimeout(() => displayWorldTime('America/Los_Angeles', 'time-newyork'), 1000);
    setTimeout(() => displayWorldTime('Europe/London', 'time-london'), 2000);
    setTimeout(() => displayWorldTime('Asia/Tokyo', 'time-tokyo'), 3000);

    
    setTimeout(updateClocks, 900000); 
}

updateClocks();

const textbox = document.querySelector(".textbox");
const tasklist = document.querySelector(".tasklist");
const button = document.querySelector(".button");

function newTask() {
    if (textbox.value === "") {
        return;
    }
    const task = document.createElement("li");
    task.innerHTML = `
        <input type="checkbox" class="checkbox">
        <label>${textbox.value}</label>
        <button class="bin">🗑️</button>
    `

    const bin = task.querySelector(".bin");
    const checkbox = task.querySelector(".checkbox");

    bin.addEventListener("click", function() {
        task.remove();
    });

    checkbox.addEventListener("change", function() {
        if (checkbox.checked){
            task.style.textDecoration = "line-through";
            task.style.color = "#999";
            tasklist.append(task);
        } else {
            task.style.textDecoration = "none";
            task.style.color = "";
            tasklist.prepend(task);
        }
    });

    tasklist.append(task);
    textbox.value = "";
}

button.addEventListener("click", newTask);

textbox.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        newTask();
    }
});