const inputField = document.getElementById('input');
const taskList = document.getElementById('task-list');
inputField.addEventListener('submit', function(e) {

    e.preventDefault();

    const task = e.target.elements["input-field"].value;

    addTask(task);
    saveTodoToLocal(task)
})

const addTask = (task) => {

    console.log(task);

    const tasks = localStorage.getItem('tasks') || [];

    const tr = document.createElement('tr');
    const id = document.createElement('td');
    const todo = document.createElement('td');

    id.textContent = tasks.length.toString();
    todo.textContent = task;

    tr.appendChild(id);
    tr.appendChild(todo);
    taskList.appendChild(tr);

}

function saveTodoToLocal(task) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];
    todos.push(task);
    localStorage.setItem('tasks', JSON.stringify(todos));
}

const savedTodos = JSON.parse(localStorage.getItem('tasks')) || [];
savedTodos.forEach(task => addTask(task));

