// Class to construct the values
class Task{
    constructor(value, status) {
        this.task_id = `${Math.floor(Math.random() * 100)}${Date.now()}`;
        this.value = value;
        this.status = status;
    }
}
// Showing the tasks on loading
window.onload = function () {
    let archive = {},
        keys = Object.keys(localStorage),
        check = "";
    
    for (let i = 0; i < keys.length; i++){
        archive[keys[i]] = JSON.parse(localStorage.getItem(keys[i]));
        let status = archive[keys[i]].status;
        let task_id = archive[keys[i]].task_id;
        let task = archive[keys[i]].value;

        if (status === "done")
            check = "checked=true";
        else 
            check = "";
        const li_element = document.createElement("li");
        li_element.innerHTML = `<input class="check" type="checkbox" ${check}>
                            <p class="task" data-task-id="${task_id}">${task}</p>
                            <i class="fa-solid fa-pencil edit-icon" onclick=""></i>
                            <i class="fa-solid fa-xmark remove-icon" onclick=""></i>`;
        document.querySelector("ul").appendChild(li_element);
    }
};
// Events
document.getElementById("clear-button").addEventListener("click", Clear_All);
document.getElementById("add-button").addEventListener("click", Add_Task);
document.querySelector("ul").addEventListener("change", function (event) {
    if (event.target && event.target.classList.contains("check")) {
        const p = event.target.nextElementSibling;
        let task_id = p.getAttribute("data-task-id");
        Toggle(task_id);
    }
});
document.querySelector("ul").addEventListener("click", function (event) {
    const li = event.target.parentElement;
    const task_id = li.children[1].getAttribute("data-task-id");

    if (event.target && event.target.classList.contains("remove-icon")) {
        localStorage.removeItem(task_id);
        li.style.display = "none";
    }
    else if (event.target && event.target.classList.contains("edit-icon")) {
        let task = prompt("Write your task: ");
        if (task.length > 0) {
            const taskData = JSON.parse(localStorage.getItem(task_id));
            const status = taskData.status;
            const newTask = new Task(task, status);
            newTask.task_id = task_id;
            
            li.children[1].innerHTML = task;
            localStorage.setItem(task_id, JSON.stringify(newTask));
        }
    }
});
// function to add task
function Add_Task() {
    const task = document.getElementById("input-field").value;
    if (task.length > 0) {
        let new_task = new Task(task, "pending");
        const li_element = document.createElement("li");
        localStorage.setItem(new_task.task_id, JSON.stringify(new_task));
        li_element.innerHTML = `<input class="check" type="checkbox">
                                <p class="task" data-task-id="${new_task.task_id}">${task}</p>
                                <i class="fa-solid fa-pencil edit-icon" onclick=""></i>
                                <i class="fa-solid fa-xmark remove-icon" onclick=""></i>`;
        document.getElementById("input-field").value = "";
        document.querySelector("ul").appendChild(li_element);
    }
}
// function to remove all tasks
function Clear_All() {
    localStorage.clear();
    document.querySelector("ul").innerHTML = "";
}
// function to toggle the task
function Toggle(task_id) {
    let task = JSON.parse(localStorage.getItem(task_id));
    if (task.status === "pending")
        task.status = "done";
    else
        task.status = "pending";
    localStorage.setItem(task_id, JSON.stringify(task));
}