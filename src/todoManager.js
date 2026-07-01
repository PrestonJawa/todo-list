import { Todo } from "./todo.js";
import { TodoForm } from "./todoForm.js";

export class TodoManager {

    constructor(folderManager) {

        this.folderManager = folderManager;
        this.todo = new Todo();
        this.todoForm = new TodoForm();
        this.todo.setTodoForm(this.todoForm);
        this.newTodoButton = document.querySelector(".create-todo");
        this.initialize();
    }

    deleteTodosFolder(folderId){
        this.todo.todos = this.todo.todos.filter(task => task.folderId  != folderId);
        this.todo.loadTodos();
    }

    initialize() {

        this.newTodoButton.addEventListener("click", () => {
            this.todoForm.openCreate();
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
            const dueDate = this.todoForm.dateInput.value;

            let priorityValue = 0;
            console.log(folderId);

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

            if (this.todoForm.mode == "create"){
                this.todo.createTodo(title, folderId, priorityValue, dueDate);
            } else {
                this.todo.editTodo(this.todoForm.currentTodoId, title, priorityValue, dueDate)
            }
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