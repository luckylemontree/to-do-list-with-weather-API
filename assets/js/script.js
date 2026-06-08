/* jshint esversion: 9 */

// ++++++++++++++++++++++++++++++++Script for To-do List App with Weather API and time+++
const apiKey = 'f56768d8967f3a3fddcf238efff96c78';// OpenWeatherMap API key
const changeBtn = document.getElementById('changeBackground'); // 🏞️ scene-picker button

//++++++++++++++++++top buttons++++++++++++++

// The main toggle button that shows/hides the row of customization buttons
const clickBtn = document.getElementById('click');
// All the buttons that are revealed/hidden by clickBtn
const toggleBtns = [
    document.getElementById('changeBackground'),
    document.getElementById('accentBtn'),
    document.getElementById('textBtn'),
    document.getElementById('brightnessBtn'),
];

let menuOpen = false; // tracks whether the toggle button row is currently shown

// Show or hide the customization buttons each time the main button is clicked
clickBtn.addEventListener('click', function () {
    menuOpen = !menuOpen;
    toggleBtns.forEach(btn => {
        // 'flex' to reveal, 'none' to hide
        btn.style.display = menuOpen ? 'flex' : 'none';
    });
});

// Colour apply helpers

// Apply the chosen accent colour to the add button, task borders, and active stars
function applyAccentColor(color) {

    document.querySelectorAll('#add-btn').forEach(el => el.style.backgroundColor = color);
    document.querySelectorAll('ul li').forEach(li => li.style.borderBottomColor = color);
    document.querySelectorAll('ul li .task-stars span.active-star').forEach(s => s.style.color = color);
}

// Apply the chosen text colour to the header, date/time, and weather text;
// also recolours the to-do panel background
function applyTextColor(color) {
    document.querySelectorAll('header h1, .date-session, .time-session, .weather-container, .weather-box, .weather-details').forEach(el => {
        el.style.color = color;
    });
    document.querySelectorAll('.todo-app').forEach(s => s.style.backgroundColor = color);
}

// Hide all three customization popups (accent, text, and scene pickers)
function closeColorPopups() {
    document.getElementById('accentPopup').style.display = 'none';
    document.getElementById('textPopup').style.display = 'none';
    document.getElementById('scenePopup').style.display = 'none';
}

// Toggle accent popup
document.getElementById('accentBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    const popup = document.getElementById('accentPopup');
    const isOpen = popup.style.display === 'flex';
    closeColorPopups();    
    popup.style.display = isOpen ? 'none' : 'flex';
});

// Toggle text popup
document.getElementById('textBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    const popup = document.getElementById('textPopup');
    const isOpen = popup.style.display === 'flex';
    closeColorPopups();
    popup.style.display = isOpen ? 'none' : 'flex';
});

// Prevent clicks inside popups from closing them
document.getElementById('accentPopup').addEventListener('click', e => e.stopPropagation());
document.getElementById('textPopup').addEventListener('click', e => e.stopPropagation());
document.getElementById('scenePopup').addEventListener('click', e => e.stopPropagation());

// Close popups when clicking anywhere outside
document.addEventListener('click', closeColorPopups);

// Accent swatches
document.getElementById('accentSwatches').addEventListener('click', function (e) {
    if (e.target.classList.contains('color-swatch')) {
        const color = e.target.dataset.color;
        document.getElementById('accentColor').value = color;
        applyAccentColor(color);
        closeColorPopups();
    }
});

// Text swatches
document.getElementById('textSwatches').addEventListener('click', function (e) {
    if (e.target.classList.contains('color-swatch')) {
        const color = e.target.dataset.color;
        document.getElementById('textColor').value = color;
        applyTextColor(color);
        closeColorPopups();
    }
});

// Custom colour inputs (native picker for exact colour)
// Fires live as the user drags within the OS colour picker, so the
// accent updates in real time rather than only on close.
document.getElementById('accentColor').addEventListener('input', function () {
    applyAccentColor(this.value);
});

// Same live-update behaviour for the text colour picker.
document.getElementById('textColor').addEventListener('input', function () {
    applyTextColor(this.value);
});

// Light / Dark toggle — the "Light" pill dims the page with a dark overlay
const brightnessBtn = document.getElementById('brightnessBtn'); // the toggle pill button
const bgOverlay = document.getElementById('bgOverlay');         // full-page tint layer
const DARK_ALPHA = 0.45;                                        // opacity of the dark overlay
const DARK_COLOR = '#111';                                      // colour used for text/panel in dark mode
let darkMode = false;                                           // current toggle state

