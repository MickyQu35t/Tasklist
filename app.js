// Define UI Vars
const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', domLoad);

  // Add task event
  form.addEventListener('submit', addTask);

  // Delete task event
  taskList.addEventListener('click', delTask);

  // Clear tasks
  clearBtn.addEventListener('click', clsTask);

  // Filter task event
  filter.addEventListener('keyup', filterTask);

}



// DOM LOAD
function domLoad(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create textnode and append
    li.appendChild(document.createTextNode(task));
    // create link item
    const link = document.createElement('a');
    // Add className
    link.className = 'delete-item secondary-content';
    // Add html icon
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// ADD TASK
function addTask(e) {
  if (taskInput.value === '') {
    alert("Add a task");
  } else {
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create textnode and append
    li.appendChild(document.createTextNode(taskInput.value));
    // create link item
    const link = document.createElement('a');
    // Add className
    link.className = 'delete-item secondary-content';
    // Add html icon
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Save to localStorage
    populateStorage(taskInput.value);
    
    // Clear Input
    taskInput.value = '';
  }
  e.preventDefault();
}

// POPULATE LOCAL STORAGE
function populateStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// DELETE TASK
function delTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Confirm Delete!!!')){
      e.target.parentElement.parentElement.remove();
      // REMOVE TASK FROM LOCAL STORAGE
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  };
  e.preventDefault();
}


// CLEAR TASK
function clsTask(e) {
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clsTasksFromStorage();
  e.preventDefault();
}

// REMOVE TASK FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR TASKS FROM LOCAL STORAGE
function clsTasksFromStorage(){
  localStorage.clear();
}

// FILTER TASK
function filterTask(e) {
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (txt) {
    const item = txt.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterText) != -1) {
      txt.style.display = 'block';
    } else {
      txt.style.display = 'none';
    }
  });
}


// REMOVE TASK FROM LOCAL STORAGE
// function removeStorage() {
//   localStorage.removeItem(taskInput.Value);
// }