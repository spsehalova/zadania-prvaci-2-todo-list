// script.js

var tasks = [
    {
        id: crypto.randomUUID(),
        text: 'Buy milk',
        completed: false,
    },
    {
        id: crypto.randomUUID(),
        text: 'Never come back',
        completed: true,
    },
];

const notCompletedTaskList =
    document.querySelector('.not-completed-tasks .task-list');

function createTaskElement(task) {
    const template = document.querySelector('.templates .task')
    const taskElement = template.cloneNode(true);

    taskElement.querySelector('p').innerText = task.text;

    taskElement.dataset.id = task.id;

    return taskElement;
}

function render() {
    notCompletedTaskList.innerHTML = '';

    tasks.forEach((task) => {
        if (task.completed) {
            // TODO: pridat do completed listu
        } else {
            notCompletedTaskList.appendChild(
                createTaskElement(task)
            )
        }
    })
}

const newTaskInput = document.querySelector('#new-task-input')

function addTask(event) {
    event.preventDefault();

    const taskText = newTaskInput.value.trim();

    tasks.push({
        id: crypto.randomUUID(),
        text: taskText,
        completed: false,
    });

    render();

    newTaskInput.value = '';
    newTaskInput.focus();
}

function deleteTask(event) {
    const taskElement =
        event.target.closest('.task');

    const taskId = taskElement.dataset.id;

    tasks = tasks.filter((task) => {
        return task.id !== taskId;
    })

    render();
}

function completeTask(event) {
    const taskElement =
        event.target.closest('.task');

    const taskId = taskElement.dataset.id;

    const completedTask = tasks.find((task) => {
        return task.id === taskId;
    })

    completedTask.completed = true;

    render();
}

render();
