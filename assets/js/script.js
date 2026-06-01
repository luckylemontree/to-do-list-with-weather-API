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

        // Create a delete button (span)
        let span = document.createElement('span');

        // Add "×" symbol (Unicode) inside span
        span.innerHTML = '\u00d7';

        // Add span inside the li (delete button)
        li.appendChild(span);
    }

    // Clear the input field after adding task
    todoInput.value = '';

    // Save updated list to localStorage
    saveData();
}

// Add click event listener to the list container
listContainer.addEventListener('click', function (e) {

    // If a list item (<li>) is clicked
    if (e.target.tagName === 'LI') {

        // Toggle "checked" class (mark task complete/incomplete)
        e.target.classList.toggle('checked');

        // Save updated data
        saveData()
    }

    // If the delete button (<span>) is clicked
    else if (e.target.tagName === 'SPAN') {

        // Remove the parent <li> (delete task)
        e.target.parentElement.remove();

        // Save updated data
        saveData()
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
