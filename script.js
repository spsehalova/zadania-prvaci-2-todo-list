// API Configuration
const API_BASE_URL = 'https://dummyjson.com';
const USER_ID = 1;

// State: Array of tasks
let tasks = [];

// Get references to DOM elements
const newTaskInput = document.getElementById('new-task-input');
const notCompletedTaskList = document.querySelector('.not-completed-tasks .task-list');
const completedTaskList = document.querySelector('.completed-tasks .task-list');

// Form submit handler
document.querySelector('#add-task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

// Load todos from API
async function loadTodos() {
    try {
        const response = await fetch(`${API_BASE_URL}/todos`);
        const data = await response.json();
        
        // Map API response to our task format
        tasks = data.todos.map(todo => ({
            id: todo.id,
            text: todo.todo,
            completed: todo.completed
        }));
        
        render();
    } catch (error) {
        console.error('Error loading todos:', error);
        // If API fails, try to load from localStorage
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            render();
        }
    }
}

// Add a new task to state
async function addTask() {
    const taskText = newTaskInput.value.trim();
    
    if (!taskText) return;

    try {
        // Post to API
        const response = await fetch(`${API_BASE_URL}/todos/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: taskText,
                completed: false,
                userId: USER_ID
            })
        });
        
        const newTodo = await response.json();
        
        // Add task to local state
        tasks.push({
            id: newTodo.id,
            text: newTodo.todo,
            completed: newTodo.completed
        });

        // Clear input and re-render
        newTaskInput.value = '';
        newTaskInput.focus();
        render();
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
    }
}

// Delete a task from state
async function deleteTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = taskElement.dataset.id;
    
    try {
        // Delete from API
        await fetch(`${API_BASE_URL}/todos/${taskId}`, {
            method: 'DELETE'
        });
        
        // Remove from local state
        tasks = tasks.filter(task => task.id != taskId);
        render();
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
    }
}

// Mark a task as completed
async function completeTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = taskElement.dataset.id;
    
    const task = tasks.find(task => task.id == taskId);
    if (!task) return;
    
    try {
        // Update on API
        await fetch(`${API_BASE_URL}/todos/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: true
            })
        });
        
        // Update local state
        task.completed = true;
        render();
    } catch (error) {
        console.error('Error completing task:', error);
        alert('Failed to complete task. Please try again.');
    }
}

// Restore a task to not completed
async function restoreTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = taskElement.dataset.id;
    
    const task = tasks.find(task => task.id == taskId);
    if (!task) return;
    
    try {
        // Update on API
        await fetch(`${API_BASE_URL}/todos/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: false
            })
        });
        
        // Update local state
        task.completed = false;
        render();
    } catch (error) {
        console.error('Error restoring task:', error);
        alert('Failed to restore task. Please try again.');
    }
}

// Create task element from task object
function createTaskElement(task) {
    // Clone the template
    const template = document.querySelector('.templates .task');
    const taskDiv = template.cloneNode(true);

    // Set task ID as data attribute
    taskDiv.dataset.id = task.id;

    // Update task text
    taskDiv.querySelector('p').textContent = task.text;

    return taskDiv;
}

// Render all tasks to the DOM
function render() {
    // Clear both lists
    notCompletedTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    // Render tasks based on their completion status
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        if (task.completed) {
            completedTaskList.appendChild(taskElement);
        } else {
            notCompletedTaskList.appendChild(taskElement);
        }
    });

    // Save to localStorage as backup
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize app by loading todos from API
loadTodos();