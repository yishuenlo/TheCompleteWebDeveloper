let button = document.querySelector("#button");
let userInput = document.querySelector("#userinput");
let todoList = document.querySelector("#todo-list"); //grabs ul 
let taskList = document.querySelectorAll("li");

//main interactivity of the list
//add to list and assign listener to cross off the item
button.addEventListener("click", function () {
  //if there is user input AND item doesn't already exist on the list
  if (userInput.value.length > 0 && checkDuplicates(userInput.value)) {
    //capitalize each word, store in array format
    let input = capitalizeWords(userInput.value);

    //add to todo list
    addToList(input);

    //update tasklist array
    updateTaskList();

    //add event listener to new task
    addNewEventListener(taskList);

    //clear error border
    userInput.classList.remove("error");

    resetInputBox();
  } else {
    //add red outline if there is an error
    userInput.classList.add("error");
    console.log("item already on the list");
  }
});

//assign event listener to list
for (let list of taskList) {
  list.addEventListener("click", function () {
    list.classList.toggle("finished");
  });
}

updateTaskList();

//----functions below----

function updateTaskList() {
  //convert nodes to array
  taskList = Array.from(document.querySelectorAll("li"));
}

//capitalize first letter of every word for user input
//takes string as input, output array
function capitalizeWords(input) {
  //convert string into array
  input = input.split(" ");

  //loop through array to capitalize every word
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i][0].toUpperCase() + input[i].slice(1);
  }

  return input; //in array format
}

//add li tag to todo list
//takes array as input
function addToList(task) {
  //create new li node
  let li = document.createElement("li");

  //add text value to li
  //convert array to string
  li.appendChild(document.createTextNode(task.join(" ")));

  return todoList.appendChild(li);
}

//add event listener to new task
function addNewEventListener(list) {
  //assign last task in the list array as new task
  let newTask = list[list.length - 1];

  return newTask.addEventListener("click", function () {
    newTask.classList.toggle("finished");
  });
}

function checkDuplicates(item) {
  for (let list of taskList) {
    if (list.innerText.toLowerCase() == item.toLowerCase()) return false;
  }
  return true;
}

function resetInputBox(){
  return userInput.value = '';
}
