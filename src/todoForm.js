import { format } from "date-fns";

export class TodoForm {

    constructor() {
        this.todoScreen = document.querySelector("#todo-screen");
        this.form = this.todoScreen.querySelector("form");
        this.close = this.form.querySelector(".close");
        this.dateInput = this.form.querySelector("#todo-date");
        this.mode = "create";
        this.currentTodoId = null;
    }

    openCreate() {
        this.mode = "create";
        this.currentTodoId = null;
        this.clear();
        this.show();
    }

    openEdit(todo) {
        this.mode = "edit";
        this.currentTodoId = todo.id;
        this.form.querySelector("#todo-name").value = todo.title;
        this.dateInput.value = todo.dueDate;
        this.show();
    }

    show() {
        this.todoScreen.classList.add("show");
    }

    hide() {
        this.todoScreen.classList.remove("show");
    }

    clear() {
        this.form.reset();
    }
}