const addTask = document.getElementById("add-task");
const editAccept = document.getElementById("edit-accept");
const editCancel = document.getElementById("edit-cancel");
const tasksContainer = document.getElementById("tasks-pending__tasks");
const tasksProcessContainer = document.getElementById("tasks-process__tasks");
const tasksFinishedContainer = document.getElementById("tasks-finished__tasks");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let process = JSON.parse(localStorage.getItem("process")) || [];
let finished = JSON.parse(localStorage.getItem("finished")) || [];

// Fields
let taskTitleContent = document.getElementById("task-title");
let taskDescriptionContent = document.getElementById("task-description");

let elEditing;
let colEditing;
let keyEditing;
////////////////////////////////////////////////////////////////
// Functions
// Add task to their respective column
const addTaskToProcessColumn = (e, identifier, key, fn) => {
  const id = e.getAttribute("data-index");

  process.push(identifier[id]);
  identifier.splice(id, 1);

  // Save task on localStorage
  localStorage.setItem("process", JSON.stringify(process));
  localStorage.setItem(key, JSON.stringify(identifier));

  // Re-execute de html
  generateHtmlProcess();
  fn();
};

const addTaskToFinishedColumn = (e, identifier, key, fn) => {
  const id = e.getAttribute("data-index");

  finished.push(identifier[id]);
  identifier.splice(id, 1);

  // Save task on localStorage
  localStorage.setItem("finished", JSON.stringify(finished));
  localStorage.setItem(key, JSON.stringify(identifier));

  // Re-generate html
  generateHtmlFinished();
  fn();
};

const addTaskToPendingColumn = (e, identifier, key, fn) => {
  const id = e.getAttribute("data-index");

  tasks.push(identifier[id]);
  identifier.splice(id, 1);

  // Save task on localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem(key, JSON.stringify(identifier));

  // Re-generate html
  generateHtml();
  fn();
};

// Eliminate task
const eliminateTask = (e, identifier, key, fn) => {
  const id = e.getAttribute("data-index");

  identifier.splice(id, 1);

  localStorage.setItem(key, JSON.stringify(identifier));

  fn();
};

const toggleHidden = () => {
  addTask.classList.toggle("hidden");
  editAccept.classList.toggle("hidden");
  editCancel.classList.toggle("hidden");
};
// Edit task
const editTask = (e, identifier, key, fn) => {
  const id = e.getAttribute("data-index");

  taskTitleContent.value = identifier[id].title;
  taskDescriptionContent.value = identifier[id].description;

  taskTitleContent.focus();

  toggleHidden();

  elEditing = identifier.findIndex(
    (task) => task.title === taskTitleContent.value,
  );
  colEditing = [...identifier];
  keyEditing = key;
};

editAccept.addEventListener("click", () => {
  const newTitle = taskTitleContent.value;
  const newDescription = taskDescriptionContent.value;

  colEditing[elEditing].title = newTitle;
  colEditing[elEditing].description = newDescription;

  localStorage.setItem(keyEditing, JSON.stringify(colEditing));

  if (keyEditing === "tasks") generateHtml();
  if (keyEditing === "process") generateHtmlProcess();
  if (keyEditing === "finished") generateHtmlFinished();

  elEditing = undefined;
  colEditing = undefined;
  keyEditing = undefined;

  toggleHidden();

  taskTitleContent.value = taskDescriptionContent.value = "";
});

// Generate html content
const htmlContent = (container, identifier, classes, texts) => {
  container.innerHTML = "";

  identifier.forEach((task, index) => {
    newHtml = `
        <li class="tasks-pending__task">
            <div class="task-pending__content">
                <section class="task-pending__header">
                  <h4 class="no-margin">${task.title}</h4>
                  <p>${task.description}</p>
                </section>
                <p class="tasks-pending__manage">
                  <button class="btn-eliminate ${classes[0]}" data-index="${index}">Editar</button>
                  <button class="btn-eliminate ${classes[1]}" data-index="${index}">Eliminar</button>
                </p>
            </div>
            <div>
                <button class="btn ${classes[2]}" data-index="${index}">${texts[0]}</button>
                <button class="btn ${classes[3]}" data-index="${index}">${texts[1]}</button>
            </div>
        </li>
        `;

    container.insertAdjacentHTML("beforeend", newHtml);
  });
};

