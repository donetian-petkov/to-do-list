import {addTask} from './taskService.js'

const inputField = document.getElementById('input');
const taskList = document.getElementById('task-list');
inputField.addEventListener('submit', function(e) {

    e.preventDefault();

    const task = e.target.elements["input-field"].value;

    addTask(task, taskList, true);
});

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => addTask(task,taskList));

