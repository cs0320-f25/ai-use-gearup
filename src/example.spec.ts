import { formatTasksTable } from "./example";
describe("formatTasksTable", () => {
  it("formats tasks as a table", () => {
    const tasks: Task[] = [
      { name: "A", description: "Desc1", dueDate: "2025-12-31" },
      { name: "B", description: "Desc2", dueDate: "2024-01-01" },
    ];
    const table = formatTasksTable(tasks);
    expect(table).toContain("Name");
    expect(table).toContain("Description");
    expect(table).toContain("Due Date");
    expect(table).toContain("A");
    expect(table).toContain("B");
    expect(table).toContain("2025-12-31");
    expect(table).toContain("2024-01-01");
    // Check for table structure
    expect(table.split("\n")[1]).toMatch(/-+\|-+-+\|-+/);
  });
  it("returns 'No tasks found.' for empty list", () => {
    expect(formatTasksTable([])).toBe("No tasks found.");
  });
});
import {
  Task,
  addTask,
  loadTasks,
  saveTasks,
  deleteTaskByName,
  listTasksSortedByDueDate,
} from "./example";
describe("List Tasks Sorted by Due Date", () => {
  beforeEach(() => {
    saveTasks([
      { name: "A", description: "d1", dueDate: "2025-12-31" },
      { name: "B", description: "d2", dueDate: "2024-01-01" },
      { name: "C", description: "d3", dueDate: "2025-01-01" },
    ]);
  });

  test("listTasksSortedByDueDate returns tasks sorted by due date", () => {
    const sorted = listTasksSortedByDueDate();
    expect(sorted.length).toBe(3);
    expect(sorted[0].name).toBe("B"); // 2024-01-01
    expect(sorted[1].name).toBe("C"); // 2025-01-01
    expect(sorted[2].name).toBe("A"); // 2025-12-31
  });

  test("listTasksSortedByDueDate returns empty array if no tasks", () => {
    saveTasks([]);
    const sorted = listTasksSortedByDueDate();
    expect(sorted).toEqual([]);
  });
});
describe("Task Deletion", () => {
  beforeEach(() => {
    saveTasks([
      { name: "Task1", description: "Desc1", dueDate: "2024-12-31" },
      { name: "Task2", description: "Desc2", dueDate: "2025-01-01" },
      { name: "Task1", description: "Desc3", dueDate: "2025-02-01" },
    ]);
  });

  test("deleteTaskByName deletes all tasks with the given name", () => {
    const deleted = deleteTaskByName("Task1");
    expect(deleted).toBe(true);
    const tasks = loadTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe("Task2");
  });

  test("deleteTaskByName returns false if no task matches", () => {
    const deleted = deleteTaskByName("Nonexistent");
    expect(deleted).toBe(false);
    const tasks = loadTasks();
    expect(tasks.length).toBe(3);
  });
});

describe("Task Storage and Add Logic", () => {
  beforeEach(() => {
    // Clean slate before each test
    saveTasks([]);
  });

  test("loadTasks and saveTasks should persist and retrieve tasks", () => {
    const testTasks: Task[] = [
      { name: "Test1", description: "Desc1", dueDate: "2024-12-31" },
      { name: "Test2", description: "Desc2", dueDate: "2025-01-01" },
    ];
    saveTasks(testTasks);
    const loaded = loadTasks();
    expect(Array.isArray(loaded)).toBe(true);
    expect(loaded.length).toBe(2);
    expect(loaded[0].name).toBe("Test1");
    expect(loaded[1].dueDate).toBe("2025-01-01");
  });

  test("addTask should add a valid task", () => {
    const validTask: Task = {
      name: "New Task",
      description: "A valid task",
      dueDate: "2025-08-30",
    };
    addTask(validTask);
    const tasksAfterAdd = loadTasks();
    expect(tasksAfterAdd.length).toBe(1);
    expect(tasksAfterAdd[0].name).toBe("New Task");
  });

  test("addTask should throw on invalid task", () => {
    expect(() => {
      addTask({ name: "", description: "", dueDate: "not-a-date" } as Task);
    }).toThrow("Invalid task");
  });
});
