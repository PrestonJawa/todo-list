export class TodoForm {
    constructor() {
        this.todoScreen = document.querySelector("#todo-screen");
        this.form = this.todoScreen.querySelector("form");

        this.taskName = this.form.querySelector("#todo-name").value;
        this.taskDescription = this.form.querySelector("todo-description").value;
        this.priority = this.form.querySelector("todo-priority").value;
    }

    show(){
        this.todoScreen.classList.add("show");

    }

    hide(){
        this.todoScreen.classList.remove("show");
    }
}