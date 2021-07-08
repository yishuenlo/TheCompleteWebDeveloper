let button = document.querySelector("#button");
let userInput = document.querySelector("#userinput");
let ul = document.querySelector("ul");
let taskList = document.querySelectorAll("li");

//listen to button click and key press on input box
button.addEventListener("click", addToList);
userInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) addToList();
});
ul.addEventListener("click", taskInteractions);

updateTaskList();

//----functions below----

//add to list 
function addToList() {
  //if there is user input AND item doesn't already exist on the list
  if (userInput.value.length > 0 && checkDuplicates(userInput.value)) {
    //capitalize each word, store in array format
    let input = capitalizeWords(userInput.value);

    //add to todo list
    addLiTag(input);

    //update tasklist so we can check for duplicates later
    updateTaskList();

    resetInputBox();
  } else {
    //add red outline if there is an error
    userInput.classList.add("error");
    console.log("item already on the list");
  }
}

//handles click interactions on task
//such as cross off tasks or delete tasks
function taskInteractions(e) {
  if (e.target.tagName === "SPAN") {
    //mark finished task
    e.target.classList.toggle("finished");
    return;
  } else if ((e.target.className = "del" && e.target.tagName === "BUTTON")) {
    //delete task
    e.target.parentElement.remove();

    updateTaskList();
    return;
  }
}

//update task list so list is updated to check for duplicates
function updateTaskList() {
  //convert nodes to array
  taskList = Array.from(document.querySelectorAll("li"));
}

//capitalize first letter of every word for user input
function capitalizeWords(input) {
  //convert string into array
  input = input.split(" ");

  //loop through array to capitalize every word
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i][0].toUpperCase() + input[i].slice(1).toLowerCase();
  }

  return input.join(' ');
}

//add li tag to todo list
//takes array as input
function addLiTag(task){
  let liTag = document.createElement('li');
  let spanTag = createHtmlTags('span', task, 'task');
  let btnTag = createHtmlTags('button', 'delete', 'del');

  liTag.appendChild(spanTag);
  liTag.appendChild(btnTag);

  return ul.appendChild(liTag);
}

//create html tags
//inputs: tag = string, text = string, cssClass = string
//output: html tag
function createHtmlTags(tag, text, cssClass) {
  let htmlTag = document.createElement(tag);
  htmlTag.appendChild(document.createTextNode(text));
  htmlTag.classList.add(cssClass);
  return htmlTag;
}

function checkDuplicates(item) {
  for (let list of taskList) {
    if (list.firstChild.innerText.toLowerCase() == item.toLowerCase())
      return false;
  }
  return true;
}

function resetInputBox() {
  userInput.value = "";
  //clear error border
  userInput.classList.remove("error");
}
