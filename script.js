const inputField = document.getElementById('input');
const taskList = document.getElementById('task-list');

inputField.addEventListener('submit', function(e) {

    e.preventDefault();
    addTask(e.target.elements["input-field"].value);
})

const addTask = (task) => {
    console.log(task);
}