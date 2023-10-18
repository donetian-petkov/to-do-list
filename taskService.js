export const addTask = (task, HTMLElem, saveTask = false) => {

    const tasksString = localStorage.getItem('tasks');
    const tasks = tasksString ? JSON.parse(tasksString) : [];

    const tr = document.createElement('tr');
    const id = document.createElement('td');
    const todo = document.createElement('td');
    const taskContent = document.createElement('span')
    const status = document.createElement('td');
    const deleteButton = document.createElement('button');
    const icon = document.createElement('i');

    tr.className = 'todo__list-row';
    todo.className = 'todo___list-col';
    id.className = 'todo___list-col';
    status.className = 'todo___list-col';
    deleteButton.className = 'todo___list-dlt-btn';
    icon.className = 'fa-regular fa-trash-can';

    id.textContent = task.id || (tasks.length + 1).toString();
    taskContent.textContent = task.taskInput || task;
    status.textContent = task.status || 'Not Completed';

    if (status.textContent === 'Completed') {
        tr.className='todo___list-col--completed';
    }

    tr.id = `task-list-${task.id || (tasks.length + 1)}`;
    taskContent.id = `task-content-${task.id || (tasks.length + 1)}`;

    taskContent.addEventListener('click', function() {
        if (!this.isContentEditable) {
            this.contentEditable = true;
            this.focus();
        }
    });

   taskContent.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            this.blur();
            this.contentEditable = false;
            const taskInput = e.target.textContent;
            editTask(task.id || (tasks.length + 1), taskInput, HTMLElem);
        }
       });

    taskContent.addEventListener('blur', function(e) {
        const taskInput = e.target.textContent;
        editTask(task.id || (tasks.length + 1), taskInput, HTMLElem);
    });

    status.addEventListener('click', function () {

        changeStatusTask(task.id || (tasks.length + 1), HTMLElem);

    });
    deleteButton.addEventListener('click', function () {

        deleteTask(task.id || (tasks.length + 1), HTMLElem);

    });

    todo.appendChild(taskContent);
    deleteButton.appendChild(icon);
    tr.appendChild(id);
    tr.appendChild(todo);
    tr.appendChild(status);
    tr.appendChild(deleteButton);
    HTMLElem.appendChild(tr);

    if (saveTask) {
        saveTaskToLocalStorage(task);
    }

}

export function changeStatusTask(id, HTMLElem) {

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTasks = savedTasks.map(x => {

            if (x.id === id) {
                return {
                    ...x,
                    status: x.status === 'Completed' ? 'Not Completed' : 'Completed'
                }
            } else return x;

        }
    );

  updateTaskList(newTasks,HTMLElem);


}
export function editTask(id, taskInput, HTMLElem) {

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTasks = savedTasks.map(x => {

            if (x.id === id) {
                return {
                    ...x,
                    taskInput: taskInput
                }
            } else return x;

        }
    );

    updateTaskList(newTasks,HTMLElem);

}
export function deleteTask(id, HTMLElem) {

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTasks = savedTasks.filter(x => x.id !== id).map(x =>
        x.id >= id
            ? {...x, id: x.id - 1}
            : x
    );

    updateTaskList(newTasks,HTMLElem);

}

export function saveTaskToLocalStorage(taskInput) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const id = tasks.length + 1;
    const status = 'Not Completed';
    const task = {
        id,
        taskInput,
        status
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateTaskList(tasks,HTMLElem) {

    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(tasks));

    HTMLElem.replaceChildren();
    tasks.forEach(task => addTask(task, HTMLElem));
}

