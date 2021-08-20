let localData = JSON.parse(localStorage.getItem("todos"));
let data = localData ? [...localData] : []; // mini data base

const createTodoItem = ({ 
  id, 
  task, 
  deadline, 
  done
 }) => {
  let li = document.createElement("li");

  let deleteBtn = document.createElement("img");
  deleteBtn.id = `${id}`; // setting unique id
  deleteBtn.className = "deleteBtn";
  deleteBtn.src = "./images/delete.png";
  deleteBtn.addEventListener("click", onDelete);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = done
  checkbox.setAttribute("unId", id)
  checkbox.addEventListener("change", onDone);

  let txt = document.createTextNode(`${deadline} ${task}`);
  let label = document.createElement("label");
  label.className = "task";
  label.append(txt);

  li.append(label);
  li.append(checkbox);
  li.append(deleteBtn);
  list.append(li);
};

function renderTodos() {
  list.innerHTML = "";
  data.map((todoItem) => {
    createTodoItem(todoItem);
  });
}

let last_id = localData && localData.length && localData[localData.length - 1].id + 1;
let counter = localData ? last_id : 0;

function onAdd() {
  let newTask = textIn.value;
  if (newTask !== "") {
    textIn.value = "";
    data.push({
      id: counter++,
      task: newTask,
      deadline: dateInput.value,
      done: false
    });
    localStorage.setItem("todos", JSON.stringify(data));
    renderTodos();
  } else {
    alert("For create a new todo type smth!");
  }
}

function onDelete(e) {
  let currentId=Number(e.target.id)
  let filteredArray=data.filter(el=>el.id !== currentId)
  data = filteredArray
  localStorage.setItem("todos", JSON.stringify(data))
  renderTodos()
}

function onDone(e) {
  /*if (e.target.checked) {
    e.target.parentElement.classList.add("done");
  } else {
    e.target.parentElement.classList.remove("done");
  }*/

  let currentId = Number(e.target(unId))
  console.log(currentId)

  let modifiedArray = data.map(el =>{ //eski massivdi aralap chygyp
    if (el.id=== currentId){
      el.done= !el.done // false tu true kylat
    }
    return el
  })
}



// set a function
addBtn.addEventListener("click", onAdd);

// if onclick Enter
textIn.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});
renderTodos();
