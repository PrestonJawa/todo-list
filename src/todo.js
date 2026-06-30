export class Todo { // Work on this checkbox part
    static idCounter = 0;

    constructor(){
        this.todoContainer = document.querySelector(".main");
        this.todos = [];
    }

    createTodo(title, folderId, priority){
        const todoData = {id: Todo.idCounter, folderId, title, priority, check: false};
        Todo.idCounter++;
        this.todos.push(todoData);

        this.makeTodo(todoData);
    }

    editTodo(data, id){
        const task = this.todos.filter(todo => todo.id == id);
        task.title = title;
        task.priority = data.priority;
    }

    loadTodos(folderId){
        this.todoContainer.innerHTML = "";
        const todos = this.todos.filter((todo) => todo.folderId == folderId);

        for(let todo of todos){
            const item = this.makeTodo(todo);
            this.todoContainer.append(item);

        }
    }

    makeTodo(data){
        const todo = document.createElement("div");
        todo.classList.add("todo");
        if (data.priority == 2){
            todo.style.boxShadow = "-10px 0px 20px -5px green"
        } else if(data.priority == 1){
            todo.style.boxShadow ="-10px 0px 20px -5px yellow"
        } else if (data.priority == 0) {
            todo.style.boxShadow = "-10px 0px 20px -5px red"
        }

        todo.style.order = data.priority;

        const checkBox = this.createCheckbox(data);

        const todoButton = document.createElement("button");
        todoButton.classList.add("todo-name");
        todoButton.textContent = data.title;

        const buttonDelete = this.createDeleteButton(data.id);

        todo.append(checkBox, todoButton, buttonDelete);
        return todo;
    }

    createCheckbox(data){
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        checkBox.addEventListener("change", (e) => {
            const card = e.currentTarget.closest(".todo");
            card.classList.toggle("completed");

            if (checkBox.checked){
                data.priority = data.priority + 5;
            } else {
                data.priority = data.priority - 5;
            }

            card.style.order = data.priority


        });

        return checkBox;
    }

    createDeleteButton(id){
        const buttonDelete = document.createElement("button");
        buttonDelete.textContent = "✖";
        buttonDelete.classList.add("delete");

        buttonDelete.addEventListener("click", (e) => {
            e.currentTarget.closest(".todo").remove();

            this.todos = this.todos.filter(todo => todo.id !== id);
        });

        return buttonDelete;
    }

}