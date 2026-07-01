import { Storage } from "./storage.js"

import { format } from "date-fns";

export class Todo {

    constructor(){
        this.todoContainer = document.querySelector(".main");
        this.todos = Storage.loadTodos();
    }

    setTodoForm(todoForm){
        this.todoForm = todoForm;
    }

    createTodo(title, folderId, priority, dueDate){
        const todoData = {id: crypto.randomUUID(), folderId, title, priority, check: false, dueDate};
        this.todos.push(todoData);

        this.makeTodo(todoData);
    }

    editTodo(id, title, priority, dueDate){
        const task = this.todos.find(todo => todo.id == id);
        task.title = title;
        task.priority = priority;
        task.dueDate = dueDate;
    }

    loadTodos(folderId){
        Storage.saveTodos(this.todos);
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
        
        if (data.check){
            todo.classList.add("completed");
            todo.style.order = 5
        }

        todo.style.order += data.priority;

        const topTodo = document.createElement("div");
        topTodo.classList.add("todo-top");

        const checkBox = this.createCheckbox(data);

        const todoButton = this.createTodoButton(data);

        const buttonDelete = this.createDeleteButton(data);

        const botTodo = document.createElement("div");
        botTodo.classList.add("todo-bot");
        botTodo.textContent = format(new Date(data.dueDate), "MMM d, yyyy");


        topTodo.append(checkBox, todoButton, buttonDelete);
        todo.append(topTodo, botTodo);

        return todo;
    }

    createTodoButton(data){
        const todoButton = document.createElement("button");
        todoButton.classList.add("todo-name");
        todoButton.textContent = data.title;

        todoButton.addEventListener("click", e => {
            this.todoForm.openEdit(data);
        });

        return todoButton
    }

    createCheckbox(data){
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        
        if (data.check){
            checkBox.checked = true;
        }

        checkBox.addEventListener("change", (e) => {
            data.check = !data.check;
            this.loadTodos(data.folderId);
        });

        return checkBox;
    }

    createDeleteButton(data){
        const buttonDelete = document.createElement("button");
        buttonDelete.textContent = "✖";
        buttonDelete.classList.add("delete");

        buttonDelete.addEventListener("click", (e) => {
            const tempId = data.folderId;
            this.todos = this.todos.filter(todo => todo.id !== data.id);
            this.loadTodos(tempId);
        });

        return buttonDelete;
    }

}