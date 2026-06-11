# To-Do List with Weather API


🔗 Live Site: https://luckylemontree.github.io/to-do-list-with-weather-API/


---

## Table of Contents

- [Mockups](#mockups)
- [Wireframes](#wireframes)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Goals & Objectives](#goals--objectives)
- [Target Audience](#target-audience)
- [User Stories](#user-stories)
- [Site Structure](#site-structure)
- [Testing & Validation](#testing--validation)
- [Design Decisions](#design-decisions)
- [Pages Overview](#pages-overview)
- [Technologies Used](#technologies-used)
- [Limitations & Future Improvements](#limitations--future-improvements)
- [Colour Palette](#colour-palette)
- [AI Usage Declaration](#ai-usage-declaration)


---

## Mockups

![Responsive Mockup](assets/images/validator/responsive.png)


---

## Wireframes

![Wireframe — live layout reference](assets/images/validator/wireframe-2.svg)

![Wireframe](assets/images/validator/wireframe.svg)

- Desktop layout: to-do list and weather panel displayed side by side
- Mobile layout: components stack vertically for clean scrolling
- Header buttons and inputs are positioned for easy thumb access on mobile

---

## Project Overview

This project is a browser-based web application that combines two core features:

- A **To-Do List** where users can add, complete, rate, and delete tasks
- A **Weather Checker** that displays real-time weather data based on the user's location or a searched city

The project demonstrates key front-end development skills, including:

- JavaScript DOM manipulation and event handling
- API integration using OpenWeatherMap
- LocalStorage for persistent task data
- Responsive and accessible design
- Dynamic UI customisation (backgrounds, accent colours, brightness)

---

## Key Features

- Add, complete, and delete tasks
- Star rating system (1–5 stars) per task
- Task counter showing remaining and total tasks
- Auto-sort: unchecked tasks stay at the top
- Tasks persist after page refresh using LocalStorage
- Live clock and date display
- Real-time weather data with auto-detected location
- 8 interchangeable background images
- Accent colour picker with preset swatches
- Text colour picker with preset swatches
- Brightness overlay slider
- Frosted glass UI effect throughout

---

## Goals & Objectives

- Build a practical task management tool with persistent state
- Integrate a real-world weather API with geolocation support
- Create a visually polished, responsive interface
- Provide UI customisation controls accessible on all screen sizes
- Deliver an app that is both functional and enjoyable to use

---

## Target Audience

- Students and professionals who want a simple daily task manager
- Casual users who want a quick weather check alongside their task list
- Users who appreciate visual customisation in their tools
- Mobile and desktop users

---

## User Stories

- As a user, I want to add tasks quickly so I can track what I need to do.
- As a user, I want to mark tasks as complete so I can see my progress.
- As a user, I want tasks to be saved so I don't lose them after closing the browser.
- As a user, I want to rate tasks by importance using stars.
- As a user, I want to check the weather for my current location automatically.
- As a user, I want to search weather by city so I can plan ahead.
- As a user, I want to change the background and colours to personalise the app.
- As a user, I want the app to work well on my phone as well as my desktop.

---

## Site Structure

```
index.html          — Single-page application
assets/
  css/style.css     — All custom styles and responsive rules
  js/script.js      — To-do logic, weather API, clock, and UI controls
  images/           — Background images, weather icons, task icons
```

---

## Testing & Validation

Validation screenshots are included in the repository:

- ![Responsive](assets/images/validator/responsive.png) — Responsive layout across devices
- ![CSS Validation](assets/images/validator/validation%20css.png) — CSS validated with W3C
- ![HTML Validation](assets/images/validator/validation%20index%20html.png) — HTML validated with W3C
- ![JavaScript Validation](assets/images/validator/Javascript-validator.png) — JavaScript validated with jShint 
- ![Lighthouse](assets/images/validator/lighthouse1.png) — Lighthouse performance and accessibility report
- ![Lighthouse](assets/images/validator/lighthouse2.png)
- ![Lighthouse](assets/images/validator/lighthouse3.png)
- ![Lighthouse](assets/images/validator/lighthouse4.png)
- ![Lighthouse](assets/images/validator/lighthouse5.png)
- ![Lighthouse](assets/images/validator/lighthouse6.png)

### Identified Issues

- **Resolved:** Minor colour-contrast warnings on text in the frosted glass areas (date, time, weather, search placeholder, and task counter). Fixed by adding a dark `text-shadow` scrim behind the light text and darkening the task counter, keeping text legible above the WCAG 4.5:1 threshold across every scene.
- **Design choice (not a defect):** On mobile, the native `<input type="color">` picker was replaced with a custom swatch popup to avoid the full-screen OS colour dialog covering the app.

---


### Summary

- 0 problems detected
- All JavaScript files passed  successfully


### Files Analysed

- `assets/js/script.js` — 0 issues


### Notes

No errors or warnings were found, indicating clean and consistent code throughout the project.

---

## Design Decisions

- **Frosted glass** — `backdrop-filter: blur()` applied across all panels for a modern, cohesive look
- **Single page** — everything is accessible from one view with no navigation overhead
- **Custom colour popups** — replaced native `<input type="color">` on mobile with a compact swatch popup to avoid the OS full-screen colour picker
- **Auto-sort tasks** — unchecked tasks always appear above completed ones for clarity
- **Geolocation first** — the app attempts GPS-based city detection, then falls back to IP-based detection

---

## Pages Overview

### Main Page (`index.html`)

- To-do list with star ratings, task counter, and LocalStorage persistence
- Live clock and date (updates every second)
- Weather panel with auto-detected city and manual city search
- Header toolbar: background switcher, accent colour picker, text colour picker, brightness slider

---

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- OpenWeatherMap API
- Google Fonts (Alegreya, Nunito)
- Font Awesome
- GitHub Pages (deployment)

---

## Limitations & Future Improvements

### Current Limitations

- No backend or user authentication
- API key is stored client-side
- Weather shows only current conditions, not a forecast
- Colour and background preferences reset on page refresh

### Future Improvements

- 5-day weather forecast view
- Celsius / Fahrenheit toggle
- Save theme preferences in LocalStorage
- Task categories and priority tags
- Due dates and reminders
- Drag-and-drop task reordering
- Performance optimisation for background images

---

## Colour Palette

The UI uses a warm, natural palette with frosted glass overlays:

![Colour Palette](assets/images/validator/colour-palette.svg)

| Colour | Hex | Usage |
|--------|-----|-------|
| Orange | `#f77512` | Default accent — buttons, task borders, active stars |
| Off-white | `#f6f4f2` | Default text colour |
| Glass white | `rgba(255,255,255,0.2)` | Panel backgrounds |
| Green tint | `rgb(195,249,228)` | Date display |
| Pure white | `#ffffff` | Time display and weather text |

---

## AI Usage Declaration

AI tools were used occasionally during this project to help with understanding concepts, checking code, and improving clarity.

### How AI Was Used

- **Code clarification** — Understanding JavaScript logic and debugging async functions
- **Code validation & refinement** — Improving structure, accessibility, and ESLint compliance
- **Image generation** — Background images generated with AI tools
- **Documentation support** — Improving README clarity and structure

### Learning Reflection

Using AI contributed to:

- Stronger understanding of API integration and geolocation
- Better debugging habits for DOM and event handling
- More professional documentation and code organisation

### Tools Used

- Claude (Anthropic)

---

