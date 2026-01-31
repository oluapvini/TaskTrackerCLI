import { readTasks, writeTasks } from "./storage/file-storage.js";

console.log("1) Reading tasks...");
console.log(readTasks());

console.log("2) Writing a test task...");
writeTasks([{ id: 1, description: "Test task", status: "todo" }]);

console.log("3) Reading again...");
console.log(readTasks());
