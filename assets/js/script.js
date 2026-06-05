// ++++++++++++++++++++++++++++++++Script for To-do List App with Weather API and time+++
const apiKey = 'f56768d8967f3a3fddcf238efff96c78';//APIkey
const changeBtn = document.getElementById('changeBackground');

//++++++++++++++++++top buttons++++++++++++++

const clickBtn = document.getElementById('click');
const toggleBtns = [
    document.getElementById('changeBackground'),
    document.getElementById('accentBtn'),
    document.getElementById('textBtn'),
    document.getElementById('brightnessBtn'),
];

let menuOpen = false;

clickBtn.addEventListener('click', function () {
    menuOpen = !menuOpen;
    toggleBtns.forEach(btn => {
        btn.style.display = menuOpen ? 'flex' : 'none';
    });
    if (!menuOpen) {
        brightnessSlider.style.display = 'none';
    }
});

// Accent colour picker
document.getElementById('accentBtn').addEventListener('click', function () {
    document.getElementById('accentColor').click();
});

document.getElementById('accentColor').addEventListener('input', function () {
    document.documentElement.style.setProperty('--accent-color', this.value);
    document.querySelectorAll('#add-btn').forEach(el => el.style.backgroundColor = this.value);
    document.querySelectorAll('ul li').forEach(li => li.style.borderBottomColor = this.value);
    document.querySelectorAll('ul li .task-stars span.active-star').forEach(s => s.style.color = this.value);
});

// Text colour picker
document.getElementById('textBtn').addEventListener('click', function () {
    document.getElementById('textColor').click();
});

document.getElementById('textColor').addEventListener('input', function () {
    document.querySelectorAll('header h1, .date-session, .time-session, .weather-container, .weather-box, .weather-details').forEach(el => {
        el.style.color = this.value;    
    });
     document.querySelectorAll('.todo-app').forEach(s => s.style.backgroundColor = this.value);
});

// Brightness toggle
function toggleBrightness() {
    brightnessSlider.style.display =
        brightnessSlider.style.display === 'block' ? 'none' : 'block';
}

brightnessSlider.addEventListener('input', function () {
    const alpha = (this.value / 100).toFixed(2);
    bgOverlay.style.background = `rgba(0, 0, 0, ${alpha})`;
});

//----------------change background image----
const backgrounds = [
    "assets/images/background.webp",
    "assets/images/mountain.webp",
    "assets/images/rose.webp",
    "assets/images/bluelight.webp",
    "assets/images/skystars.webp",
    "assets/images/green.webp",
    "assets/images/littleorangeflower.webp",
    "assets/images/purpleflower.webp"
];

let currentBg = 0;

