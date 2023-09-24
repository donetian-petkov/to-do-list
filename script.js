const inputField = document.getElementById('input');
const taskList = document.getElementById('task-list');
inputField.addEventListener('submit', function(e) {

    e.preventDefault();

    const task = e.target.elements["input-field"].value;

    addTask(task, true);
})

const addTask = (task, save = false) => {

    const tasksString = localStorage.getItem('tasks');
    const tasks = tasksString ? JSON.parse(tasksString) : [];


    const tr = document.createElement('tr');
    const id = document.createElement('td');
    const todo = document.createElement('td');

    id.textContent = task.id || (tasks.length + 1).toString();
    todo.textContent = task.taskInput || task;

    tr.appendChild(id);
    tr.appendChild(todo);
    taskList.appendChild(tr);

    if (save) {
        saveTodoToLocal(task);
    }

}

function saveTodoToLocal(taskInput) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];
    const id = todos.length + 1;

    const task = {
        id,
        taskInput
    }

    todos.push(task);
    localStorage.setItem('tasks', JSON.stringify(todos));
}

const savedTodos = JSON.parse(localStorage.getItem('tasks')) || [];
savedTodos.forEach(task => addTask(task));

