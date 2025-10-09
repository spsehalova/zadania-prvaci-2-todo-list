class Task {
    id;
    text;
    completed;

    constructor(text) {
        this.id = crypto.randomUUID()
        this.text = text;
        this.completed = false;
    }

    complete() {
        this.completed = true
    }

    restore() {
        this.completed = false
    }

    static fromJSON(data) {
        const task = new Task(data.text);
        task.id = data.id;
        task.completed = data.completed;
        return task;
    }
}

// State: Array of tasks
let tasks = [
    new Task('Code this TODO List'),
    new Task('Go to school'),
];

// Get references to DOM elements
const newTaskInput = document.getElementById('new-task-input');
const notCompletedTaskList = document.querySelector('.not-completed-tasks .task-list');
const completedTaskList = document.querySelector('.completed-tasks .task-list');

// Form submit handler
document.querySelector('#add-task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

// Add a new task to state
function addTask() {
    const taskText = newTaskInput.value.trim();

    // Add task to state
    tasks.push(
        new Task(taskText)
    );

    // Clear input and re-render
    newTaskInput.value = '';
    newTaskInput.focus();
    render();
}

// Delete a task from state
function deleteTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = taskElement.dataset.id;
    
    tasks = tasks.filter(task => task.id !== taskId);
    render();
}

// Mark a task as completed
function completeTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = taskElement.dataset.id;
    
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.complete()
    }

    render();
}

// Restore a task to not completed
function restoreTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = taskElement.dataset.id;
    
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.restore()
    }
    
    render();
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

    saveToLocalStorage()
}

function saveToLocalStorage() {
    const jsonData = JSON.stringify(tasks);
    localStorage.setItem('tasks', jsonData)
}

function loadFromLocalStorage() {
    const jsonFromLocalStorage = localStorage.getItem('tasks')

    if (jsonFromLocalStorage) {
        const parsedData = JSON.parse(jsonFromLocalStorage)
        tasks = parsedData.map(Task.fromJSON);
    }
}

loadFromLocalStorage()
render();