const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task-btn');
const taskList = document.querySelector('#task-list');
function addTask() {
    const taskText = taskInput.value.trim(); 

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    const listItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.classList.add('remove-btn'); 

    removeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        taskList.removeChild(listItem);
    });

    listItem.addEventListener('click', () => {
        listItem.classList.toggle('done');
    });

    listItem.append(removeBtn); taskList.append(listItem);
    taskInput.value = '';
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
