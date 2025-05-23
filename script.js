// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.querySelector('.task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(taskText, completed = false) {
    const li = document.createElement('li');
    li.className = 'task-item' + (completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => toggleTask(li, checkbox.checked));

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(li));

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    return li;
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    taskList.appendChild(createTaskElement(taskText));
    saveTasks();
    
    taskInput.value = '';
}

// Function to toggle task completion
function toggleTask(taskElement, completed) {
    const taskText = taskElement.querySelector('.task-text').textContent;
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    
    if (taskIndex > -1) {
        tasks[taskIndex].completed = completed;
        taskElement.classList.toggle('completed', completed);
        saveTasks();
    }
}

// Function to delete a task
function deleteTask(taskElement) {
    const taskText = taskElement.querySelector('.task-text').textContent;
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        taskElement.remove();
        saveTasks();
    }
}

// Event listeners
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load existing tasks on page load
window.addEventListener('load', () => {
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task.text, task.completed));
    });
});