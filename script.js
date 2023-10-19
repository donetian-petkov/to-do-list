import {addTask} from './taskService.js'

const inputField = document.getElementById('input');
const taskList = document.getElementById('task-list');
const deleteAllButton = document.getElementById('delete-all');
inputField.addEventListener('submit', function(e) {

    e.preventDefault();

    const task = e.target.elements["input-field"].value;

    if (!task) {
        alert('Please enter a task');
        return;
    }

    addTask(task, taskList, true);

    e.target.elements["input-field"].value = '';
});

try {
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => addTask(task,taskList));
} catch (e) {
    alert("Error while loading tasks from local storage. CLear it manually!");
}

deleteAllButton.addEventListener('click', function() {

    localStorage.removeItem('tasks')
    taskList.innerHTML = '';

});
