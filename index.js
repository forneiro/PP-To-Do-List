const addTask = document.getElementById("add-task");
const tasksContainer = document.getElementById("tasks-pending__tasks");
const tasksProcessContainer = document.getElementById("tasks-process__tasks");
const tasksFinishedContainer = document.getElementById("tasks-finished__tasks");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let process = JSON.parse(localStorage.getItem("process")) || [];
let finished = JSON.parse(localStorage.getItem("finished")) || [];

let flag = 0;

// Functions
// Buttons from pending column
const taskProcess = (e) => {
  const id = e.target.getAttribute("data-index");

  process.push(tasks[id]);
  tasks.splice(id, 1);

  // Save task on localStorage
  localStorage.setItem("process", JSON.stringify(process));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Re-generate html
  generateHtml();
  generateHtmlProcess();
};

const taskFinished = (e) => {
  const id = e.target.getAttribute("data-index");

  finished.push(tasks[id]);
  tasks.splice(id, 1);

  // Save task on localStorage
  localStorage.setItem("finished", JSON.stringify(finished));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Re-generate html
  generateHtml();
  generateHtmlFinished();
};

// Buttons from process column
const addToPendingTasks = (e) => {
  const id = e.target.getAttribute("data-index");

  tasks.push(process[id]);
  process.splice(id, 1);

  // Save task on localStorage
  localStorage.setItem("process", JSON.stringify(process));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Re-generate html
  generateHtml();
  generateHtmlProcess();
};

// Generate html on pending column
const generateHtml = () => {
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    newHtml = `
        <li draggable="true" class="tasks-pending__task">
            <div class="task-pending__content">
                <section>
                <h4 class="no-margin">${task.title}</h4>
                <p>${task.description}</p>
                </section>
                <p class="tasks-pending__manage">
                <button class="btn-eliminate">Editar</button>
                <button class="btn-eliminate">Eliminar</button>
                </p>
            </div>
            <div>
                <button class="btn btn-process" data-index="${index}">En proceso</button>
                <button class="btn btn-finished" data-index="${index}">Terminada</button>
            </div>
        </li>
        `;

    tasksContainer.insertAdjacentHTML("beforeend", newHtml);
  });

  const btnsProcess = document.querySelectorAll(".btn-process");
  const btnsFinished = document.querySelectorAll(".btn-finished");

  btnsProcess.forEach((btn) => {
    btn.addEventListener("click", taskProcess.bind(this));
  });

  btnsFinished.forEach((btn) => {
    btn.addEventListener("click", taskFinished.bind(this));
  });
};
generateHtml();

// Generate html on process column
const generateHtmlProcess = () => {
  tasksProcessContainer.innerHTML = "";

  process.forEach((task, index) => {
    console.log(task);
    newHtml = `
        <li draggable="true" class="tasks-pending__task">
            <div class="task-pending__content">
                <section>
                <h4 class="no-margin">${task.title}</h4>
                <p>${task.description}</p>
                </section>
                <p class="tasks-pending__manage">
                <button class="btn-eliminate">Editar</button>
                <button class="btn-eliminate">Eliminar</button>
                </p>
            </div>
            <div>
                <button class="btn btn-pending" data-index="${index}">Pendiente</button>
                <button class="btn btn-finished data-index="${index}"">Terminada</button>
            </div>
        </li>
        `;

    tasksProcessContainer.insertAdjacentHTML("beforeend", newHtml);
  });

  const btnsPending = document.querySelectorAll(".btn-pending");
  const btnsFinished = document.querySelectorAll(".btn-finished");

  btnsPending.forEach((btn) => {
    btn.addEventListener("click", addToPendingTasks.bind(this));
  });
};

generateHtmlProcess();

// Generate html on finished column
const generateHtmlFinished = () => {
  tasksFinishedContainer.innerHTML = "";

  finished.forEach((task) => {
    newHtml = `
        <li draggable="true" class="tasks-pending__task">
            <div class="task-pending__content">
                <section>
                <h4 class="no-margin">${task.title}</h4>
                <p>${task.description}</p>
                </section>
                <p class="tasks-pending__manage">
                <button class="btn-eliminate">Editar</button>
                <button class="btn-eliminate">Eliminar</button>
                </p>
            </div>
            <div>
                <button class="btn btn-pending">Pendiente</button>
                <button class="btn btn-process">En proceso</button>
            </div>
        </li>
        `;

    tasksFinishedContainer.insertAdjacentHTML("beforeend", newHtml);
  });

  const btnsProcess = document.querySelectorAll(".btn-process");
  const btnsFinished = document.querySelectorAll(".btn-finished");
};
generateHtmlFinished();

addTask.addEventListener("click", () => {
  // Get inputs values
  const taskTitle = document.getElementById("task-title").value;
  const taskDescription = document.getElementById("task-description").value;

  // Add task to tasks array
  tasks.push({ title: taskTitle, description: taskDescription });

  // Save task on localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Generate html
  generateHtml();
});
