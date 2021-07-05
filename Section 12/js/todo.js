let button = document.querySelector("#button");
let userInput = document.querySelector("#userinput");
let ul = document.querySelector("ul"); 
let taskList = document.querySelectorAll("li");

//listen to button click and key press on input box
button.addEventListener("click", addToList);
userInput.addEventListener("keypress", function(event){
  if(event.keyCode === 13) addToList();
})

//assign event listener to list
for (let list of taskList) {
  list.firstChild.addEventListener("click", function () {
    list.classList.toggle("finished");
  });
}

updateTaskList();

//----functions below----

//add to list and assign listener to cross off the item
function addToList() {
  //if there is user input AND item doesn't already exist on the list
  if (userInput.value.length > 0 && checkDuplicates(userInput.value)) {
    //capitalize each word, store in array format
    let input = capitalizeWords(userInput.value);

    //add to todo list
    addLiTag(input);

    //update tasklist array
    updateTaskList();

    //add event listener to new task
    addNewEventListener(taskList);

    resetInputBox();
  } else {
    //add red outline if there is an error
    userInput.classList.add("error");
    console.log("item already on the list");
  }
}

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
    input[i] = input[i][0].toUpperCase() + input[i].slice(1).toLowerCase();
  }

  return input; //in array format
}

//add li tag to todo list
//takes array as input
function addLiTag(task) {
  //create new li node
  let li = document.createElement("li");
  let spanTag = document.createElement('span');
  let buttonTag = document.createElement('button');

  //add text value to span
  spanTag.appendChild(document.createTextNode(task.join(" ")));
  spanTag.classList.add('task');

  //add text value to button
  buttonTag.appendChild(document.createTextNode('delete'));
  buttonTag.classList.add('del');

  li.appendChild(spanTag);
  li.appendChild(buttonTag);

  return ul.appendChild(li);
}

//add event listener to new task
function addNewEventListener(list) {
  //assign last task in the list array as new task
  let newTask = list[list.length - 1];

  newTask.firstChild.addEventListener("click", function () {
    newTask.classList.toggle("finished");
  });

  newTask.lastChild.addEventListener("click", function(){
    let index = list.length - 1;
    // taskList[index].remove();
  })
}

function checkDuplicates(item) {
  for (let list of taskList) {
    if (list.firstChild.innerText.toLowerCase() == item.toLowerCase()) return false;
  }
  return true;
}

function resetInputBox(){
  userInput.value = "";
  //clear error border
  userInput.classList.remove("error");
}

//add event listener to delete button
for(let i = 0; i < taskList.length; i++){
  let deleteBtn = taskList[i].lastChild;
  deleteBtn.addEventListener('click', function(){
    taskList[i].remove();
    updateTaskList();
  })
}
