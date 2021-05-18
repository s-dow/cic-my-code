let toDoList = [
  { name: "Item 1", done: false },
  { name: "Item 2", done: false },
  { name: "Item 3", done: false },
];
let searchResults = [];

updateHTML();
function addNewTask(event) {
  event.preventDefault();
  const formField = document.getElementById("newTaskField");
  toDoList.push({ name: formField.value, done: false });
  formField.value = "";
  updateHTML();
}
function editButtonPressed(index) {
  const newName = window.prompt("Enter new name here:");
  toDoList[index].name = newName;
  updateHTML();
}
function deleteButtonPressed(index) {
  if (window.confirm("Are you sure you want to delete this?")) {
    toDoList.splice(index, 1);
    updateHTML();
  }
}
function doneButtonPressed(index) {
  toDoList[index].done = !toDoList[index].done;
  updateHTML();
}
function updateHTML() {
  const searchResultsList = document.getElementById("searchResultsList");
  let htmlSearchListToUpdate = "";
  for (const searchResult of searchResults) {
    console.log(searchResult);
    htmlSearchListToUpdate += `<li class="list-group-item">${searchResult.name}</li>`;
  }
  searchResultsList.innerHTML = htmlSearchListToUpdate;
  const list = document.getElementById("list");
  let htmlToUpdate = "";
  for (const [index, toDoTask] of toDoList.entries()) {
    htmlToUpdate =
      htmlToUpdate +
      `<li class="list-group-item" style="text-decoration: ${
        toDoTask.done === true ? "line-through" : "none"
      } ">
				<div class="row">
					<div class="col-8">
						${toDoTask.name}
					</div>
					<div class="col-4 text-end">
						<button class="btn btn-primary" onclick="editButtonPressed(${index})">Edit</button>
						<button class="btn btn-danger" onclick="deleteButtonPressed(${index})">Delete</button>
						<button class="btn btn-success" onclick="doneButtonPressed(${index})">Done</button>
					</div>
				</div>
			</li>
			`;
  }
  list.innerHTML = htmlToUpdate;
}
function resetToDos() {
  toDoList = [];
  updateHTML();
}
function search(event) {
  event.preventDefault();
  const searchField = document.getElementById("searchField");
  searchResults = [];
  for (const toDoItem of toDoList) {
    if (toDoItem.name.includes(searchField.value)) {
      searchResults.push(toDoItem);
    }
  }
  updateHTML();
}
