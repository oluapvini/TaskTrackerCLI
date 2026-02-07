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