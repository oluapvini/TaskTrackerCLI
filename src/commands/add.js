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
        description: description,
        status: "todo",
    }

    tasks.push(task);
    writeTasks(tasks);
  
    console.log(`Task added successfully (ID: ${newId})`);
}