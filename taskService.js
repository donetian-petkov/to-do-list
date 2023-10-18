function createRow(task, tasks, HTMLElem) {

    const tr = document.createElement('tr');
    const id = document.createElement('td');
    const todo = document.createElement('td');
    const taskContent = document.createElement('span')
    const statusField = document.createElement('td');
    const deleteButton = document.createElement('button');
    const icon = document.createElement('i');

    tr.className = 'todo__list-row';
    todo.className = 'todo__list-col';
    id.className = 'todo__list-col';
    statusField.className = 'todo__list-col complete-field';
    deleteButton.className = 'todo__list-dlt-btn';
    icon.className = 'fa-regular fa-trash-can';

    id.textContent = task.id || (tasks.length + 1).toString();
    taskContent.textContent = task.taskInput || task;
    statusField.textContent = task.statusField || 'Not Completed';

    if (statusField.textContent === 'Completed') {
        tr.className = 'todo__list-col--completed';
    }

    tr.id = `task-list-${getTaskId(task, tasks)}`;
    taskContent.id = `task-content-${getTaskId(task, tasks)}`;

    attachListenersToRow(taskContent, task, tasks, statusField, deleteButton, HTMLElem);

    todo.appendChild(taskContent);
    deleteButton.appendChild(icon);
    tr.appendChild(id);
    tr.appendChild(todo);
    tr.appendChild(statusField);
    tr.appendChild(deleteButton);
    HTMLElem.appendChild(tr);
}

function attachListenersToRow(taskContent, task, tasks, statusField, deleteButton, HTMLElem) {

    taskContent.addEventListener('click', function () {
        if (!this.isContentEditable) {
            this.contentEditable = true;
            this.focus();
        }
    });

    taskContent.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            this.blur();
            this.contentEditable = false;
            const taskInput = e.target.textContent;
            editTask(getTaskId(task, tasks), taskInput, HTMLElem);
        }
    });

    taskContent.addEventListener('blur', function (e) {
        const taskInput = e.target.textContent;
        editTask(getTaskId(task, tasks), taskInput, HTMLElem);
    });

    statusField.addEventListener('click', function () {

        changeStatusTask(getTaskId(task, tasks), HTMLElem);

    });
    deleteButton.addEventListener('click', function () {

        deleteTask(getTaskId(task, tasks), HTMLElem);

    });
}

export const addTask = (task, HTMLElem, saveTask = false, storage = localStorage) => {

    let tasksString;

    try {
        tasksString = storage.getItem('tasks');
    } catch (e) {
        alert(e);
    }
    const tasks = tasksString ? JSON.parse(tasksString) : [];

    createRow(task, tasks, HTMLElem);

    if (saveTask) {
        saveTaskToLocalStorage(task);
    }

}

export function changeStatusTask(id, HTMLElem, storage = localStorage) {

    let savedTasks;
    try {
        savedTasks = JSON.parse(storage.getItem('tasks')) || [];
    } catch (e) {
        alert(e);
    }
    const newTasks = savedTasks.map(x => {

            if (x.id === id) {
                return {
                    ...x,
                    statusField: x.statusField === 'Completed' ? 'Not Completed' : 'Completed'
                }
            } else return x;

        }
    );

    updateTaskList(newTasks, HTMLElem);


}

export function editTask(id, taskInput, HTMLElem, storage = localStorage) {

    let savedTasks;
    try {
        savedTasks = JSON.parse(storage.getItem('tasks')) || [];
    } catch (e) {
        alert(e);
    }
    const newTasks = savedTasks.map(x => {

            if (x.id === id) {
                return {
                    ...x,
                    taskInput: taskInput
                }
            } else return x;

        }
    );

    updateTaskList(newTasks, HTMLElem);

}

export function deleteTask(id, HTMLElem, storage = localStorage) {

    let savedTasks;
    try {
        savedTasks = JSON.parse(storage.getItem('tasks')) || [];
    } catch (e) {
        alert(e);
    }
    const newTasks = savedTasks.filter(x => x.id !== id).map(x =>
        x.id >= id
            ? {...x, id: x.id - 1}
            : x
    );

    updateTaskList(newTasks, HTMLElem);

}

export function saveTaskToLocalStorage(taskInput, storage = localStorage) {
    try {
        const tasks = JSON.parse(storage.getItem('tasks')) || [];
        const id = tasks.length + 1;
        const statusField = 'Not Completed';
        const task = {
            id,
            taskInput,
            statusField
        }

        tasks.push(task);
        storage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        alert(e);
    }
}

export function updateTaskList(tasks, HTMLElem, storage = localStorage) {

    try {
        storage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        alert(e);
    }

    renderTasks(tasks, HTMLElem);
}

export function renderTasks(tasks, HTMLElem) {

    HTMLElem.replaceChildren();
    tasks.forEach(task => addTask(task, HTMLElem));
}

function getTaskId(task, tasks) {
    return task.id || (tasks.length + 1);
}

