import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), "tasks.json");

export function taskFileExists() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]), null, 2), "utf-8";
    }
}

export function readTasks() {
    taskFileExists();

    try {
        const raw = fs.readFileSync(DB_PATH, "utf8").trim();

        if (!raw) return [];

        const data = JSON.parse(raw);

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.log("Warning: tasks.json is invalid or unreadable. Resetting to empty list.");

        fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf8");

        return [];
    }
}

export function writeTasks(tasks) {
    taskFileExists();

    const safeTasks = Array.isArray(tasks) ? tasks : [];

    fs.writeFileSync(DB_PATH, JSON.stringify(safeTasks, null, 2), "utf8");
}