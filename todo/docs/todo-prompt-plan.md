# TODO Web Application Prompt Plan

This plan guides an LLM to build a simple TODO web application using JavaScript, HTML, and CSS, following the design document. Each step is incremental, focused, and avoids unnecessary complexity. Emphasis is placed on writing tests and documentation.

---

## Step 1: Set Up Basic HTML Structure and Task Model

**Goal:** Create the initial HTML layout and define the JavaScript model for a task (title, description, status, due date).
**Prompt:**
"Create a basic HTML file for a TODO app with a form to add tasks (fields: title, description, due date, status dropdown). Define a JavaScript interface for a task. Add comments explaining the structure."
**Notes:**

- Keep the UI simple (list and form only).
- Add brief documentation in code comments.

---

## Step 2: Implement Adding and Displaying Tasks

**Goal:** Enable users to add tasks and display them in a list.
**Prompt:**
"Implement JavaScript logic to add tasks from the form and render them in a list. Each task should show its title, description, due date, and status. Write tests for the add and render functions. Document the code."
**Notes:**

- Use in-memory storage (array) for tasks.
- Add basic unit tests for task addition and rendering.

---

## Step 3: Support Updating and Marking Tasks as Complete/Incomplete/In Progress

**Goal:** Allow users to update tasks inline and change their status using checkboxes or dropdowns.
**Prompt:**
"Add inline editing for tasks in the list. Allow status changes via checkboxes or dropdowns. Update the display accordingly. Write tests for update and status change logic. Document the code."
**Notes:**

- Keep editing simple and accessible.
- Ensure status changes are reflected visually.

---

## Step 4: Add Overdue Indicators, Pastel Theme, and Accessibility Features

**Goal:** Add a visual indicator (icon) for overdue tasks, apply a pastel theme with dark mode support, and improve accessibility.
**Prompt:**
"Add a red icon for overdue tasks. Style the app with pastel colors and a dark mode media query. Ensure keyboard navigation and screen reader support. Write tests for overdue detection and accessibility features. Document the code and styling choices."
**Notes:**

- Use ARIA attributes and semantic HTML.
- Keep styles clean and maintainable.

---

This plan ensures a functional, testable TODO app is built incrementally, with documentation and tests at each step.
