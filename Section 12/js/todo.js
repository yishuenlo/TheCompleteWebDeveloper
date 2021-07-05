let button = document.querySelector("#button");
let userInput = document.querySelector("#userinput");
let todoList = document.querySelector("#todo-list");
let taskList = document.querySelectorAll("li");

function updateTaskList() {
  taskList = Array.from(document.querySelectorAll("li"));
}

button.addEventListener("click", function () {
  //if there is user input AND no item doesn't already exist on the list
  if (userInput.value.length > 0 && checkDuplicates(userInput.value)) {
    //capitalize first letter of every word for user input
    //convert string into array
    let input = userInput.value.split(" ");

    //loop through array to capitalize every word
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i][0].toUpperCase() + input[i].slice(1);
    }

    //create new li node
    let item = document.createElement("li");

    //add text value to li
    item.appendChild(document.createTextNode(input.join(" ")));

    //append li to ul
    todoList.appendChild(item);

    updateTaskList();

    //add event listener to new task
    let newTask = taskList[taskList.length - 1];
    newTask.addEventListener("click", function () {
      newTask.classList.toggle("finished");
    });
  } else {
    console.log("please enter item name");
  }
});

function addToList() {}

//assign event listener to list
for (let list of taskList) {
  list.addEventListener("click", function () {
    list.classList.toggle("finished");
  });
}

//move finished task to the bottom
for (let i = 0; i < taskList.length; i++) {
  if (taskList[i].className == "finished") {
    console.log(`${taskList[i].innerText} is finished`);
  }
  // console.log(list.className);
}

function checkDuplicates(item) {
  for (let list of taskList) {
    if (list.innerText.toLowerCase() == item.toLowerCase()) return false;
  }
  return true;
}

updateTaskList();
