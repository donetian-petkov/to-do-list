document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("addTask");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", () => {
        const taskValue = taskInput.value.trim();

        if (taskValue.length > 0) {
            // Create new task element
            const taskElement = document.createElement("li");
            taskElement.textContent = taskValue;
            taskElement.addEventListener("click", () => {
                taskElement.classList.toggle("complete");
            });

            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                taskElement.remove();
            });

            taskElement.appendChild(deleteBtn);

            // Add task to the list
            taskList.appendChild(taskElement);

            // Clear the input
            taskInput.value = "";
        }
    });
});
