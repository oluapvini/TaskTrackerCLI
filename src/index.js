import { help } from "./utils/help.js";
import { addTask, list, markDone, markInProgress, update } from "./commands/tasks.js";

function notImplemented(command) {
  console.log(`${command} is not implemented yet.`);
}

const [, , command, ...args] = process.argv;

if (!command) {
  help();
  process.exit(0);
}

switch (command) {
   case "add":
    addTask(args);
    break;
  case "list":
    list(args);
    break;
  case "update":
    update(args);
    break;
  case "delete":
  case "mark-in-progress":
    markInProgress(args);
    break;
  case "mark-done":
    markDone(args);
    break;

  default:
    console.log(`Unknown command: ${command}`);
    help();
    process.exit(1);
}
