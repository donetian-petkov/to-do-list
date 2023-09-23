const inputField = document.getElementById('input');
const taskList = document.getElementById('task-list');

const savedTodos = JSON.parse(localStorage.getItem('tasks')) || [];
savedTodos.forEach(task => addTask(task));
inputField.addEventListener('submit', function(e) {

    e.preventDefault();

    addTask(e.target.elements["input-field"].value);
})

const addTask = (task) => {

    const tasks = localStorage.getItem('tasks') || [];

    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = task;
    tr.appendChild(td);
    taskList.appendChild(tr);

}



function saveTodoToLocal(task) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];
    todos.push(task);
    localStorage.setItem('tasks', JSON.stringify(todos));
}

