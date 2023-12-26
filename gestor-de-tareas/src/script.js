//Selectores del modal
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const tareaContainer = document.getElementById('tarea');
const progresoContainer = document.getElementById('progreso');
const bloqueoContainer = document.getElementById('bloqueo');
const terminadoContainer = document.getElementById('terminado');


// Agregar nueva tarea o task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value;
  if (taskText.trim() === '') return;

  const taskElement = createTaskElement(taskText);
  tareaContainer.appendChild(taskElement);
  taskInput.value = '';
});

function createTaskElement(text) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.textContent = text;
  taskElement.draggable = true;

  taskElement.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.textContent);
  });

  return taskElement;
}

// Manejador de eventos drag and drop 
const containers = [tareaContainer, progresoContainer,bloqueoContainer, terminadoContainer];

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const text = e.dataTransfer.getData('text');
    const taskElement = document.querySelector('.dragging');

    if (taskElement) {
      taskElement.classList.remove('dragging');
      container.appendChild(taskElement);
    }
  });
});

// Manejador de events drag start y end 
document.addEventListener('dragstart', (e) => {
  if (e.target.className === 'task') {
    e.target.classList.add('dragging');
  }
});

document.addEventListener('dragend', (e) => {
  if (e.target.className === 'task') {
    e.target.classList.remove('dragging');
  }
});
