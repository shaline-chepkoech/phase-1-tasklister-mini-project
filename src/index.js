  document.getElementById("create-task-form").addEventListener('submit', function(event){
    event.preventDefault();
    createOrUpdateTask();
  });

  let isAscending = true;
  let editingTask = null;


  function createOrUpdateTask() {
    const taskInput = document.getElementById('new-task-description');
    const prioritySelect = document.getElementById('task-priority');
    const dueDateInput = document.getElementById('due-date');
    const durationSelect = document.getElementById('duration');
    const taskText = taskInput.value.trim();
    const priorityValue = prioritySelect.value;
    const dueDateValue = dueDateInput.value;
    const durationValue = durationSelect.value;

    if(taskText === ''){
    alert('Please enter a task!');
    return;
   }

   const ul = document.getElementById('tasks');


   if (editingTask) {
    editingTask.querySelector('.task-text').textContent = `${taskText} - Priority: ${priorityValue}`;
        if (dueDateValue) {
            editingTask.querySelector('.due-date').textContent = ` - Due: ${dueDateValue}`;
        } else {
            editingTask.querySelector('.due-date').textContent = '';
        }
        if (durationValue) {
            editingTask.querySelector('.duration').textContent = ` - Duration: ${durationValue}`;
        } else {
            editingTask.querySelector('.duration').textContent = '';
        }
      
        updateTaskColor(editingTask, priorityValue);
        editingTask = null; // Clear the editing task
    } else {
      const li = document.createElement('li');
        li.classList.add('task-item');

        const taskContent = document.createElement('span');
        taskContent.classList.add('task-text');
        taskContent.textContent = `${taskText} - Priority: ${priorityValue}`;

        const dueDateSpan = document.createElement('span');
        dueDateSpan.classList.add('due-date');
        if (dueDateValue) {
            dueDateSpan.textContent = ` - Due: ${dueDateValue}`;
        }
        const durationSpan = document.createElement('span');
        durationSpan.classList.add('duration');
        if (durationValue) {
            durationSpan.textContent = ` - Duration: ${durationValue}`;
        }

   const deleteBtn = document.createElement('button');
   deleteBtn.textContent = 'Delete';
   deleteBtn.addEventListener('click', () => {
    ul.removeChild(li);
   });

   const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            populateFormForEditing(li, taskText, priorityValue, dueDateValue, durationValue);
        });

        li.appendChild(taskContent);
        li.appendChild(dueDateSpan);
        li.appendChild(durationSpan);
   li.appendChild(deleteBtn);
   li.appendChild(editBtn);
   ul.appendChild(li);
   //taskInput.value = '';
   //prioritySelect.selectedIndex = 0;
  }

  clearFormFields();
}

  function updateTaskColor(taskElement, priorityValue) {
    if (priorityValue === 'high') {
        taskElement.style.color = 'red';
    } else if (priorityValue === 'medium') {
        taskElement.style.color = 'orange';
    } else {
        taskElement.style.color = 'green';
    }
}

function populateFormForEditing(taskElement, taskText, priorityValue, dueDateValue, durationValue) {
    document.getElementById('new-task-description').value = taskText;
    document.getElementById('task-priority').value = priorityValue;
    document.getElementById('due-date').value = dueDateValue;
    document.getElementById('duration').value = durationValue;
    editingTask = taskElement;
  }
  function clearFormFields() {
    document.getElementById('new-task-description').value = '';
    document.getElementById('task-priority').selectedIndex = 0;
    document.getElementById('due-date').value = '';
    document.getElementById('duration').selectedIndex = 0;
}
  
  document.getElementById("sort-tasks").addEventListener('click', function() {
    const ul = document.getElementById('tasks');
    const tasksArray = Array.from(ul.children);
  
    // Sort the tasks based on priority
    tasksArray.sort((a, b) => {
      const priorityA = getPriorityValue(a.textContent);
      const priorityB = getPriorityValue(b.textContent);
      
      return isAscending ? priorityA - priorityB : priorityB - priorityA;
    });

    ul.innerHTML = '';
  tasksArray.forEach(task => ul.appendChild(task));

  isAscending = !isAscending;
});

function getPriorityValue(taskText) {
  if (taskText.includes('Priority: high')) {
    return 1; // Highest priority
  } else if (taskText.includes('Priority: medium')) {
    return 2; // Medium priority
  } else {
    return 3; // Lowest priority
  }
}