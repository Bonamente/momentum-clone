import { currentState } from './settings.js';

const todo = document.getElementById('todo-wrapper');
const todoToggle = document.getElementById('todo-toggle');

const taskInput = document.getElementById('new-task'); 
const addButton = document.getElementById('add-task-button');
const completedTasks = document.getElementById('completed-tasks');
const unfinishedTasks = document.getElementById('unfinished-tasks');

const openTodo = () => {
  todoToggle.setAttribute('aria-expanded', true);
  todo.classList.remove('todo-closed');
  todo.classList.add('todo-opened');
};

const closeTodo = () => {
  todoToggle.setAttribute('aria-expanded', false);
  todo.classList.add('todo-closed');
  todo.classList.remove('todo-opened');
};

const createTask = (value) => {	
	const listItem = document.createElement('li');

	const checkBox = document.createElement('input');
	const label = document.createElement('label');
	const editInput = document.createElement('input');
	const editButton = document.createElement('button');
	const deleteButton = document.createElement('button'); 
	const buttonsContainer = document.createElement('div');

	buttonsContainer.classList.add('controls');	

	checkBox.type = 'checkbox';
	editInput.type = 'text';

	if (currentState.lang === 'en') {
		editButton.textContent = 'Edit';
		deleteButton.textContent = 'Delete';
	} else {
		editButton.textContent = 'Изменить';
		deleteButton.textContent = 'Удалить';
	}

	editButton.className = 'edit';
	deleteButton.className = 'delete';

	label.textContent = value;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);

	buttonsContainer.appendChild(editButton);
	buttonsContainer.appendChild(deleteButton)

  listItem.appendChild(buttonsContainer);

	return listItem;
};

const addTask = () => {	
	const listItem = createTask(taskInput.value);
	unfinishedTasks.appendChild(listItem);

	addTaskListeners(listItem, moveTaskToCompleted);

	taskInput.value = '';
};

const editTask = (e) => {
	const listItem = e.target.parentNode.parentNode;	

	const editInput = listItem.querySelector('input[type=text]');
	const label = listItem.querySelector('label');

	const isContainClass = listItem.classList.contains('editMode');

	if (isContainClass) {
		label.textContent = editInput.value;
	} else {	
		editInput.value = label.textContent;
	}

	listItem.classList.toggle('editMode');
};

const deleteTask = (e) => {	
	const listItem = e.target.parentNode.parentNode;
	const ul = listItem.parentNode;

	ul.removeChild(listItem);
};

const addTaskListeners = (taskListItem, checkBoxEventHandler) => {
	const checkBox = taskListItem.querySelector('input[type=checkbox]');
	const editButton = taskListItem.querySelector('button.edit');
	const deleteButton = taskListItem.querySelector('button.delete');

	editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', checkBoxEventHandler);
};

const moveTaskToCompleted = (e) => {
	const listItem = e.target.parentNode;
	completedTasks.appendChild(listItem);

	addTaskListeners(listItem, moveTaskToUnfinished);
};

const moveTaskToUnfinished = (e) => {
	const listItem = e.target.parentNode;
	unfinishedTasks.appendChild(listItem);
	addTaskListeners(listItem, moveTaskToCompleted);
};

addButton.addEventListener('click', addTask);

for (let i = 0; i < unfinishedTasks.children.length; i += 1) {
	addTaskListeners(unfinishedTasks.children[i], moveTaskToCompleted);
}

for (let i = 0; i < completedTasks.children.length; i += 1) {	
	addTaskListeners(completedTasks.children[i], moveTaskToUnfinished);
}

document.addEventListener('click', (e) => { 
  if (e.target.closest('.todo-container') || e.target.closest('.delete')) return;
  if (todoToggle !== e.target) closeTodo();
});

todoToggle.addEventListener('click', () => {  
  todo.classList.contains('todo-closed') 
    ? openTodo()
    : closeTodo();
});