// Apply (or clear) the dark overlay and sync the button's appearance + saved state.
function applyDarkMode(on) {
    darkMode = on;
    // Tint the page when dark; fully transparent (no dimming) when light.
    bgOverlay.style.background = on ? `rgba(0, 0, 0, ${DARK_ALPHA})` : 'rgba(0, 0, 0, 0)';

    // In dark mode, darken the main text + to-do panel; otherwise clear the
    // inline colour so the user's chosen text colour (or CSS default) takes over.
    const textColor = on ? DARK_COLOR : '';
    document.querySelectorAll('header h1, .date-session, .time-session, .weather-container, .weather-box, .weather-details').forEach(el => {
        el.style.color = textColor;
    });
    document.querySelectorAll('.todo-app').forEach(s => s.style.backgroundColor = textColor);

    // Toggle the CSS class that restyles the pill in dark mode.
    brightnessBtn.classList.toggle('dark', on);
    // Swap the icon + label between Light (bright) and Dark (dimmed) states
    brightnessBtn.querySelector('.pill-icon').textContent = on ? '🌙' : '☀';
    brightnessBtn.querySelector('.pill-label').textContent = on ? 'Dark' : 'Light';
    // Persist the choice so it survives a page reload.
    localStorage.setItem('darkMode', on ? '1' : '0');
}

brightnessBtn.addEventListener('click', function () {
    applyDarkMode(!darkMode);
});

// Restore the saved light/dark choice on load
applyDarkMode(localStorage.getItem('darkMode') === '1');

//----------------change background: scene gradient picker----
// Each scene maps to a CSS gradient. The same gradients are used as the
// swatch previews in the popup (see .scene-swatch rules in style.css).
const scenes = {
    dawn:   "linear-gradient(160deg, #8eb8e5 0%, #e0a06a 60%, #e3855a 100%)",
    golden: "linear-gradient(160deg, #f4922f 0%, #f6c463 100%)",
    forest: "linear-gradient(160deg, #2f5d4c 0%, #6fa085 100%)",
    dusk:   "linear-gradient(160deg, #463c6b 0%, #7d5c93 60%, #c98a73 100%)",
    desert: "linear-gradient(160deg, #d99a5b 0%, #ecca97 100%)",
    sea:    "linear-gradient(160deg, #2f8d99 0%, #93d2d8 100%)",
    dandelion: 'url("assets/images/background.webp")',
    rose: 'url("assets/images/rose.webp")',
   mountain: 'url("assets/images/mountain.webp")',
};

// Apply a scene gradient as the fixed page background
function applyScene(name) {
    const gradient = scenes[name];
    if (!gradient) return;
    document.body.style.background = `${gradient} no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    localStorage.setItem('scene', name);

    // Highlight the active swatch in the popup
    document.querySelectorAll('.scene-swatch').forEach(sw => {
        sw.classList.toggle('active', sw.dataset.scene === name);
    });
}

// 🏞️ button toggles the scene popup (matches the colour picker behaviour)
changeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const popup = document.getElementById('scenePopup');
    const isOpen = popup.style.display === 'flex';
    closeColorPopups();
    popup.style.display = isOpen ? 'none' : 'flex';

});

// Pick a scene from the popup grid
document.getElementById('sceneSwatches').addEventListener('click', function (e) {
    const swatch = e.target.closest('.scene-swatch');
    if (!swatch) return;
    applyScene(swatch.dataset.scene);
    closeColorPopups();
});

// Restore the previously chosen scene on load
applyScene(localStorage.getItem('scene') || 'dawn');





//++++++++++++++++++++++++++++++
// ======================================================
//    To-do app functionality
// ========================================================

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


    // 1.Create a <span> to hold the task text
    let taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.innerText = todoInput.value;

    // Add the task text span into the list item
    li.appendChild(taskText);


    //2. Create a star rating widget (5 stars) for the task
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

    //3. Create the delete (×) button for removing the task
    let deleteSpan = document.createElement('span');
    deleteSpan.className = 'delete-btn';
    deleteSpan.textContent = '\u00d7'; // × character
    li.appendChild(deleteSpan);


    //4.Create well done image — hidden by default---This for insert img --keep for infuture
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


    /*==================================== 
     checked button
    =====================================*/
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


        //===============================================
        //     Show "well done" after finish the task
        //===============================================
        // Get the well done image inside this specific li
        const wellDoneImg = li.querySelector('.wellDone-img');

        // If task is now checked — show the image then hide it after 2.5 seconds
        if (li.classList.contains('checked')) {
            wellDoneImg.style.display = 'block';
            wellDoneImg.style.animation = 'popIn 0.4s ease';

            // Hide image after 2.5 seconds
            setTimeout(() => {
                wellDoneImg.style.display = 'none';
                //------------------sort the tasks: unclick tasks are on the top
                sortTasks();
            }, 2500);

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


/*===========================================
    Tasks counter
    =====================================*/
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++

//===================================================
//               Script for date
//===================================================

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

//=================================
//             Script for time
// ====================================

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


// =============================================
//              Script for  Weather API  
//===========================================
// Get references to weather-related DOM elements used across multiple functions
let weatherContainer = document.querySelector('.weather-container');


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
        console.log(data);
        // Expand the weather container height to show all weather info for testing

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


//========================================
//               Local weather
// ======================================

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



// When the page is ready, auto-detect the user's city and display local weather
window.addEventListener("load", autoDetectCity);