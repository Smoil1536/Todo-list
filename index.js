function Add_Task()
{
    let task = document.getElementById("input").value;
    document.getElementById("input").value = "";
    const ul = document.querySelector("ul");
    const newLi = document.createElement("li");
    newLi.setAttribute("class", "LIs");

    // ADDING TASK
    ul.append(newLi);
    const p = document.createElement("p");
    p.innerHTML = task;
    p.setAttribute("class", "task");
    p.setAttribute("onclick", "");
    newLi.appendChild(p);

    // ADDING EDIT BUTTON
    const img = document.createElement("img");
    img.setAttribute("class", "edit");
    img.setAttribute("src", "Icons/edit.png");
    newLi.appendChild(img);

    // ADDING CLOSE BUTTON
    const remove = document.createElement("img");
    remove.setAttribute("class", "remove");
    remove.setAttribute("src", "Icons/remove.png");
    remove.setAttribute("onclick", "");
    newLi.appendChild(remove);

    // MECHANISM OF CLOSE BUTTON
    const classes = document.querySelectorAll(".remove");
    for(let i = 0; i < classes.length; i++)
    {
        classes[i].onclick = function(){
        const li = this.parentElement;
        li.style.display = "none";
        }
    }

    // MECHANISM OF STRIKETHROUGH FEATURE
    const Li_texts = document.querySelectorAll(".task");
    for(let i = 0; i < Li_texts.length; i++)
    {
        Li_texts[i].onclick = function(){
            const text = this;
            text.setAttribute("class", "strikethrough");
        }
    }
}

function Close_Tasks()
{
    const LIs = document.querySelectorAll(".LIs");
    for(let i = 0; i < LIs.length; i++)
    {
        LIs[i].style.display = "none";
    }
}