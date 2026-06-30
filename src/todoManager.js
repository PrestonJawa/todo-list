import { Todo } from "./todo.js";
import { TodoForm } from "./todoForm.js";

export class TodoManager {

    constructor(folderManager) {

        this.folderManager = folderManager;
        this.todo = new Todo();
        this.todoForm = new TodoForm();
        this.newTodoButton = document.querySelector(".create-todo");
        this.initialize();
    }

    deleteTodosFolder(folderId){
        this.todo.todos = this.todo.todos.filter(task => task.folderId  != folderId);
        this.todo.loadTodos();
    }

    initialize() {

        this.newTodoButton.addEventListener("click", () => {
            this.todoForm.show();
        });

        this.todoForm.close.addEventListener("click", () => {
            this.todoForm.hide();
            this.todoForm.clear();
        });

        this.todoForm.form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = this.todoForm.form.querySelector("#todo-name").value;
            const priority = this.todoForm.form.querySelector("#todo-priority").value;
            const folderId = this.folderManager.folder.currentFolderId;

            let priorityValue = 0;

            if (!folderId) {
                alert("Select a folder first.");
                return;
            }

            if (priority == "low"){
                priorityValue = 2;
            } else if(priority == "med"){
                priorityValue = 1;
            } else if (priority == "high") {
                priorityValue = 0
            }

            this.todo.createTodo(title, folderId, priorityValue);
            this.todo.loadTodos(folderId);

            this.todoForm.hide();
            this.todoForm.clear();
        });

        document.querySelector(".folders").addEventListener("click", (e) => {

            if (!e.target.classList.contains("folder-name")) return;

            this.todo.loadTodos(this.folderManager.folder.currentFolderId);

        });
    }
}