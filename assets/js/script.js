
// ++++++++++++++++++++++++++++++++++++++++++++++++++Script for To-do List App with Weather API+++
const weatherContainer = document.querySelector('.weather-container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');



// Function to fetch weather data from OpenWeatherMap API       
async function checkWeather() {
    const city = document.querySelector('.search-box input').value;
    const apiKey = 'f56768d8967f3a3fddcf238efff96c78'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city === '') {
        return;
    }
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert('City not found. Please enter a valid city name.');
            document.querySelector('.search-box input').value = '';
            throw new Error('City not found');
        }
        const data = await response.json();

        document.querySelector('.weather-container').style.height = "555px";
        const weatherInfo = document.querySelector('.weather-info');
        weatherInfo.style.display = "block";
        weatherInfo.style.animation = "fadeIn 0.5s ease-in-out";

        displayWeather(data);
        document.querySelector('.search-box input').value = "";

        let closeIcon = document.querySelector('.weather-info i');
        closeIcon.addEventListener('click', function () {
            weatherInfo.style.animation = "fadeOut 0.5s ease-in-out";
            setTimeout(() => {
                weatherInfo.style.display = "none";
                weatherContainer.style.height = "100px";
            }, 500);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


function displayWeather(data) {
    document.querySelector('.city').innerText = `${data.name}, ${data.sys.country}`;
    document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
    document.querySelector('.description').innerText = data.weather[0].description;
    document.querySelector('.weather-box img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.querySelector('.info-humidity span').innerText = `${data.main.humidity}%`;
    document.querySelector('.info-wind span').innerText = `${data.wind.speed} km/h`;


}



//++++++++++++++++++++++++++++++ To-do app functionality+++++++++++++++++++++

// Get the input field element (where user types a task)
const todoInput = document.getElementById('inputbox-todo');

// Get the container (ul) where tasks will be displayed
const listContainer = document.getElementById('list-container');

// Function to add a new to-do item
function addTodo() {

    // Check if input is empty or only spaces
    if (todoInput.value.trim() === '') {
        alert('Please enter a task!'); // show warning
        return; // stop function execution
    }
    else {
        // Create a new list item <li>
        let li = document.createElement('li');

        // Set the text of the li to the input value
        li.innerText = todoInput.value;

        // Add the list item to the container
        listContainer.appendChild(li);


        // Create stars indicator for the task
        let starsSpan = document.createElement('span');
        starsSpan.className = 'task-stars';
        starsSpan.innerHTML = `
           <span data-value="1">★</span>
           <span data-value="2">★</span>
           <span data-value="3">★</span>
           <span data-value="4">★</span>
           <span data-value="5">★</span>
         `;
        li.appendChild(starsSpan);



        // Create the delete button
        let deleteSpan = document.createElement('span');
        deleteSpan.className = 'delete-btn';
        deleteSpan.textContent = '\u00d7';
        li.appendChild(deleteSpan);
    }

    // Clear the input field after adding task
    todoInput.value = '';

    //stars change
    starsChange();
    // Save updated list to localStorage
    saveData();
}

// Add click event listener to the list container 

listContainer.addEventListener('click', function (e) {
    // If one star is clicked
    if (e.target.parentElement.classList.contains('task-stars')) {
        const starsBox = e.target.parentElement;
        const rating = Number(e.target.dataset.value);

        const allStars = starsBox.querySelectorAll('span');

        allStars.forEach(function (star) {
            if (Number(star.dataset.value) <= rating) {
                star.classList.add('active-star');
            } else {
                star.classList.remove('active-star');
            }
        });

        saveData();
        return;
    }

    // Delete button
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveData();
        return;
    }

    // Find nearest li
    const li = e.target.closest('li');

    if (!li) return;

    // Mouse position inside li
    const rect = li.getBoundingClientRect();

    // Distance from left side
    const clickX = e.clientX - rect.left;

    // Only trigger if clicked near icon
    if (clickX <= 40) {
        li.classList.toggle('checked');
        saveData();
    }
});


// Function to save list data in localStorage
function saveData() {

    // Save the innerHTML of the list container
    // This keeps all tasks even after page refresh
    localStorage.setItem('data', listContainer.innerHTML);
}

// Function to display saved tasks from localStorage
function showTask() {

    // Get saved data from localStorage and insert it into the list container
    // This restores all tasks (including checked ones and deleted state)
    listContainer.innerHTML = localStorage.getItem('data');
}

// Call the function when the page loads
// This ensures tasks appear automatically after refresh
showTask();
