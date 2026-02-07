import { help } from "./utils/help.js";
import { addTask, list } from "./commands/tasks.js";

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
  case "delete":
  case "mark-in-progress":
  case "mark-done":
    notImplemented(command);
    console.log("Args:", args);
    break;

  default:
    console.log(`Unknown command: ${command}`);
    help();
    process.exit(1);
}
