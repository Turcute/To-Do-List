const taskInput = document.getElementById("task");
const list = document.getElementById("list");
const successToast = document.querySelector("#successToast");
const errorToast = document.querySelector("#errorToast");

// Load tasks from Local Storage

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskValue) => {
    const li = createTaskElement(taskValue);
    list.appendChild(li);
  });
};

// Create the task and add it to the list
const createTaskElement = (taskValue) => {
  const li = document.createElement("li");
  li.textContent = taskValue;

  // Toggle "done" class on click
  li.addEventListener("click", () => {
    li.classList.toggle("checked");
    updateLocalStorage();
  });

  // Add delete button
  const closeButton = document.createElement("span");
  closeButton.textContent = "x";
  closeButton.className = "close ml-2";
  closeButton.style.color = "red";
  closeButton.style.cursor = "pointer";
  closeButton.addEventListener("click", () => {
    list.removeChild(li);
    updateLocalStorage();
  });

  li.appendChild(closeButton);
  return li;
};

// Function to add new element
const newElement = () => {
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    showToast(errorToast);
    return;
  }

  const li = createTaskElement(taskValue);
  list.appendChild(li);

  // Add task to localStorage
  updateLocalStorage();

  // Clear the input field
  taskInput.value = "";
  showToast(successToast);
};

// Function to show toast message
const showToast = (toast) => $(toast).toast("show");

// Update Local Storage
const updateLocalStorage = () => {
  const tasks = [];
  const listItems = document.querySelectorAll("#list li");

  listItems.forEach((li) => {
    tasks.push(li.textContent.replace("x", "").trim());
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);