changeBtn.addEventListener('click', function () {
    currentBg = (currentBg + 1) % backgrounds.length;
    document.body.style.background = `url('${backgrounds[currentBg]}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    changeBtn.classList.remove('clicked');
    void changeBtn.offsetWidth;
    changeBtn.classList.add('clicked');
});
//+++++++++++++++++++++++++++Script for date+++++++++++++++++++++++++

// Get the HTML elements that display day, month, and year
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");

// Update the date every second
setInterval(() => {
    let currentDate = new Date();
    // Add leading zero if day is less than 10 (e.g. 5 → "05")
    day.innerText = (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate();
    // getMonth() returns 0–11, so add 1 to get the correct month number
    month.innerText = (currentDate.getMonth() + 1 < 10 ? "0" : "") + (currentDate.getMonth() + 1);
    // Display the full 4-digit year
    year.innerText = currentDate.getFullYear();
}, 1000);

//++++++++++++++++++++++++++Script for time+++++++++++++++++++++++++

// Get the HTML elements that display hours, minutes, and seconds
let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

// Update the time every second
setInterval(() => {
    let currentTime = new Date();
    // Add leading zero if hours is less than 10 (e.g. 9 → "09")
    hrs.innerText = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    // Add leading zero if minutes is less than 10
    min.innerText = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    // Add leading zero if seconds is less than 10
    sec.innerText = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);


// ++++++++++++++++++++++   Script for  Weather API  +++

// Get references to weather-related DOM elements used across multiple functions
let weatherContainer = document.querySelector('.weather-container');
let weatherBox = document.querySelector('.weather-box');
let weatherDetails = document.querySelector('.weather-details');


// Function to fetch weather data from OpenWeatherMap API using city name typed by user
async function checkWeather() {
    // Get the city name from the search input field
    let city = document.querySelector(".search-box input").value;

    // Build the API URL using the city name, API key, and metric units (°C)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Stop the function if the input is empty
    if (city === '') {
        return;
    }
    try {
        const response = await fetch(apiUrl);

        // If city is not found, alert the user and clear the input
        if (!response.ok) {
            alert('City not found. Please enter a valid city name.');
            document.querySelector(".search-box input").value = '';
            throw new Error('City not found');
        }

        // Convert the response to a JavaScript object
        const data = await response.json();

        // Expand the weather container height to show all weather info

        let weatherInfo = document.querySelector('.weather-info');

        // Show the weather info section with a fade-in animation
        weatherInfo.style.display = "block";
        weatherInfo.style.animation = "fadeIn 0.5s ease-in-out";

        // Pass data to displayWeather() to update the UI
        displayWeather(data);
        weatherContainer.style.height = "450px";

        // Clear the search input after a successful fetch
        document.querySelector(".search-box input").value = "";


    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Allow user to search for weather by pressing Enter instead of clicking the search button
document.getElementById('city-input').addEventListener('keydown', e => { if (e.key === 'Enter') checkWeather(); });


// Add click listener to the close (×) icon to hide weather infoa
let closeIcon = document.querySelector('.weather-info i');
closeIcon.addEventListener('click', function () {
    let weatherInfo = document.querySelector('.weather-info');
    // Trigger fade-out animation before hiding
    weatherInfo.style.animation = "fadeOut 0.5s ease-in-out";
       setTimeout(() => {
        // Hide the weather info and shrink the container after animation
        weatherInfo.style.display = "none";
        weatherContainer.style.height = "100px";
    }, 500);
});

// Function to update the weather UI with data returned from the API
function displayWeather(data) {
    // Show city name and country code (e.g. "London, GB")
    document.querySelector('.city').innerText = `${data.name}, ${data.sys.country}`;
    // Show rounded temperature with °C symbol
    document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
    // Show weather description (e.g. "light rain", "clear sky")
    document.querySelector('.description').innerText = data.weather[0].description;
    // Load the weather icon from OpenWeatherMap using the icon code in the response
    document.querySelector('.weather-box img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    // Show humidity percentage
    document.querySelector('.info-humidity span').innerText = `${data.main.humidity}%`;
    // Show wind speed in km/h
    document.querySelector('.info-wind span').innerText = `${data.wind.speed} km/h`;
}


/*--------------------------- Local weather----------*/

// Automatically detect the user's city when the page loads
async function autoDetectCity() {
    // If the browser does not support geolocation, fall back to IP-based detection
    if (!navigator.geolocation) {
        getLocationByIP();
        return;
    }

    // Request the user's current GPS coordinates
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            // Extract latitude and longitude from the position object
            const { latitude, longitude } = position.coords;

            try {

                // Build the API URL using coordinates instead of city name
                // This avoids needing a separate reverse-geocoding step
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                const response = await fetch(apiUrl);
                // Convert the response to a JavaScript object
                const data = await response.json();
                console.log(data); // check what comes back

                // OpenWeatherMap returns the nearest city name in data.name
                const city = data.name;

                if (city) {
                    // Put the detected city name into the search input
                    document.getElementById("city-input").value = city;

                    // Run checkWeather() to fetch and display full weather info
                    checkWeather();
                }

            } catch (error) {
                console.log("Weather fetch failed:", error.message);
                // If the API call fails, try IP-based detection as a backup
                getLocationByIP();
            }
        },
        (error) => {
            // User denied location permission — fall back to IP detection
            console.log("Location denied:", error.message);
            getLocationByIP();
        }
    );
}


// Fallback function: detect city from the user's IP address
// Used when geolocation is unavailable or denied
// ip-api.com works on localhost and requires no API key
async function getLocationByIP() {
    try {
        // Fetch location data based on the user's public IP address
        const response = await fetch('http://ip-api.com/json/');
        // Convert the response to a JavaScript object
        const data = await response.json();
        console.log("IP data:", data);

        if (data.city) {
            // Put the detected city into the search input and fetch weather
            document.getElementById("city-input").value = data.city;
            checkWeather();
        }
    } catch (error) {
        // If IP detection also fails, log the error silently
        // The user can still type a city manually
        console.log("IP location failed:", error.message);
    }
}


//++++++++++++++++++++++++++++++ To-do app functionality+++++++++++++++++++++

// Get the input field element (where user types a task)
const todoInput = document.getElementById('inputbox-todo');

// Get the container (ul) where tasks will be displayed
const listContainer = document.getElementById('list-container');

// Function to add a new to-do item to the list
function addTodo() {

    // Check if input is empty or only spaces — show warning and stop
    if (todoInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new list item <li> to hold the task
    let li = document.createElement('li');
    // Create a dedicated, tappable checkbox button for marking task complete


    // Create a <span> to hold the task text
    let taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.innerText = todoInput.value;

    // Add the task text span into the list item
    li.appendChild(taskText);


    // Create a star rating widget (5 stars) for the task
    let starsSpan = document.createElement('span');
    starsSpan.className = 'task-stars';
    // Each star has a data-value attribute used to determine the rating
    starsSpan.innerHTML = `
           <span data-value="1">★</span>
           <span data-value="2">★</span>
           <span data-value="3">★</span>
           <span data-value="4">★</span>
           <span data-value="5">★</span>
         `;
    li.appendChild(starsSpan);

    // Create the delete (×) button for removing the task
    let deleteSpan = document.createElement('span');
    deleteSpan.className = 'delete-btn';
    deleteSpan.textContent = '\u00d7'; // × character
    li.appendChild(deleteSpan);


    /* Create well done image — hidden by default---This for insert img --keep for infuture*/
    /*let wellDoneImg = document.createElement('img');
    wellDoneImg.src = 'assets/images/wellDone.gif'; 
    wellDoneImg.className = 'wellDone-img';
    li.appendChild(wellDoneImg);*/

    // Create well done badge — hidden by default
    let wellDoneImg = document.createElement('div');
    wellDoneImg.className = 'wellDone-img';
    wellDoneImg.textContent = 'You finish the task! 👏👏👏Well Done!🎉';

    // Make it sit on its own row below the task
    wellDoneImg.style.flexBasis = '100%';  // ← takes full width, forces new line
    wellDoneImg.style.textAlign = 'center';

    li.appendChild(wellDoneImg);

    // Add new task at the top of the list
    listContainer.insertBefore(li, listContainer.firstChild);

    // Add the list item to the visible task list
    //listContainer.appendChild(li);


    // Clear the input field after the task is added
    todoInput.value = '';

    // Save the updated list to localStorage so it persists after refresh
    saveData();
    // Refresh the task counter display (remaining/total)
    updateCounter();
}

// Allow user to add a task by pressing Enter instead of clicking the Add button
todoInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });


// Single click listener on the list container handles all interactions:
// star rating, delete button, and task completion toggle
listContainer.addEventListener('click', function (e) {

    //------------------stars ---------------------
    // Check if a star was clicked (parent element has class 'task-stars')
    if (e.target.parentElement && e.target.parentElement.classList.contains('task-stars')) {
        const starsBox = e.target.parentElement;
        // Get the star value (1–5) from the clicked star's data attribute
        const rating = Number(e.target.dataset.value);

        const allStars = starsBox.querySelectorAll('span');

        // Highlight stars up to the selected rating, remove highlight from the rest
        allStars.forEach(function (star) {
            if (Number(star.dataset.value) <= rating) {
                star.classList.add('active-star');
            } else {
                star.classList.remove('active-star');
            }
        });

        // Save updated star state to localStorage
        saveData();
        return;
    }

    //---------------------------delete button------------------------
    // If the delete (×) button was clicked, remove the parent <li>
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveData();
        // Refresh the task counter display (remaining/total)
        updateCounter();
        return;
    }


    /*====================== 
     checked button
    ========================*/
    // Find the nearest <li> ancestor of the clicked element
    const li = e.target.closest('li');
    if (!li) return;

    //Get the bounding box of the list item
    const rect = li.getBoundingClientRect();

    //Calculate how far from the left edge of the <li> the click happened
    const clickX = e.clientX - rect.left;

    // Only toggle 'checked' if the click was within the leftmost 40px (checkbox icon area)
    if (clickX <= 40) {
        li.classList.toggle('checked');


        //------------------------ Show "well done" after finish the task
        // Get the well done image inside this specific li
        const wellDoneImg = li.querySelector('.wellDone-img');

        // If task is now checked — show the image then hide it after 1.5 seconds
        if (li.classList.contains('checked')) {
            wellDoneImg.style.display = 'block';
            wellDoneImg.style.animation = 'popIn 0.4s ease';

            // Hide image after 1.5 seconds
            setTimeout(() => {
                wellDoneImg.style.display = 'none';
                //------------------sort the tasks: unclick tasks are on the top
                sortTasks();
            }, 2000);

        } else {
            // Task unchecked — hide image immediately
            wellDoneImg.style.display = 'none';
            //------------------sort the tasks: unclick tasks are on the top
            sortTasks();
        }


        // Save the updated list to localStorage
        saveData();
        // Refresh the task counter display (remaining/total)
        updateCounter();
    }
    });

/*====================
     Sort tasks
    =====================*/
// Sort tasks so unchecked stay on top, checked go to the bottom
function sortTasks() {
    // Get all current li items as an array
    const tasks = Array.from(listContainer.querySelectorAll('li'));

    // Separate into two groups
    const unchecked = tasks.filter(li => !li.classList.contains('checked'));
    const checked = tasks.filter(li => li.classList.contains('checked'));

    // Put unchecked first, then checked at the bottom
    [...unchecked, ...checked].forEach(li => listContainer.appendChild(li));

    // Save the new order to localStorage
    saveData();
}


/*====================
    Tasks counter
    =====================*/
function updateCounter() {
    const all = listContainer.querySelectorAll('li');
    const unchecked = listContainer.querySelectorAll('li:not(.checked)');
    document.getElementById('total-tasks').textContent = all.length;
    document.getElementById('remaining-tasks').textContent = unchecked.length;
}

// Function to save the current list HTML to localStorage
function saveData() {
    // Store the full innerHTML so tasks, stars, and checked state are all preserved
    localStorage.setItem('data', listContainer.innerHTML);
}

// Function to restore saved tasks from localStorage on page load
function showTask() {
    const savedData = localStorage.getItem('data');

    // If there is saved data, inject it back into the list container
    if (savedData) {
        listContainer.innerHTML = savedData;

        // Refresh the task counter display (remaining/total)
        updateCounter();
        // welldone is hidden
        listContainer.querySelectorAll('.wellDone-img').forEach(img => {
            img.style.display = 'none';
        });
    }
}

// Restore tasks from localStorage when the page first loads
showTask();

// When the page is ready, auto-detect the user's city and display local weather
window.addEventListener("load", autoDetectCity);