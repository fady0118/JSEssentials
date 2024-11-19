// inputs, output and buttons elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
// tasks array that will contain the array objects
let tasks = [];
// called with add task button, adds a new task object to the array and calls the displaytasks() function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText});
        taskInput.value = "";
        displayTasks();
    }
}
// called regularly to update the list items
function displayTasks(){
    // clear the display
    taskList.innerHTML = "";
    // create the list element form the array using forEach loop with a checkbox
    // and addEventListener on checkbox state change for each task with its index that calls the toggle function 
    tasks.forEach((task, index)=>{
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
        <label for="task-${index}">${task.text}</label>`;
        li.querySelector("input").addEventListener("change", () => toggleTask(index));
        taskList.appendChild(li);
    })
}
// called when clicking the checkbox, changes the completed state for the task object
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}
// called using the clear completed button, removes completed objects from the task array
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}
// event listeners for the addtask and clearcompleted buttons that pass a reference to the corresponding function
addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);