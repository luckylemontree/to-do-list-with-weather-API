# To-Do List with Weather API

A responsive, browser-based web app that combines a local task manager with live weather lookup.
![alt text](https://github.com/luckylemontree/to-do-list-with-weather-API/blob/main/responsive.png)
This project demonstrates how to build a static frontend application using HTML, CSS, JavaScript, Bootstrap, and external API integration.

## Features

- Add, complete, and delete to-do items.
- Persist tasks in the browser using `localStorage` so they remain after refresh.
- Search live weather by city name using OpenWeatherMap.
- Display weather details including temperature, conditions, humidity, and wind speed.
- Responsive layout suitable for desktop and mobile devices.
- Simple and accessible UI with clear feedback and user interaction.

## Project Structure

- `index.html` — main application page with the to-do list and weather search interface.
- `assets/css/style.css` — custom styling for layout and responsiveness.
- `assets/js/script.js` — application logic for task management and weather API requests.
- `assets/images/` — icon and image assets used in the interface.
- `responsive.png`, `validation css.png`, `validation index html.png`, `validation lighthouse.png` — image files included for project validation and preview.

## Wireframes

This project was planned with a simple, user-focused interface for desktop and mobile use:

- Desktop wireframe shows the weather search panel and to-do list side-by-side.
- Mobile wireframe stacks the weather search above the to-do list for easy vertical scrolling.
- Input controls, task list, and weather results were designed for clear usability and responsive layout.
![wireframe](https://github.com/luckylemontree/to-do-list-with-weather-API/blob/main/wireframe.png)
## How It Works

- Tasks are created when the user types a description and clicks `Add`.
- Clicking a task toggles its completed state by applying a `checked` style.
- Clicking the delete icon removes the task from the list.
- All tasks are saved to `localStorage` automatically so they persist across page reloads.
- The weather search sends a request to the OpenWeatherMap API and displays data in the weather panel.

## Usage

1. Open `index.html` in a browser.
2. Add a new task using the task input field and `Add` button.
3. Click an existing task to mark it complete or incomplete.
4. Remove a task by clicking the `×` icon next to it.
5. Enter a city name in the weather search field and click the search button.
6. View updated weather details in the panel.

## Local Development

Serve the app using a simple static server from the project folder:

```powershell
python -m http.server
```

Then open `http://localhost:8000` in your browser.

## API Configuration

The weather search feature uses the OpenWeatherMap API.

- The API key is currently stored in `assets/js/script.js`.
- Replace the API key string with your own OpenWeatherMap key to avoid rate limits or expiration issues.

## Notes

- This is a static frontend project with no backend.
- Task data is stored locally in the browser and is not synced to a server.
- The app is ideal for learning DOM manipulation, browser storage, and API fetch operations.

## Technologies

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- OpenWeatherMap API

## Color Palette

The design uses a modern, dark theme with strong contrast for readability:

- `#1a1a1a` — primary background
- `#292929` — secondary background panels
- `#404040` — card and element backgrounds
- `#3b4252` — base accent and panel shading
- `#666d7e` — secondary accent and muted text
- `#c4ccdf` — main text and highlight color
- `#88c0d0` — interactive accents and buttons
- `#276271` — stronger accent for active elements

## Validation

This project includes validation checks to ensure code quality and compatibility:

- HTML validation for `index.html`

- CSS validation for `assets/css/style.css`
- Responsive design checks for desktop and mobile layouts
- Lighthouse validation for basic accessibility and performance

Validation screenshots are included in the repository:
- `responsive.png`
- `validation css.png`
- `validation index html.png`
- `validation lighthouse.png`

## Credits

- Built as a combined to-do list and weather lookup app.
- Weather data powered by OpenWeatherMap.
- UI icons and layout enhanced with Bootstrap.

## License

This project is open for personal learning and demonstration use.
