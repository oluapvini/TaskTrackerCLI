import { readTasks, writeTasks } from "../storage/file-storage.js";    
import { help } from "../utils/help.js";

export function addTask(args) {
    const description = args.join(" ").trim();

    if (!description) {
        console.log('Usage: add "description"');
        help();
        return;
    }

    const tasks = readTasks();

    const maxId = tasks.reduce((max, t) => Math.max(max, t.id || 0), 0);
    const newId = maxId + 1;

    const task = {
        id: newId,
        description,
        status: "todo",
    };

    tasks.push(task);
    writeTasks(tasks);
  
    console.log(`Task added successfully (ID: ${newId})`);
}

export function list(args) {
    const list = readTasks();
    const filter = args?.[0]; 

    if (list.length === 0) {
        console.log("No tasks found.");
        return;
    }

    const validFilters = ["todo", "in-progress", "done"];

    if (filter && !validFilters.includes(filter)) {
        console.log('Usage: list [todo|in-progress|done]');
        help();
        return;
    }

    const result = filter ? list.filter(t => t.status === filter) : list;

    if (result.length === 0) {
        console.log("No tasks found.");
        return;
    }

    for (const t of result) {
        console.log(`[${t.id}] (${t.status}) ${t.description}`);
    }
}

export function update(args) {
    const description = args.slice(1).join(" ").trim();
    const id = parseInt(args[0], 10);

    if (isNaN(id)) {
        console.log('Usage: update <id> "new description"');
        help();
        return;
    }

    if (!description) {
        console.log('Usage: update <id> "new description"');
        help();
        return;
    }

    const tasks = readTasks();

    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.description = description;
    writeTasks(tasks);
    console.log(`Task ${id} updated successfully.`);
}

export function markTaskStatus(args, status, commandName) {
    const id = parseInt(args[0], 10);

    if (isNaN(id)) {
        console.log(`Usage: ${commandName} <id>`);
        help();
        return;
    }

    const tasks = readTasks();

    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.status = status;
    writeTasks(tasks);
    console.log(`Task ${id} marked as ${status}.`);
}

export function markDone(args) {
    markTaskStatus(args, "done", "mark-done");
}

export function markInProgress(args) {
    markTaskStatus(args, "in-progress", "mark-in-progress");
}

export function deleteTask(args) {
  const id = parseInt(args[0], 10);

  if (isNaN(id)) {
    console.log("Usage: delete <id>");
    help();
    return;
  }

  const tasks = readTasks();
  const exists = tasks.some(t => t.id === id);

  if (!exists) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  const updatedTasks = tasks.filter(t => t.id !== id);
  writeTasks(updatedTasks);

  console.log(`Task ${id} deleted.`);
}
