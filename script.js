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
    const status = document.createElement('td');
    const deleteButton = document.createElement('button');
    const icon = document.createElement('i');

    tr.className = 'todo__task-list__body__row';
    todo.className = 'todo__task-list__body__col';
    deleteButton.className = 'todo__task-list__body__dlt-but';
    icon.className = 'fa-regular fa-trash-can';

    id.textContent = task.id || (tasks.length + 1).toString();
    todo.textContent = task.taskInput || task;
    status.textContent = task.status || 'Not Completed';
    tr.id = `task-list-${task.id || (tasks.length + 1)}`;

    deleteButton.addEventListener('click', function() {

        deleteTask(task.id || (tasks.length + 1));

    })


    deleteButton.appendChild(icon);
    tr.appendChild(id);
    tr.appendChild(todo);
    tr.appendChild(status);
    tr.appendChild(deleteButton);
    taskList.appendChild(tr);

    if (save) {
        saveTodoToLocal(task);
    }

}

function saveTodoToLocal(taskInput) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];
    const id = todos.length + 1;

    const status = 'Not Completed';

    const task = {
        id,
        taskInput,
        status
    }

    todos.push(task);
    localStorage.setItem('tasks', JSON.stringify(todos));
}

function deleteTask(id) {

    const savedTodos = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTodos = savedTodos.filter (x => x.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newTodos));


    const rowToBeDelete = document.getElementById(`task-list-${id}`);
    rowToBeDelete.remove();

}

const savedTodos = JSON.parse(localStorage.getItem('tasks')) || [];
savedTodos.forEach(task => addTask(task));

