import * as fs from "fs";
import * as path from "path";

const TASKS_FILE = path.join(__dirname, "tasks.json");

/**
 * Formats an array of tasks as a table string.
 */
export function formatTasksTable(tasks: Task[]): string {
  if (tasks.length === 0) return "No tasks found.";
  const headers = ["Name", "Description", "Due Date"];
  const rows = tasks.map((t) => [t.name, t.description, t.dueDate]);
  const allRows = [headers, ...rows];
  const colWidths = headers.map((_, i) =>
    Math.max(...allRows.map((row) => row[i].length))
  );
  const formatRow = (row: string[]) =>
    row.map((cell, i) => cell.padEnd(colWidths[i])).join(" | ");
  const sep = colWidths.map((w) => "-".repeat(w)).join("-|-");
  return [formatRow(headers), sep, ...rows.map(formatRow)].join("\n");
}

// --- CLI Command Parsing ---
if (require.main === module) {
  const [, , cmd, ...args] = process.argv;
  function printUsage() {
    console.log(
      `\nUsage:\n  node example.js add <name> <description> <dueDate>\n  node example.js delete <name>\n  node example.js list\n\nExamples:\n  node example.js add "Buy milk" "From store" 2025-09-01\n  node example.js delete "Buy milk"\n  node example.js list\n`
    );
  }

  switch (cmd) {
    case "add": {
      const [name, description, dueDate] = args;
      if (!name || !description || !dueDate) {
        console.error("Missing arguments for add.");
        printUsage();
        process.exit(1);
      }
      try {
        addTask({ name, description, dueDate });
        console.log("Task added.");
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error("Failed to add task:", msg);
        process.exit(1);
      }
      break;
    }
    case "delete": {
      const [name] = args;
      if (!name) {
        console.error("Missing task name for delete.");
        printUsage();
        process.exit(1);
      }
      const deleted = deleteTaskByName(name);
      if (deleted) {
        console.log("Task(s) deleted.");
      } else {
        console.log("No task found with that name.");
      }
      break;
    }
    case "list": {
      const tasks = listTasksSortedByDueDate();
      console.log(formatTasksTable(tasks));
      break;
    }
    default:
      printUsage();
      process.exit(1);
  }
}
/**
 * Returns all tasks sorted by due date (ascending).
 */
export function listTasksSortedByDueDate(): Task[] {
  return loadTasks()
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    });
}
/**
 * Deletes a Task by name. If multiple tasks have the same name, all are deleted.
 * @param name The name of the Task to delete
 * @returns true if any task was deleted, false otherwise
 */
export function deleteTaskByName(name: string): boolean {
  const tasks = loadTasks();
  const filtered = tasks.filter((task) => task.name !== name);
  const deleted = filtered.length !== tasks.length;
  if (deleted) {
    saveTasks(filtered);
  }
  return deleted;
}

export interface Task {
  name: string;
  description: string;
  dueDate: string; // ISO date string
}

/**
 * Validates a Task object.
 * Returns true if valid, false otherwise.
 */
export function validateTask(task: any): boolean {
  if (
    typeof task !== "object" ||
    typeof task.name !== "string" ||
    typeof task.description !== "string" ||
    typeof task.dueDate !== "string"
  ) {
    return false;
  }
  // Check if dueDate is a valid date string
  const date = new Date(task.dueDate);
  return !isNaN(date.getTime());
}

/**
 * Loads an array of Task objects from the local JSON file.
 * Returns an empty array if the file does not exist.
 */
export function loadTasks(): Task[] {
  if (!fs.existsSync(TASKS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(TASKS_FILE, "utf-8");
  try {
    const tasks = JSON.parse(data);
    if (Array.isArray(tasks)) {
      return tasks.filter(validateTask);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Saves an array of Task objects to the local JSON file.
 */
export function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

/**
 * Adds a new Task to the list and saves it. Validates the task before saving.
 * Throws an error if the task is invalid.
 * @param newTask The Task to add
 */
export function addTask(newTask: Task): void {
  if (!validateTask(newTask)) {
    throw new Error("Invalid task");
  }
  const tasks = loadTasks();
  tasks.push(newTask);
  saveTasks(tasks);
}
