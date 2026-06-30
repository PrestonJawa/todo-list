export class TodoForm {

    constructor() {
        this.todoScreen = document.querySelector("#todo-screen");
        this.form = this.todoScreen.querySelector("form");
        this.close = this.form.querySelector(".close");
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