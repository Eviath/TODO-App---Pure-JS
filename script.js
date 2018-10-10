var data = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : {
      todo: [],
      completed: []
    };



const removeFA = '<i class="far fa-trash-alt"></i>';
const completeFA = '<i class="fas fa-check"></i>';

renderTodoList();
// user clicked on the add button


// if there is any text on the item field, add that text to the todo list.
document.getElementById("add").addEventListener("click", function() {
  var value = document.getElementById("item").value;

  if (value) {
     addItem(value);
  }
});

document.getElementById('item').addEventListener('keydown', function(e) {
  var value = this.value;
if (e.code === 'Enter' && value) {
  addItem(value);
}
});

function addItem(value) {
    addItemToDom(value);
    document.getElementById("item").value = "";
    data.todo.push(value);
    dataObjectUpdated();
}



function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDom(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[i];
    addItemToDom(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem("todoList", JSON.stringify(data));
}

// remove item from list
function removeItem() {
  const item = this.parentNode.parentNode;
  const parent = item.parentNode;
  const id = parent.id;
  const value = item.innerText;

  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

// complete item

function completeItem() {
  const item = this.parentNode.parentNode;
  const parent = item.parentNode;
  const id = parent.id;
  const value = item.innerText;

  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  //     check if element should be added to complete list or re added to todo list
  const target =
    id === "todo"
      ? document.getElementById("completed")
      : document.getElementById("todo");

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// adds a new item to the todo list
function addItemToDom(text, completed) {
  var list = completed
    ? document.getElementById("completed")
    : document.getElementById("todo");

  const item = document.createElement("li");
  item.innerHTML = text;

  //   buttons
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  //   remove button
  const remove = document.createElement("div");
  remove.classList.add("remove");
  remove.innerHTML = removeFA;

  //   add click event for removing the item
  remove.addEventListener("click", removeItem);

  //     complete button
  const complete = document.createElement("div");
  complete.classList.add("complete");
  complete.innerHTML = completeFA;

  //   add click event for completing the item
  complete.addEventListener("click", completeItem);

  //   appending stuff
  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  // add item on top of todo on function addItemTodo()
  list.insertBefore(item, list.childNodes[0]);
}
