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
        keys = JSON.parse(localStorage.getItem("taskOrder")),
        check = "";
    
    for (let i = 0; i < keys.length; i++){
        archive[keys[i]] = JSON.parse(localStorage.getItem(keys[i]));
        let status = archive[keys[i]].status;
        let task_id = keys[i];
        let task = archive[keys[i]].value;

        if (status === "done")
            check = "checked=true";
        else 
            check = "";
        const li_element = document.createElement("li");
        li_element.innerHTML = `<input class="check" type="checkbox" ${check}>
                            <p class="task" data-task-id="${task_id}" contenteditable="false">${task}</p>
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
document.querySelector("ul").addEventListener("input", function (event) {
    if(event.target && event.target.classList.contains("task")) {
        const p = event.target;
        let task_id = p.getAttribute("data-task-id");
        const taskData = JSON.parse(localStorage.getItem(task_id));
        taskData.value = p.innerHTML;
        localStorage.setItem(task_id, JSON.stringify(taskData));
    }
})
document.querySelector("ul").addEventListener("focusout", function (event) {
    if(event.target && event.target.classList.contains("task")) {
        event.target.setAttribute("contenteditable", "false");
    }
})
document.querySelector("ul").addEventListener("click", function (event) {
    const li = event.target.parentElement;
    const task_id = li.children[1].getAttribute("data-task-id");
    if (event.target && event.target.classList.contains("remove-icon")) {
        let taskIDs = JSON.parse(localStorage.getItem("taskOrder"));
        li.style.display = "none";
        taskIDs = taskIDs.filter(id => { return id !== task_id });
        
        localStorage.removeItem(task_id);
        localStorage.setItem("taskOrder", JSON.stringify(taskIDs));
    }
    else if (event.target && event.target.classList.contains("edit-icon")) {
        li.children[1].setAttribute("contenteditable", "true");
        li.children[1].focus();
    }
});
// function to add task
function Add_Task() {
    const task = document.getElementById("input-field").value;
    if (task.length > 0) {
        let new_task = new Task(task, "pending");
        const li_element = document.createElement("li");
        let taskIDs = JSON.parse(localStorage.getItem("taskOrder")) || [];
        let task_id = new_task.task_id;
        delete new_task.task_id;

        localStorage.setItem(task_id, JSON.stringify(new_task));
        taskIDs.push(task_id);
        localStorage.setItem("taskOrder", JSON.stringify(taskIDs));

        li_element.innerHTML = `<input class="check" type="checkbox">
                                <p class="task" data-task-id="${task_id}" contenteditable="false">${task}</p>
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
