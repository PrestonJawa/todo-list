import "./styles.css"

export class Todo {

    constructor(){
        this.todoContainer = document.querySelector(".main");
    }

    createTodo(){
        const todo = document.createElement("div");
        todo.classList.add("todo");
        this.todoContainer.appendChild(todo);

        const checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        todo.appendChild(checkBox);

        const todoButton = document.createElement("button");
        todoButton.classList.add("todo-name");
        todo.appendChild(todoButton);

        const buttonActions = document.createElement("div");
        buttonActions.classList.add("button-actions");
        todo.appendChild(buttonActions);

        const buttonEdit = document.createElement("button");
        buttonEdit.textContent = "✏️";
        buttonEdit.classList.add("edit");
        buttonActions.appendChild(buttonEdit);

        const buttonDelete = document.createElement("button");
        buttonDelete.textContent = "✖";
        buttonDelete.classList.add("delete");
        buttonActions.appendChild(buttonDelete);
    }

}