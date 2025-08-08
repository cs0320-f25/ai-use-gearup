// JavaScript object structure for a Task
// This defines the structure of a task in the TODO app
// {
//   title: string,
//   description: string,
//   dueDate: string (YYYY-MM-DD),
//   status: 'incomplete' | 'in-progress' | 'complete'
// }

// In-memory array to store tasks
const tasks = [];

// Get references to DOM elements
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

/**
 * Renders the list of tasks in the UI
 */
function renderTasks() {
    // Clear the list
    taskList.innerHTML = '';
    // Render each task as a list item with inline editing, overdue icon, and accessibility
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.setAttribute('tabindex', '0'); // Keyboard navigation
        li.setAttribute('role', 'group');
        // Overdue detection
        const today = new Date().toISOString().slice(0, 10);
        const isOverdue = task.dueDate && task.status !== 'complete' && task.dueDate < today;
        // Icon for overdue
        const overdueIcon = isOverdue ? '<span class="overdue-icon" aria-label="Overdue" title="Overdue">&#9888;</span>' : '<span class="overdue-icon" aria-label="On time" title="On time">&#x2714;</span>';
        // Create editable fields
        li.innerHTML = `
            ${overdueIcon}
            <input type="text" value="${task.title}" class="edit-title" aria-label="Edit title" /> <br>
            <input type="date" value="${task.dueDate}" class="edit-due-date" aria-label="Edit due date" /> <br>
            <select class="edit-status" aria-label="Edit status">
                <option value="incomplete" ${task.status === 'incomplete' ? 'selected' : ''}>Incomplete</option>
                <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                <option value="complete" ${task.status === 'complete' ? 'selected' : ''}>Complete</option>
            </select>
            <button class="save-task" aria-label="Save changes">Save</button>
        `;

        // Save button handler
        li.querySelector('.save-task').addEventListener('click', function() {
            // Get updated values
            const newTitle = li.querySelector('.edit-title').value.trim();
            const newDueDate = li.querySelector('.edit-due-date').value;
            const newStatus = li.querySelector('.edit-status').value;
            // Update task
            updateTask(index, newTitle, newDueDate, newStatus);
        });

        // Status change handler (dropdown)
        li.querySelector('.edit-status').addEventListener('change', function() {
            const newStatus = this.value;
            updateTask(index, task.title, task.dueDate, newStatus);
        });

        // Accessibility: allow Enter to save
        li.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && document.activeElement.classList.contains('save-task')) {
                li.querySelector('.save-task').click();
            }
        });

        taskList.appendChild(li);
    });
}


/**
 * Handles form submission to add a new task
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Get form values
    const title = document.getElementById('title').value.trim();
    const dueDate = document.getElementById('due-date').value;
    const status = document.getElementById('status').value;

    // Create new task object
    const newTask = { title, dueDate, status };
    tasks.push(newTask);
    renderTasks();
    form.reset();
});

/**
 * Updates a task at the given index
 * @param {number} index - Index of the task in the array
 * @param {string} title - New title
 * @param {string} dueDate - New due date
 * @param {string} status - New status
 */
function updateTask(index, title, dueDate, status) {
    tasks[index] = { title, dueDate, status };
    renderTasks();
}

// Initial render (in case there are pre-existing tasks)
renderTasks();



// --- Basic Tests ---
// Test for overdue detection
function testOverdueDetection() {
    const today = new Date().toISOString().slice(0, 10);
    const overdueTask = {
        title: 'Overdue',
        dueDate: '2000-01-01',
        status: 'incomplete'
    };
    tasks.push(overdueTask);
    renderTasks();
    // Check if overdue icon is present
    const lastLi = taskList.lastChild;
    if (lastLi && lastLi.querySelector('.overdue-icon') && lastLi.querySelector('.overdue-icon').getAttribute('aria-label') === 'Overdue') {
        console.log('Test passed: Overdue icon shown');
    } else {
        console.error('Test failed: Overdue icon not shown');
    }
}

// Test for accessibility: tab navigation
function testAccessibility() {
    const lis = taskList.querySelectorAll('li');
    let allTabindex = true;
    lis.forEach(li => {
        if (li.getAttribute('tabindex') !== '0') allTabindex = false;
    });
    if (allTabindex) {
        console.log('Test passed: All tasks are keyboard navigable');
    } else {
        console.error('Test failed: Not all tasks are keyboard navigable');
    }
}

// Run tests (for demonstration)
testOverdueDetection();
testAccessibility();
