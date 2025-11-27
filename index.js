// Предустановленный список задач
let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

// Получаем элементы из DOM
const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// Функция загрузки задач из localStorage или возврата начального списка
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return items;
}

// Функция создания элемента задачи
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  // Устанавливаем текст задачи
  textElement.textContent = item;
  
  // Обработчик удаления задачи
  deleteButton.addEventListener('click', function() {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  // Обработчик копирования задачи
  duplicateButton.addEventListener('click', function() {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  // Обработчик редактирования задачи
  editButton.addEventListener('click', function() {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });
  
  // Обработчик потери фокуса при редактировании
  textElement.addEventListener('blur', function() {
    textElement.setAttribute('contenteditable', 'false');
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  return clone;
}

// Функция получения списка задач из DOM
function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  
  itemsNamesElements.forEach(function(element) {
    tasks.push(element.textContent);
  });
  
  return tasks;
}

// Функция сохранения задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загружаем задачи при загрузке страницы
items = loadTasks();

// Отображаем задачи
items.forEach(function(item) {
  const taskElement = createItem(item);
  listElement.append(taskElement);
});

// Обработчик отправки формы
formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  
  const taskText = inputElement.value;
  const newTask = createItem(taskText);
  listElement.prepend(newTask);
  
  items = getTasksFromDOM();
  saveTasks(items);
  
  inputElement.value = '';
});