// Events from differents buttons
const btnEventsPending = (btns, fn) => {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      fn(e.target, tasks, "tasks", generateHtml);
    });
  });
};

const btnEventsProcess = (btns, fn) => {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      fn(e.target, process, "process", generateHtmlProcess);
    });
  });
};

const btnEventsFinished = (btns, fn) => {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      fn(e.target, finished, "finished", generateHtmlFinished);
    });
  });
};

// Generate html on pending column
const generateHtml = () => {
  htmlContent(
    tasksContainer,
    tasks,
    [
      "btn-edit-pending",
      "btn-eliminate-pending",
      "btn-process",
      "btn-finished",
    ],
    ["En proceso", "Terminada"],
  );

  const btnsProcess = document.querySelectorAll(".btn-process");
  const btnsFinished = document.querySelectorAll(".btn-finished");
  const btnsEliminate = document.querySelectorAll(".btn-eliminate-pending");
  const btnsEdit = document.querySelectorAll(".btn-edit-pending");

  btnEventsPending(btnsProcess, addTaskToProcessColumn);
  btnEventsPending(btnsFinished, addTaskToFinishedColumn);
  btnEventsPending(btnsEliminate, eliminateTask);
  btnEventsPending(btnsEdit, editTask);
};

// Generate html on process column
const generateHtmlProcess = () => {
  htmlContent(
    tasksProcessContainer,
    process,
    [
      "btn-edit-process",
      "btn-eliminate-process",
      "btn-pending",
      "btn-finished-process",
    ],
    ["Pendiente", "Terminada"],
  );

  const btnsPending = document.querySelectorAll(".btn-pending");
  const btnsFinished = document.querySelectorAll(".btn-finished-process");
  const btnsEliminate = document.querySelectorAll(".btn-eliminate-process");
  const btnsEdit = document.querySelectorAll(".btn-edit-process");

  btnEventsProcess(btnsPending, addTaskToPendingColumn);
  btnEventsProcess(btnsFinished, addTaskToFinishedColumn);
  btnEventsProcess(btnsEliminate, eliminateTask);
  btnEventsProcess(btnsEdit, editTask);
};

// Generate html on finished column
const generateHtmlFinished = () => {
  htmlContent(
    tasksFinishedContainer,
    finished,
    [
      "btn-edit-finished",
      "btn-eliminate-finished",
      "btn-pending-finished",
      "btn-process-finished",
    ],
    ["Pendiente", "En proceso"],
  );

  const btnsPending = document.querySelectorAll(".btn-pending-finished");
  const btnsProcess = document.querySelectorAll(".btn-process-finished");
  const btnsEliminate = document.querySelectorAll(".btn-eliminate-finished");
  const btnsEdit = document.querySelectorAll(".btn-edit-finished");

  btnEventsFinished(btnsPending, addTaskToPendingColumn);
  btnEventsFinished(btnsProcess, addTaskToProcessColumn);
  btnEventsFinished(btnsEliminate, eliminateTask);
  btnEventsFinished(btnsEdit, editTask);
};

////////////////////////////////////////////////////////////////
// Call functions
generateHtml();
generateHtmlProcess();
generateHtmlFinished();

////////////////////////////////////////////////////////////////
addTask.addEventListener("click", () => {
  // Get inputs values
  let taskTitle = document.getElementById("task-title").value;
  let taskDescription = document.getElementById("task-description").value;

  if (!taskTitle) return;

  // Add task to tasks array
  tasks.push({ title: taskTitle, description: taskDescription });

  // Save task on localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskTitleContent.value = taskDescriptionContent.value = "";

  // Generate html
  generateHtml();
});
