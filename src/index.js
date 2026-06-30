import { FolderManager } from "./folderManager.js";
import { TodoManager } from "./todoManager.js";
import "./styles.css";
import "./formStyles.css";

const folderManager = new FolderManager();
const todoManager = new TodoManager(folderManager);
folderManager.setTodoManager(todoManager);