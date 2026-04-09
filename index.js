const addTask = document.getElementById("add-task");
const tasksContainer = document.getElementById("tasks-pending__tasks");
const tasksProcessContainer = document.getElementById("tasks-process__tasks");
const tasksFinishedContainer = document.getElementById("tasks-finished__tasks");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let process = JSON.parse(localStorage.getItem("process")) || [];
let finished = JSON.parse(localStorage.getItem("finished")) || [];

// Functions
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

const eliminateTask = (e, identifier, key, fn) => {
  const id = e.getAttribute("data-index");

  identifier.splice(id, 1);

  localStorage.setItem(key, JSON.stringify(identifier));

  fn();
};

// Generate html content
const htmlContent = (container, identifier, classes, texts) => {
  container.innerHTML = "";

  identifier.forEach((task, index) => {
    newHtml = `
        <li draggable="true" class="tasks-pending__task">
            <div class="task-pending__content">
                <section>
                <h4 class="no-margin">${task.title}</h4>
                <p>${task.description}</p>
                </section>
                <p class="tasks-pending__manage">
                <button class="btn-eliminate">Editar</button>
                <button class="btn-eliminate ${classes[0]}" data-index="${index}">Eliminar</button>
                </p>
            </div>
            <div>
                <button class="btn ${classes[1]}" data-index="${index}">${texts[0]}</button>
                <button class="btn ${classes[2]}" data-index="${index}">${texts[1]}</button>
            </div>
        </li>
        `;

    container.insertAdjacentHTML("beforeend", newHtml);
  });
};

// Generate html on pending column
const generateHtml = () => {
  htmlContent(
    tasksContainer,
    tasks,
    ["btn-eliminate-pending", "btn-process", "btn-finished"],
    ["En proceso", "Terminada"],
  );

  const btnsProcess = document.querySelectorAll(".btn-process");
  const btnsFinished = document.querySelectorAll(".btn-finished");
  const btnsElimintate = document.querySelectorAll(".btn-eliminate-pending");

  btnsProcess.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addTaskToProcessColumn(e.target, tasks, "tasks", generateHtml);
    });
  });

  btnsFinished.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addTaskToFinishedColumn(e.target, tasks, "tasks", generateHtml);
    });
  });

  btnsElimintate.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      eliminateTask(e.target, tasks, "tasks", generateHtml);
    });
  });
};
generateHtml();

// Generate html on process column
const generateHtmlProcess = () => {
  htmlContent(
    tasksProcessContainer,
    process,
    ["btn-eliminate-process", "btn-pending", "btn-finished-process"],
    ["Pendiente", "Terminada"],
  );

  const btnsPending = document.querySelectorAll(".btn-pending");
  const btnsFinished = document.querySelectorAll(".btn-finished-process");
  const btnsElimintate = document.querySelectorAll(".btn-eliminate-process");

  btnsPending.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addTaskToPendingColumn(e.target, process, "process", generateHtmlProcess);
    });
  });

  btnsFinished.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addTaskToFinishedColumn(
        e.target,
        process,
        "process",
        generateHtmlProcess,
      );
    });
  });

  btnsElimintate.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      eliminateTask(e.target, process, "process", generateHtmlProcess);
    });
  });
};
generateHtmlProcess();

// Generate html on finished column
const generateHtmlFinished = () => {
  htmlContent(
    tasksFinishedContainer,
    finished,
    ["btn-eliminate-finished", "btn-pending-finished", "btn-process-finished"],
    ["Pendiente", "En proceso"],
  );

  const btnsPending = document.querySelectorAll(".btn-pending-finished");
  const btnsProcess = document.querySelectorAll(".btn-process-finished");
  const btnsElimintate = document.querySelectorAll(".btn-eliminate-finished");

  btnsPending.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addTaskToPendingColumn(
        e.target,
        finished,
        "finished",
        generateHtmlFinished,
      );
    });
  });

  btnsProcess.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addTaskToProcessColumn(
        e.target,
        finished,
        "finished",
        generateHtmlFinished,
      );
    });
  });

  btnsElimintate.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      eliminateTask(e.target, finished, "finished", generateHtmlFinished);
    });
  });
};
generateHtmlFinished();

addTask.addEventListener("click", () => {
  // Get inputs values
  let taskTitle = document.getElementById("task-title").value;
  let taskDescription = document.getElementById("task-description").value;

  // Add task to tasks array
  tasks.push({ title: taskTitle, description: taskDescription });

  // Save task on localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskTitle = "";
  taskDescription = "";

  // Generate html
  generateHtml();
});
