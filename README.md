# To-Do List with Weather API
![responsive](images/responsive.png)
A responsive static web app that combines a local to-do list with live weather search functionality.

This project is built for browser-based use and demonstrates client-side storage, interactive task management, and external API integration.

## Overview

The app allows users to:
- add and delete tasks
- mark tasks as completed
- save tasks in the browser using `localStorage`
- search weather by city using the OpenWeatherMap API
- view current temperature, weather description, humidity, and wind speed

## Pages

- `index.html` — main application page with the to-do list and weather search interface

## Features

- task creation, completion toggle, and deletion
- persistent task storage across refreshes
- live weather lookup by city name
- responsive layout with Bootstrap and custom CSS
- simple, user-friendly interface

## Project Structure

- `index.html` — app markup
- `assets/css/style.css` — custom styling
- `assets/js/script.js` — application logic for to-do list and weather data
- `assets/images/` — icon and image assets used in the UI

## How to Use

1. Open `index.html` in your browser.
2. Add a task in the input field and click `Add`.
3. Click on a task to mark it as completed.
4. Click the `×` icon next to a task to delete it.
5. Enter a city name in the weather search field and click the search button.
6. View the weather details displayed in the panel.

## Local Development

To serve the app locally with a simple web server:

```powershell
python -m http.server
```

Then open `http://localhost:8000` in your browser.

## API Configuration

The weather feature uses OpenWeatherMap.

- The API key is stored in `assets/js/script.js`.
- Replace the existing key with your own OpenWeatherMap key if needed.

## Notes

- Task data is stored locally in the browser only.
- No backend server is required.
- The project is designed as a static frontend app.

## Credits

- Built with HTML, CSS, JavaScript, and Bootstrap
- Weather data powered by OpenWeatherMap
- Icons and UI assets included in `assets/images`
